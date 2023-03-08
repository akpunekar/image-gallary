import axios from "axios";

const API_URL = "/photos/";

// Upload new photo
const createPhoto = async (photoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, photoData, config);

  return response.data;
};

// Get user photos
const getPhotos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user photo
const deletePhoto = async (photoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + photoId, config);

  return response.data;
};

const photoService = {
  createPhoto,
  getPhotos,
  deletePhoto,
};

export default photoService;
