// Jobs.js

import React, { useEffect, useState } from 'react';
import JoblyApi from '../api';
import JobCard from './JobCard';
import '../App.css'; // Ensure you have the styles for Jobs component

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                setLoading(true);
                const jobs = await JoblyApi.getJobs();
                setJobs(jobs);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) return <p>Loading jobs...</p>;
    if (error) return <p>Error loading jobs: {error.message}</p>;

    return (
        <div className="JobList-container">
            {jobs.length === 0 ? (
                <p>No jobs available</p>
            ) : (
                jobs.map(job => (
                    <JobCard 
                        key={job.id}
                        id={job.id}
                        title={job.title}
                        salary={job.salary}
                        equity={job.equity}
                        companyName={job.companyName}
                    />
                ))
            )}
        </div>
    );
};

export default Jobs;
