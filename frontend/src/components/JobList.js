// JobList.js
import React from 'react';
import JobCard from './JobCard';
import '../App.css'; // Ensure to have appropriate styles

const JobList = ({ jobs }) => {
    if (jobs.length === 0) {
        return <p>No jobs found.</p>;
    }

    return (
        <div className="JobList-container">
            {jobs.map(job => (
                <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    salary={job.salary}
                    equity={job.equity}
                    companyName={job.companyName}
                />
            ))}
        </div>
    );
};

export default JobList;
