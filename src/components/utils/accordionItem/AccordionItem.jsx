import React from "react";
import "./AccordionItem.css"; // Import the CSS file

const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="accordion-item">
      <button className="accordion-button" onClick={onClick}>
        <span className={`accordion-title ${isOpen ? "accordion-title-open" : ""}`}>
          {title
            ?.replace(/_/g, " ") // convert underscores to spaces
            ?.replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
        <svg
          className={`accordion-icon ${isOpen ? "accordion-icon-open" : ""}`}
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
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default AccordionItem;
