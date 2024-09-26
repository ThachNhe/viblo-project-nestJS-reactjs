import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid";

// / Hàm tạo "slug" từ tiêu đề để làm id
const generateSlug = (text) => {
  const slug = text
    .toLowerCase() // Đổi tất cả thành chữ thường
    .replace(/\s+/g, "-") // Thay thế khoảng trắng thành dấu -
    .replace(/[^\w\-]+/g, ""); // Xóa tất cả ký tự không phải chữ và số
  console.log("generateSlug -> slug", slug);
  return slug;
};

export const markdownConfig = {
  h1: ({ node, ...props }) => (
    <h1
      style={{
        fontSize: "2.5rem",
        color: "#333",
        fontWeight: "600",
      }}
      {...props}
    />
  ),
  h2: ({ node, ...props }) => (
    <h1
      style={{
        fontFamily: "font-normal",
        fontSize: "2rem",
        color: "#333",
        fontWeight: "bold",
      }}
      {...props}
    />
  ),
  h3: ({ node, ...props }) => (
    <h1
      style={{
        fontFamily: "font-normal",
        fontSize: "1.5rem",
        color: "#333",
        fontWeight: "bold",
      }}
      {...props}
    />
  ),
  p: ({ node, ...props }) => (
    <p className="leading-7 text-title-sm" {...props} /> // Điều chỉnh font-size và line-height
  ),
  ul: ({ node, ...props }) => (
    <ul className="list-disc text-3xl leading-5" {...props} /> // Điều chỉnh font-size cho danh sách
  ),
  li: ({ node, ...props }) => (
    <li className="text-sm leading-5" {...props} /> // Điều chỉnh cho các mục danh sách
  ),
  strong: ({ node, ...props }) => (
    <strong className="font-bold" {...props} /> // Điều chỉnh cho phần chữ đậm
  ),
};
