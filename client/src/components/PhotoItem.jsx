import { useDispatch } from "react-redux";
import { deletePhoto } from "../features/photos/photoSlice";
import { Card, Button } from "react-bootstrap";
import React from "react";

function PhotoItem({ photo }) {
  const dispatch = useDispatch();

  /* A function that is being called when the user clicks the download button. */
  const downloadImage = (url) => {
    /* Downloading the image. */
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "PhotoDownload";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Card style={{ width: "18rem", margin: "5px" }}>
      <Card.Img style={{ width: "19rem" }} variant="top" src={photo.photoUrl} />
      <Card.Body>
        <Card.Title>{photo.photoName}</Card.Title>
        <Card.Text>
          {new Date(photo.createdAt).toLocaleString("en-US")}
        </Card.Text>
        <Button
          className="photoBtn"
          onClick={() => dispatch(deletePhoto(photo._id))}
        >
          Delete Photo
        </Button>
        <Button
          onClick={() => {
            let code = prompt(`Enter "${photo.uniqueDigit}" code to Download`);
            if (code !== null) {
              if (code === photo.uniqueDigit) {
                downloadImage(photo.photoUrl);
              } else {
                alert("Invalid code");
              }
            } else {
              alert("Canceled");
            }
          }}
          className="photoBtn"
        >
          Download Photo
        </Button>
      </Card.Body>
    </Card>
  );
}

export default PhotoItem;
