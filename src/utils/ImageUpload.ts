import axios from "axios";

export const hostImages = async (imageData: File[]) => {
  const url = `https://api.cloudinary.com/v1_1/depy0i4bl/image/upload`;
  const uploadPreset = "my_unsigned_upload";

  const uploadedUrls = [];

  for (let i = 0; i < imageData.length; i++) {
    const formData = new FormData();

    formData.append("file", imageData[i]);
    formData.append("upload_preset", uploadPreset);
    try {
      const response = await axios.post(url, formData);

      if (response.data && response.data.secure_url) {
        uploadedUrls.push(response.data.secure_url);
      } else {
        console.error("Invalid response data", response.data);
      }
    } catch (error: any) {
      console.error("Upload Error:", error.response);
    }
  }

  return uploadedUrls;
};
