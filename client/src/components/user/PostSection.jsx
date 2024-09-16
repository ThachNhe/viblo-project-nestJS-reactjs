import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarInfo from "./Homepage/CardInfo";
function PostSection({ sectionName, post }) {
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    centerPadding: "1",
  };

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
                    author={item?.author?.userName}
                    createdAt={item.created_at}
                    viewNumber={item.viewNumber}
                    commentNumber={item.commentNumber}
                    bookmarkNumber={item.bookmarkNumber}
                    point={10}
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
