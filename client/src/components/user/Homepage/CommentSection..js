import Comment from "../../Comment";
import CommentForm from "./CommentForm";
import { useState } from "react";

function CommentSection({
  comment,
  handlerOpenResponseForm,
  postId,
  userId,
  commentId,
  responseId,
  onCreateComment,
  parentId,
}) {
  const [resId, setResId] = useState();

  const handlerOpenResToResForm = (commentId) => {
    setResId(commentId);
  };

  return (
    <div className="flex flex-col gap-1 border border-neutral-300 p-2 mt-3 rounded-sm">
      <div>
        <Comment
          fullName={comment?.authorfullname}
          userName={comment?.authorusername}
          date={comment?.createdDate}
          content={comment?.content}
          isAnswer={true}
          handlerOpenResponseForm={handlerOpenResponseForm}
          commentId={commentId}
          userAvatar={comment?.authoravatar}
          // submitComment={submitComment}
        />
        {responseId === commentId && (
          <div className="px-5">
            <CommentForm
              onCreateComment={onCreateComment}
              postId={postId}
              userId={userId}
              parentId={parentId}
              replyForUserId={comment.authorId}
              replyForUserName={comment.authorusername}
            />
          </div>
        )}
      </div>
      <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="px-10">
        {comment?.replies?.map((comment, index) => {
          return (
            <div key={index}>
              <Comment
                fullName={comment?.authorfullname}
                userName={comment?.authorusername}
                date={comment.createdDate}
                content={comment.content}
                commentId={comment.id}
                handlerOpenResToResForm={handlerOpenResToResForm}
                handlerOpenResponseForm={() => console.log("")}
                replyForUserName={comment?.replyForUserName}
                replyForUserId={comment?.replyForUserId}
                userAvatar={comment.authoravatar}
              />
              {resId === comment.id && (
                <div className="px-5">
                  <CommentForm
                    parentId={parentId}
                    onCreateComment={onCreateComment}
                    postId={postId}
                    userId={userId}
                    replyForUserId={comment.authorId}
                    replyForUserName={comment.authorusername}
                  />
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
