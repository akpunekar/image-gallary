import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPhoto } from "../features/photos/photoSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function PhotoForm() {
  const [photoName, setPhotoName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { uniqueDigit } = useSelector((state) => state.photos);

  /* A function that is called when the form is submitted. */
  const onSubmit = (e) => {
    e.preventDefault();
    if (photoName === "") {
      return toast.error("Please enter a name for the photo.");
    }
    dispatch(createPhoto({ photoName, photoUrl }));
    setPhotoName("");
    setPhotoUrl("");
  };

  /* A function that is called when the user selects a photo. */
  const getPhotoUrl = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      setVisible(true);

      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "shopzipper");
      fetch("https://api.cloudinary.com/v1_1/dy8vcuggu/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setVisible(false);
          setPhotoUrl(data.url.toString());
          toast(`Unique code is ${uniqueDigit} to download uploaded photo`);
        })
        .catch((err) => toast.error(err));
    } else {
      toast.error("Please select an Image");
    }
  };

  return (
    <section className="form">
      <h5>Upload Photo</h5>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Photo Name</label>
          <input
            type="text"
            name="photoName"
            id="text"
            value={photoName}
            onChange={(e) => setPhotoName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="text">Select Photo</label>
          <input
            type="file"
            id="text"
            onChange={(e) => getPhotoUrl(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          {visible ? (
            "Wait"
          ) : photoUrl ? (
            <button className="btn btn-block" type="submit">
              Upload Photo
            </button>
          ) : (
            ""
          )}
        </div>
      </form>
    </section>
  );
}

export default PhotoForm;
