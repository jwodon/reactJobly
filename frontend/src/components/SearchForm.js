import React, { useState } from 'react';

const SearchForm = ({ onSearch, placeholder }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ title: searchTerm }); // Pass 'title' for jobs
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchForm;
