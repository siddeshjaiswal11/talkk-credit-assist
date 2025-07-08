import React, { useState } from 'react';
import Search from '../../ui/search/Search.jsx';
import './PageHeader.css';

const PageHeader = ({ title = '', showSearchBar = false, onSearchChange }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value) => {
    setSearchValue(value);
    if (onSearchChange) {
      onSearchChange(value); // Pass the search value to the parent component
    }
  };

  return (
    <div className="page-hdr">
      {title && <div className="page-header-title">{title}</div>}
      {showSearchBar && (
        <Search
          placeholder="Search Application"
          value={searchValue}
          onChange={handleSearchChange}
        />
      )}
    </div>
  );
};

export default PageHeader;