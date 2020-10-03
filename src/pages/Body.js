import React, { useState } from 'react';
import axios from 'axios';
import './Body.css';

const Body = () => {

  const [file, setFile] = useState();
  const [photo, setPhoto] = useState();

  const [original_text, setOriginalText] = useState();
  const [edited_text, setEditedText] = useState();

  const [filename, setFilename] = useState();

  const handleFileChange = (e) => {
    setOriginalText("Original Photo")
    setFile(URL.createObjectURL(e.target.files[0]))

    var form_data = new FormData();

    form_data.append('file', e.target.files[0]);
    const url = 'https://remove-bg-api.herokuapp.com/';
    axios.post(url, form_data, {
      headers: {
        'content-type': false,
      }
    })
        .then(res => {
          setEditedText("Edited Photo")
          setPhoto(`${res.data.message}`);
          setFilename(`${res.data.filename}`);
        })
  }

  const downloadPhoto = () => {
		fetch(`https://remove-bg-api.herokuapp.com/static/img/${filename}`)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = 'edited-photo.jpg';
					a.click();
				});
		});
	}

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-xl-5 col-lg-6 col-md-7 col-sm-10">
          <div className="card input_card">
            <div className="card-header">
              <form>
                <div className="form-group">
                  <input type="file" hidden id="select_image"
                    onChange={handleFileChange}
                    accept="image/*"
                   />
                  <label htmlFor="select_image"
                    className="select_label">
                    select an image file
                  </label>
                </div>
              </form>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  {original_text ? <p className="defined_text">{original_text}</p>: ''}
                  {file ? <img src={file} alt={file} className="card-img-top"/>: ''}
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6">
                  {edited_text ? <p className="defined_text">{edited_text}</p>: ''}
                  {photo ? <img src={`data:image/png;base64,${photo}`} alt={photo}
                    className="card-img-top"/>: ''}
                  {photo ? <button
                      onClick={downloadPhoto}
                      className="btn btn-block download_btn"
                    >Download</button>: ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
  )
}

export default Body;
