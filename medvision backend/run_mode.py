from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import cv2
import torch
import tensorflow as tf
import os
import io
from PIL import Image
# from patchify import patchify  # Replaced with custom implementation
from torchvision import transforms
from torchvision.datasets import ImageFolder
from transformer import TumorClassifierViT

# ------------------ CONFIG ------------------
cf = {
    "image_size": 256,
    "num_channels": 3,
    "patch_size": 16,
}
cf["num_patches"] = (cf["image_size"]*2) // (cf["patch_size"]*2)
cf["flat_patches_shape"] = (
    cf["num_patches"],
    cf["patch_size"] * cf["patch_size"] * cf["num_channels"]
)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
smooth = 1e-15

# Custom patchify implementation
def patchify(image, patch_shape, step):
    """
    Simple patchify implementation to replace the patchify library
    """
    patches = []
    h, w, c = image.shape
    patch_h, patch_w, patch_c = patch_shape
    
    for i in range(0, h - patch_h + 1, step):
        for j in range(0, w - patch_w + 1, step):
            patch = image[i:i+patch_h, j:j+patch_w, :]
            patches.append(patch)
    
    return np.array(patches)

def dice_coef(y_true, y_pred):
    y_true = tf.keras.layers.Flatten()(y_true)
    y_pred = tf.keras.layers.Flatten()(y_pred)
    intersection = tf.reduce_sum(y_true * y_pred)
    return (2. * intersection + smooth) / (tf.reduce_sum(y_true) + tf.reduce_sum(y_pred) + smooth)

def dice_loss(y_true, y_pred):
    return 1.0 - dice_coef(y_true, y_pred)

# ------------------ INITIALIZE MODELS ------------------
UNET_MODEL_PATH = "best_model(1).keras"
VIT_MODEL_PATH = "best_model.pth"
CLASS_FOLDER = "archive\\Training"

unet_model = tf.keras.models.load_model(
    UNET_MODEL_PATH, custom_objects={"dice_loss": dice_loss, "dice_coef": dice_coef}
)

vit_model = TumorClassifierViT(num_classes=4)
vit_model.load_state_dict(torch.load(VIT_MODEL_PATH, map_location=device))
vit_model.to(device)
vit_model.eval()

train_dataset = ImageFolder(CLASS_FOLDER, transform=transforms.ToTensor())
class_names = train_dataset.classes

data_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

# ------------------ IMAGE HANDLING ------------------
def preprocess_patchify(image):
    image = cv2.resize(image, (cf["image_size"], cf["image_size"]))
    image_norm = image / 255.0
    patch_shape = (cf["patch_size"], cf["patch_size"], cf["num_channels"])
    patches = patchify(image_norm, patch_shape, cf["patch_size"])
    patches = np.reshape(patches, cf["flat_patches_shape"])
    patches = patches.astype(np.float32)
    return np.expand_dims(patches, axis=0), image_norm

def predict_segmentation(image):
    input_patches, resized_image = preprocess_patchify(image)
    pred_mask = unet_model.predict(input_patches)[0]
    pred_mask = cv2.resize(pred_mask, (cf["image_size"], cf["image_size"]))
    pred_mask = np.where(pred_mask > 0.5, 1.0, 0.0)
    return pred_mask, resized_image

def overlay_mask(image, mask):
    image_uint8 = (image * 255).astype(np.uint8)
    mask_uint8 = (mask * 255).astype(np.uint8)
    mask_colored = np.zeros_like(image_uint8)
    mask_colored[:, :, 1] = mask_uint8  # Green channel
    return cv2.addWeighted(image_uint8, 1.0, mask_colored, 0.5, 0)

def predict_class(image_pil):
    image_tensor = data_transforms(image_pil).unsqueeze(0).to(device)
    with torch.no_grad():
        outputs = vit_model(image_tensor)
        probabilities = torch.nn.functional.softmax(outputs[0], dim=0)
    confidence, predicted = torch.max(probabilities, 0)
    return predicted.item(), confidence.item(), probabilities.cpu().numpy()

# ------------------ FLASK API ------------------
app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']

    # Read file content once
    file_bytes = file.read()
    np_bytes = np.frombuffer(file_bytes, np.uint8)

    # Decode for OpenCV
    image_cv2 = cv2.imdecode(np_bytes, cv2.IMREAD_COLOR)
    if image_cv2 is None:
        return jsonify({'error': 'Invalid image format (cv2)'}), 400

    # Decode for PIL
    try:
        image_pil = Image.open(io.BytesIO(file_bytes)).convert('RGB')
    except Exception as e:
        return jsonify({'error': f'Invalid image format (PIL): {str(e)}'}), 400

    # Run segmentation and classification
    pred_mask, norm_image = predict_segmentation(image_cv2)
    overlayed = overlay_mask(norm_image, pred_mask)
    predicted_class, confidence, prob_array = predict_class(image_pil)

    # Save the mask image
    overlay_path = "output_mask.png"
    cv2.imwrite(overlay_path, overlayed)

    return jsonify({
        "classification": {
            "label": class_names[predicted_class],
            "confidence": round(confidence, 4),
            "probabilities": {class_names[i]: round(float(prob), 4) for i, prob in enumerate(prob_array)}
        },
        "segmentation_mask_url": "/mask"
    })

@app.route("/mask", methods=["GET"])
def get_mask():
    return send_file("output_mask.png", mimetype='image/png')

if __name__ == "_main_":
    app.run(debug=True, port=5003)