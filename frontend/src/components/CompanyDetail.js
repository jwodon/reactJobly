// CompanyDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import JobList from './JobList';
import '../App.css'; // Ensure to have appropriate styles

const CompanyDetail = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                let companyData = await JoblyApi.getCompany(handle);
                setCompany(companyData);
            } catch (err) {
                console.error('Error fetching company details:', err);
            }
            setLoading(false);
        };

        fetchCompany();
    }, [handle]);

    if (loading) return <p>Loading...</p>;

    if (!company) return <p>Company not found.</p>;

    return (
        <div>
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <h2>Jobs at {company.name}</h2>
            <JobList jobs={company.jobs} />
        </div>
    );
};

export default CompanyDetail;
