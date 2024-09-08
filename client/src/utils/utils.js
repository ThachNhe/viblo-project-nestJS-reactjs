import axios from "../axios";

export const handlerFileUpload = async (file) => {
  if (!file) return;
  try {
    // get presigned URL from server
    const response = await axios.put("/minio/presigned-url", {
      fileName: file.name,
    });

    const presignedUrl = response.presignedURL;
    await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    const getUrlResponse = await axios.get(
      `/minio/presigned-get-url?fileName=${file.name}`
    );
    return getUrlResponse;
    // const imageUrl = getUrlResponse;
    // console.log("Image URL:", imageUrl);
  } catch (error) {
    console.error("error when upload!!:", error);
  }
};
