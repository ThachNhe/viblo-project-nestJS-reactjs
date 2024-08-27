import Comment from "../../components/Comment";
import CommentForm from "../../components/CommentForm";
import { useState } from "react";

function CommentSection({
  comment,
  handlerOpenResponseForm,
  commentId,
  responseId,
}) {
  const [resId, setResId] = useState();

  const handlerOpenResToResForm = (commentId) => {
    setResId(commentId);
  };

  return (
    <div className="flex flex-col gap-1 border p-2 mt-3">
      <div>
        <Comment
          fullName={comment?.user?.fullName}
          userName={comment?.user?.userName}
          date={comment.date}
          content={comment.content}
          isAnswer={true}
          handlerOpenResponseForm={handlerOpenResponseForm}
          commentId={commentId}
          // submitComment={submitComment}
        />
        {responseId === commentId && (
          <div className="px-5">
            <CommentForm />
          </div>
        )}
      </div>
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="px-10">
        {comment?.comments.map((comment, index) => {
          return (
            <div key={index}>
              <Comment
                fullName={comment?.user?.fullName}
                userName={comment?.user?.userName}
                date={comment.date}
                content={comment.content}
                commentId={comment.id}
                handlerOpenResToResForm={handlerOpenResToResForm}
                handlerOpenResponseForm={() => console.log("")}
              />
              {resId === comment.id && (
                <div className="px-5">
                  <CommentForm />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CommentSection;
