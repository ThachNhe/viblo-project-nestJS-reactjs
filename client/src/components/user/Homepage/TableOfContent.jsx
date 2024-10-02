import { NavLink } from "react-router-dom";

function TableOfContents({ headings, activeHeading, onClick }) {
  // Hàm render các tiêu đề theo cấp độ
  const renderHeadings = (headings, level = 1) => {
    return (
      <ul className="flex flex-col gap-3">
        {headings?.map((heading) => (
          // className={``}
          <li key={heading.id} className={`ml-${heading.level * 4}`}>
            <a
              href={`#${heading.id}`}
              onClick={() => onClick(heading.id)}
              className={`block text-sm ${
                activeHeading === heading.id
                  ? "text-blue-600 font-bold"
                  : "text-gray-700"
              } hover:text-blue-400
              block ${
                heading.level === 0
                  ? "text-lg"
                  : heading.level === 1
                  ? "text-base"
                  : "text-sm"
              } ${
                activeHeading === heading.id
                  ? "text-blue-600 font-bold"
                  : "text-gray-700"
              } hover:text-blue-400
                 `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav>
      <div className="flex gap-4">
        <h3 className="font-medium text-lg uppercase text-neutral-700">
          Mục Lục
        </h3>
        <hr className="flex-grow text-red-ful mt-4 text-neutral-900" />
      </div>

      <div className="mt-4">{renderHeadings(headings)}</div>
    </nav>
  );
}

export default TableOfContents;
