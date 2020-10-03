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

def get_response_image(image_path):
    pil_img = Image.open(app.root_path + '/static/img/' + image_path, mode='r') # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG') # convert the PIL image to byte array
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii') # encode as base64
    return encoded_img

def process_image(image):
	global generated_name
	response = requests.post(
		'https://api.remove.bg/v1.0/removebg',
		files={'image_file': open(app.root_path+'/static/img/'+image, 'rb')},
		data={'size': 'auto'},
		headers={'X-Api-Key': 'sNjPvyFeaabCMqTxv5xN8i2K'},
	)
	if response.status_code == requests.codes.ok:
		generated_name = secrets.token_hex(3)
		with open(app.root_path+'\\static\\img\\'+generated_name+'.png', 'wb') as out:
			out.write(response.content)
		return generated_name+".png"
	else:
		print("Error:", response.status_code, response.text)


@app.route("/", methods=["POST", "GET"])
def send():
	if request.method == "POST":
	    picture_file = save_picture(request.files.get('file'))
	    new_image = process_image(picture_file)
	    encoded_img = get_response_image(new_image)
	    return jsonify({'message':encoded_img, 'filename':generated_name+".png"})
	else:
		return "Hello World Application"

# if __name__ == "__main__":
#     app.run(debug=True, port=400)
