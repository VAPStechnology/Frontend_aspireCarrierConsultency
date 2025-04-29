import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadToCloudinary = async (file, onProgress) => {
  if (!file || file.size > 150 * 1024) {
    throw new Error('File must be under 150KB.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('cloud_name', CLOUD_NAME);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    formData,
    {
      onUploadProgress: (event) => {
        if (onProgress && event.total) {
          const percent = Math.round((event.loaded * 100) / event.total);
          onProgress(percent);
        }
      },
    }
  );

  return data.secure_url;
};
