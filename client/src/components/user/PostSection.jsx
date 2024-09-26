import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarInfo from "./Homepage/CardInfo";
import { useNavigate } from "react-router-dom";
function PostSection({ sectionName, post }) {
  
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerPadding: "1",
  };

  const handlerShowPostDetail = (slug) => {
    navigate(`/p/${slug}`);
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  }

  return (
    <div className="flex flex-col gap-4 py-3 ">
      <span className="text-lg font-semibold text-neutral-700 leading-3">{sectionName}</span>
      <div className="py-1">
        <Slider {...settings}>
          {post &&
            post.length > 0 &&
            post.map((item, index) => {
              return (
                <div key={index} className="px-1 ">
                  <CarInfo
                    index={index}
                    title={item.title}
                    author={item?.author?.fullName}
                    createdAt={item.created_at}
                    viewNumber={item.view_number}
                    commentNumber={item.comment_number}
                    bookmarkNumber={item.bookmark_number}
                    point={10}
                    slug = {item.slug}
                    handlerShowPostDetail = {handlerShowPostDetail}
                  />
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
}

export default PostSection;
