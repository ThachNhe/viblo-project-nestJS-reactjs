
import React from 'react';
import ReactMarkdown from 'react-markdown';

const markdown = `
# Giới thiệu về Node.js

Node.js là một môi trường chạy JavaScript phía server dựa trên V8 engine, được phát triển bởi Google. Được phát hành lần đầu tiên vào năm 2009 bởi Ryan Dahl, Node.js đã nhanh chóng trở thành một trong những công nghệ phổ biến nhất trong phát triển web.

## Lịch sử ra đời

Trước khi Node.js xuất hiện, JavaScript chỉ được sử dụng trong các trình duyệt web phía client. Điều này có nghĩa là các nhà phát triển chỉ có thể sử dụng JavaScript để xử lý tương tác người dùng, kiểm tra đầu vào và thực hiện các thay đổi trên trang web. Tuy nhiên, với sự xuất hiện của Node.js, JavaScript đã vượt ra khỏi phạm vi của trình duyệt và được sử dụng trên server để phát triển các ứng dụng web phía backend.

## Kiến trúc và thiết kế

Node.js được thiết kế dựa trên kiến trúc sự kiện bất đồng bộ (asynchronous event-driven architecture), cho phép xử lý nhiều yêu cầu cùng lúc mà không bị chặn (non-blocking). Điều này mang lại hiệu suất cao hơn so với các server truyền thống như Apache hay IIS, vốn thường sử dụng các mô hình luồng xử lý (threading models) để quản lý nhiều yêu cầu.

### Event Loop

Một trong những đặc điểm nổi bật nhất của Node.js là "event loop" – vòng lặp sự kiện. Đây là một vòng lặp liên tục kiểm tra các sự kiện cần xử lý. Nếu có sự kiện nào cần xử lý, nó sẽ kích hoạt callback tương ứng. Nếu không, nó sẽ tiếp tục chờ đợi các sự kiện khác.

`;
function Posts() {
  return (
    <div className="prose lg:prose-xl">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}

export default Posts;