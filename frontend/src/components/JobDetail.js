// JobDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Job Detail for Job ID: {id}</h1>
            {/* Add more job details here */}
        </div>
    );
};

export default JobDetail;
