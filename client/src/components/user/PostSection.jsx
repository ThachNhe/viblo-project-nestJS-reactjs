import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarInfo from "../CardInfo";
function PostSection({ sectionName, data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div className="flex flex-col gap-4 py-4 ">
      <span className="text-lg font-medium ">{sectionName}</span>
      <div className="py-2">
        <Slider {...settings}>
          {data &&
            data.length > 0 &&
            data.map((item, index) => {
              return (
                <div key={index}>
                  <CarInfo
                    index={index}
                    title={item.title}
                    author={item.author}
                    readTime={item.readTime}
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
