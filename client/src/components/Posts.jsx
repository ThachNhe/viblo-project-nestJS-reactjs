
import React from 'react';
import ReactMarkdown from 'react-markdown';


function Posts({data}) {
  return (
    <div className="prose lg:prose-xl">
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
}

export default Posts;