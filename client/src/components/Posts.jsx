import React from "react";
import ReactMarkdown from "react-markdown";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
function Posts({ data }) {
  return (
    <div className="prose lg:prose-xl">
        <ReactMarkdown>{data}</ReactMarkdown>
      </div>
  );
}

export default Posts;
