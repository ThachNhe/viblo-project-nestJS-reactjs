import axios from "../axios";
import { unified } from "unified";
import remarkParse from "remark-parse";

export const handlerFileUpload = async (file) => {
  if (!file) return;
  try {
    // get presigned URL from server
    const response = await axios.put(
      `/minio/presigned-url?fileName=${file.name}`
    );

    console.log("response:", response);

    const presignedUrl = response.presignedURL;
    await axios.put(presignedUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    const getUrlResponse = await axios.get(
      `/minio/presigned-get-url?fileName=${file.name}`
    );
    console.log("getUrlResponse:", getUrlResponse);
    return getUrlResponse;
  } catch (error) {
    console.error("error when upload!!:", error);
  }
};

export const extractHeadings = (markdownText) => {
  // Parse the markdown content using remark-parse
  const tree = unified().use(remarkParse).parse(markdownText);
  const headings = [];

  // Traverse the markdown AST and extract heading nodes
  tree.children.forEach((node) => {
    if (node.type === "heading") {
      const depth = node.depth; // Depth indicates the heading level (1 for h1, 2 for h2, etc.)
      const text = node.children.map((child) => child.value).join("");

      headings.push({ depth, text });
    }
  });

  return headings;
};
