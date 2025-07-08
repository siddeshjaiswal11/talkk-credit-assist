import React from 'react'
import './Search.css'

const Search = ({ placeholder, value, onChange }) => {
    return (
        <div className="search-wrp">
            <span className="smm smm-search search-icon"></span>
            <input
                type="text"
                className="search-input"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}

export default Search
