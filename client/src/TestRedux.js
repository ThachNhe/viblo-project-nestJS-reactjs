import React, { useState } from "react";
import axios from "./axios";

const TestRedux = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
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
      // const imageUrl = getUrlResponse;
      // console.log("Image URL:", imageUrl);
    } catch (error) {
      console.error("error when upload!!:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default TestRedux;
