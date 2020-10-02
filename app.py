from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

from werkzeug.utils import secure_filename
import secrets
from PIL import Image
import os

import io
from base64 import encodebytes

import json

app = Flask(__name__)
cors = CORS(app)

def save_picture(form_picture):
	new_name = secrets.token_hex(8)
	_, f_ext = os.path.splitext(form_picture.filename)
	picture_fn = new_name + f_ext
	picture_path = os.path.join(app.root_path, 'static/img/', picture_fn)
	i = Image.open(form_picture)
	i.save(picture_path)
	return picture_fn

""" I got this code from stack overflow, i don't really know how to explain this
but i know it converts the image passed to base64 """

def get_response_image(image_path):
    pil_img = Image.open(app.root_path + 'static/img/' + image_path, mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img


@app.route("/", methods=["POST", "GET"])
def send():
    picture_file = save_picture(request.files.get('file'))
    encoded_img = get_response_image(picture_file)
    return jsonify({'message':encoded_img, 'filename':picture_file})


# if __name__ == "__main__":
#     app.run(debug=True, port=400)
