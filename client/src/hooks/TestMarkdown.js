import React from "react";
import ReactMarkdown from "react-markdown";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkToc from "remark-toc";
import remarkStringify from "remark-stringify";
import rehypeReact from "rehype-react";

// Nội dung Markdown
const markdownContent = `
# Giới thiệu

Chào mừng bạn đến với hướng dẫn.

## Chương 1: Giới thiệu về Markdown

Markdown là một ngôn ngữ đánh dấu nhẹ nhàng.

## Chương 2: Cài Đặt

Hướng dẫn cài đặt Markdown.

### Bước 1: Cài Đặt Node.js

Cài đặt Node.js từ trang chính thức.

### Bước 2: Cài Đặt Thư Viện

Sử dụng npm để cài đặt các thư viện cần thiết.

## Chương 3: Sử Dụng

Sử dụng Markdown để tạo nội dung.
`;

const TestMarkdown = () => {
  const [headers, setHeaders] = React.useState("");

  React.useEffect(() => {
    // Xử lý nội dung Markdown để lấy phần tiêu đề
    unified()
      .use(remarkParse)
      .use(remarkToc, { tight: true }) // Sử dụng remark-toc để thêm mục lục vào nội dung
      .use(remarkStringify)
      .process(markdownContent, (err, file) => {
        if (err) throw err;
        // Lấy nội dung và tách phần tiêu đề từ nội dung
        const content = String(file);
        // Tách phần tiêu đề từ nội dung Markdown đã xử lý
        const headerContent = content.split("\n\n")[0];
        setHeaders(headerContent);
      });
  }, []);

  return (
    <div>
      <h2>Mục Lục</h2>
      <ReactMarkdown>{headers}</ReactMarkdown>
    </div>
  );
};

export default TestMarkdown;
