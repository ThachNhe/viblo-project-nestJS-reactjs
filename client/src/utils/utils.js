import axios from "../axios";

export const handlerFileUpload = async (file) => {
  if (!file) return;
  try {
    // get presigned URL from server
    const response = await axios.put(
      `/minio/presigned-url?fileName=${file.name}`
    );

    const presignedUrl = response.presignedURL;
    await axios.put(presignedUrl, file);

    const getUrlResponse = await axios.get(
      `/minio/presigned-get-url?fileName=${file.name}`
    );
    return getUrlResponse;
  } catch (error) {
    console.error("error when upload!!:", error);
  }
};

export const extractHeadings = (markdown) => {
  const headingRegex = /^###? (.*)$/gm; // Tìm các tiêu đề h2 và h3
  const matches = [...markdown.matchAll(headingRegex)];

  const headingData = matches.map((match) => {
    const text = match[1].replace(/\*\*|__/g, "");
    const id = text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(".", "")
      .replace("(", "")
      .replace(")", ""); // Tạo id từ tiêu đề
    return {
      id,
      text,
      level: match[0].startsWith("##") ? 2 : 3, // Đoán level dựa trên dấu #
    };
  });

  return headingData;
};
