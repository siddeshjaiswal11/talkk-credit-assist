const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-2 overflow-hidden">
      <button
        className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none"
        onClick={onClick}
      >
        <span className="font-semibold text-gray-800">{title}</span>
        <svg
          className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
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
      {isOpen && (
        <div className="p-4 bg-white border-t border-gray-200">{children}</div>
      )}
    </div>
  );
};

export default AccordionItem;