// Companies.js

import React, { useState, useEffect, useCallback } from 'react';
import SearchForm from './SearchForm';
import CompanyList from './CompanyList';
import JoblyApi from '../api';

const Companies = ({ handleSearchResults }) => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCompanies = useCallback(async () => {
        console.log('Fetching companies...');
        try {
            const response = await JoblyApi.getCompanies();
            setCompanies(response);
            if (handleSearchResults) handleSearchResults(response);
        } catch (err) {
            console.error('Error fetching companies:', err);
        }
        setLoading(false);
    }, [handleSearchResults]);

    const handleSearch = async (query) => {
        setLoading(true);
        try {
            const response = await JoblyApi.searchCompanies(query);
            setCompanies(response);
            if (handleSearchResults) handleSearchResults(response);
        } catch (err) {
            console.error('Error searching companies:', err);
            setCompanies([]);
            if (handleSearchResults) handleSearchResults([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        console.log('useEffect triggered for Companies');
        fetchCompanies();
    }, [fetchCompanies]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Companies</h1>
            <SearchForm onSearch={handleSearch} />
            <CompanyList companies={companies} />
        </div>
    );
};

export default Companies;
