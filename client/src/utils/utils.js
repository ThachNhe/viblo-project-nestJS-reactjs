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
  try {
    const headingRegex = /^(##?) (.*)$/gm; // Tìm các tiêu đề h2 và h3
    const matches = [...markdown.matchAll(headingRegex)];

    const headingData = matches
      .map((match) => {
        const text = match[2].replace(/\*\*|__/g, "").trim(); // Loại bỏ định dạng markdown

        // Kiểm tra nếu text không rỗng
        if (!text) return null;

        const id = text
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(".", "")
          .replace("(", "")
          .replace(")", ""); // Tạo id từ tiêu đề

        const level = match[1].length === 1 ? 0 : match[1].length === 2 ? 1 : 2;

        return {
          id,
          text,
          level, // Cấp độ từ 1 đến 3
        };
      })
      .filter(Boolean); // Loại bỏ các giá trị null

    return headingData;
  } catch (e) {
    console.log("error when extracting headings:", e);
  }
};
