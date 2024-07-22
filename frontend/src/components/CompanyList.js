// CompanyList.js

import React from 'react';
import CompanyCard from './CompanyCard';
import '../App.css'; // Import CSS file containing styles

const CompanyList = ({ companies }) => {
    if (companies.length === 0) {
        return <p>No companies found.</p>;
    }

    return (
        <div className="CompanyList-container">
            {companies.map((company) => (
                <CompanyCard
                    key={company.handle}
                    handle={company.handle}
                    name={company.name}
                    description={company.description}
                    logoUrl={company.logoUrl}
                    className="CompanyCard"
                />
            ))}
        </div>
    );
};

export default CompanyList;
