import { NavLink } from "react-router-dom";

function TableOfContents({ headings, activeHeading, onClick }) {
  console.log("activeHeading", activeHeading);
  return (
    <nav className="">
      <h3 className="font-bold text-lg">Mục Lục</h3>
      <ul className="mt-4 space-y-2">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={() => onClick(heading.id)}
              className={`block text-sm ${
                activeHeading === heading.id
                  ? "text-blue-600 font-bold"
                  : "text-gray-700"
              } hover:text-blue-400`}
            >
              {heading.text}
            </a>
            {/* Render các mục con nếu có */}
            {heading.subHeadings && (
              <ul className="ml-4">
                {heading.subHeadings.map((subHeading) => (
                  <li key={subHeading.id}>
                    <NavLink
                      to={`#${subHeading.id}`}
                      onClick={() => onClick(subHeading.id)}
                      className={`block text-xs ${
                        activeHeading === subHeading.id
                          ? "text-blue-600 font-bold"
                          : "text-gray-500"
                      } hover:text-blue-400`}
                    ></NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContents;
