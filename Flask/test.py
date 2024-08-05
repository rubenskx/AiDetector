import os
import torch
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from torchvision.transforms import transforms
import numpy as np
from torch import nn
from flask_cors import CORS
from PIL import Image




app = Flask(__name__)
CORS(app)

# Set the directory where the uploaded files will be saved
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Set the allowed file extensions
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Function to check if the uploaded file is allowed

def softmax(arr):
    return np.exp(arr)/sum(np.exp(arr))

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def vgg_block(num_convs, out_channels):
    layers = []
    for _ in range(num_convs):
        layers.append(nn.LazyConv2d(out_channels, kernel_size=3, padding=1))
        layers.append(nn.ReLU())
    layers.append(nn.MaxPool2d(kernel_size=2, stride=2))
    return nn.Sequential(*layers)


class VGG(nn.Module):
    def __init__(self, arch, lr=0.1, num_classes=2):
        super(VGG, self).__init__()
        conv_blks = []
        for (num_convs, out_channels) in arch:
            conv_blks.append(vgg_block(num_convs, out_channels))
        self.conv_layers = nn.Sequential(
            *conv_blks, nn.Flatten())
        self.linear_layers = nn.Sequential(
            nn.LazyLinear(4096), nn.ReLU(), nn.Dropout(0.5),
            nn.LazyLinear(4096), nn.ReLU(), nn.Dropout(0.5),
            nn.LazyLinear(num_classes)
        )

    def forward(self, x):
        x = self.conv_layers(x)
        output = self.linear_layers(x)
        return output


def evaluate_single_image_path(model, image_path):
    model.eval()
    with torch.no_grad():
        # Load and preprocess the image
        # Open image and convert to RGB if necessary
        image = Image.open(image_path)
        preprocess = transforms.Compose([
            # Resize to the input size of your model
            transforms.Resize((128, 128)),
            transforms.ToTensor(),
        ])
        image = preprocess(image).unsqueeze(0)  # Add a batch dimension

        image = image.to(device)
        output = model(image)  # Forward pass
        percentage = max(softmax(np.array(output[0])))
        predicted = torch.argmax(output, dim=1)
        if predicted.item() == 0:
            return "Fake image", percentage
        else:
            return "Real image!", percentage


vgg_model = VGG(arch=((1, 16), (1, 32), (2, 64), (2, 128), (2, 128)), lr=0.01)
vgg_model.to(device)
checkpoint = torch.load('VGG_11.pth', map_location=torch.device('cpu'))
vgg_model.load_state_dict(checkpoint)


@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if the POST request has the file part
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']

    # If user does not select file, browser also submits an empty part without filename
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    try:
        if file and allowed_file(file.filename):
            # Secure the filename and save the file
            filename = secure_filename(file.filename)
            saved_file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(saved_file_path)
            result, percentage = evaluate_single_image_path(vgg_model, saved_file_path)
            os.remove(saved_file_path)
            return jsonify({"message": result, "filename": filename, "percentage": str(percentage)}), 200
        else:
            return jsonify({"error": "File type not allowed"}), 400
    except Exception as e:
        print(e)
        return jsonify({"error": "some error"}), 400



if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True, host='0.0.0.0')
