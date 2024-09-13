function TagButton({ tagName }) {
  return (
    <button
      type="button"
      className="py-1 px-3 text-xs  inline-flex items-center bg-slate-50 rounded-md hover:bg-blue-100 focus:ring-1 
                focus:outline-none focus:ring-blue-300  border  dark:bg-blue-600 dark:hover:bg-blue-700
                 dark:focus:ring-blue-800
                 text-gray-700 hover:text-neutral-500  font-medium text-center gap-2
                 bg-blue-gray-50 "
    >
      <span>{tagName}</span>
    </button>
  );
}

export default TagButton;
