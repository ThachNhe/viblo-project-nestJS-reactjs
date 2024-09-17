import React, { ReactNode } from "react";
import NumberFormatter from "../../../components/NumberFormatter";

const CardDataStats = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white flex items-center">
            <svg
              height={20}
              width={20}
              fill="#000000"
              viewBox="0 0 56 56"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M 8.7461 37.7031 L 15.8945 37.7031 L 13.7617 48.2969 C 13.7148 48.5312 13.6914 48.8125 13.6914 49.0469 C 13.6914 50.1953 14.4883 50.8281 15.5898 50.8281 C 16.7148 50.8281 17.5351 50.2187 17.7695 49.0703 L 20.0664 37.7031 L 31.1524 37.7031 L 29.0195 48.2969 C 28.9492 48.5312 28.9258 48.8125 28.9258 49.0469 C 28.9258 50.1953 29.7227 50.8281 30.8476 50.8281 C 31.9727 50.8281 32.7929 50.2187 33.0273 49.0703 L 35.3008 37.7031 L 43.6680 37.7031 C 44.9570 37.7031 45.8476 36.7656 45.8476 35.5 C 45.8476 34.4687 45.1445 33.6250 44.0898 33.6250 L 36.1445 33.6250 L 38.6289 21.25 L 46.8320 21.25 C 48.1211 21.25 49.0117 20.3125 49.0117 19.0468 C 49.0117 18.0156 48.3086 17.1719 47.2539 17.1719 L 39.4492 17.1719 L 41.3711 7.7265 C 41.3945 7.5859 41.4414 7.2812 41.4414 6.9766 C 41.4414 5.8281 40.6211 5.1719 39.4961 5.1719 C 38.1836 5.1719 37.5976 5.8984 37.3633 7.0000 L 35.3008 17.1719 L 24.2148 17.1719 L 26.1367 7.7265 C 26.1602 7.5859 26.2070 7.2812 26.2070 6.9766 C 26.2070 5.8281 25.3633 5.1719 24.2617 5.1719 C 22.9258 5.1719 22.3164 5.8984 22.1055 7.0000 L 20.0429 17.1719 L 12.3555 17.1719 C 11.0664 17.1719 10.1758 18.1563 10.1758 19.4453 C 10.1758 20.5 10.8789 21.25 11.9336 21.25 L 19.2227 21.25 L 16.7383 33.6250 L 9.1680 33.6250 C 7.8789 33.6250 6.9883 34.6094 6.9883 35.8984 C 6.9883 36.9531 7.6914 37.7031 8.7461 37.7031 Z M 20.8867 33.6250 L 23.3945 21.25 L 34.4805 21.25 L 31.9727 33.6250 Z"></path>
              </g>
            </svg>
            <NumberFormatter number={total} />
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            levelUp && "text-meta-3"
          } ${levelDown && "text-meta-5"} `}
        >
          {rate}

          {levelUp && (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {levelDown && (
            <svg
              className="fill-meta-5"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
