const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="rounded-lg mb-2 overflow-hidden">
      <button
        className="w-full flex justify-between items-center px-2 py-4 bg-[#F9F9F9] focus:outline-none"
        onClick={onClick}
      >
        <span
          className={`font-semibold text-[#777] ${isOpen ? "text-black" : "text-gray-800"}`}
        >
          {title
            ?.replace(/_/g, " ") // convert underscores to spaces
            ?.replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
        </span>
        <svg
          className={`w-5 h-5 text-[#777] transform transition-transform duration-200 ${
            isOpen ? "-rotate-180 text-black" : "-rotate-90 text-gray-800"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      {isOpen && <div className="px-2 py-4 bg-[#F9F9F9]">{children}</div>}
    </div>
  );
};

export default AccordionItem;
