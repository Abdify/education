import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Search = () => {
    return (
        <div className="search-container">
            <div className="search">
                <input className="search-input" placeholder="What are you looking for?" />
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </div>
            <select>
                <option value="" disabled selected>
                    Filter Search
                </option>
            </select>
        </div>
    );
};

export default Search;