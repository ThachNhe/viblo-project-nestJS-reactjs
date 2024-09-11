import React from "react";
import ReactMarkdown from "react-markdown";

function Posts({ data, tags }) {
  return (
    <div className="flex flex-col gap-6 py-5 px-3">
      <div className="prose lg:prose-xl">
        <ReactMarkdown>{data}</ReactMarkdown>
      </div>
      <div className="flex gap-3 items-center">
        {tags &&
          tags.length > 0 &&
          tags.map((tag, index) => {
            return (
              <button
                type="button"
                key={index}
                className="py-1 px-4 text-xs  inline-flex items-center bg-slate-200 rounded-sm hover:bg-blue-100 
                  hover:text-gray-600
                 text-gray-500  font-medium text-center gap-2 "
              >
                <span>{tag}</span>
              </button>
            );
          })}
      </div>
    </div>
  );
}

export default Posts;
