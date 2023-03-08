import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "./photoService";

const initialState = {
  photos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Photo
export const createPhoto = createAsyncThunk(
  "photos/create",
  async (photoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await photoService.createPhoto(photoData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user photos
export const getPhotos = createAsyncThunk(
  "photos/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await photoService.getPhotos(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user photo
export const deletePhoto = createAsyncThunk(
  "photos/delete",
  async (id, thunkAPI) => {
    try {
      console.log(id);

      const token = thunkAPI.getState().auth.user.token;
      return await photoService.deletePhoto(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.photos.push(action.payload);
      })
      .addCase(createPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPhotos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.photos = action.payload;
      })
      .addCase(getPhotos.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.photos = state.photos.filter(
          (photo) => photo._id !== action.payload.id
        );
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = photoSlice.actions;
export default photoSlice.reducer;
