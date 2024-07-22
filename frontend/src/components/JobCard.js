import React, { useContext, useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../App'; // Import UserContext
import '../App.css'; // Ensure to have appropriate styles

function JobCard({ id, title, salary, equity, companyName }) {
    const { currentUser, applyToJob, hasAppliedToJob } = useContext(UserContext); // Use UserContext
    const [applied, setApplied] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setApplied(hasAppliedToJob(id));
        }
    }, [id, hasAppliedToJob, currentUser]);

    /** Apply for a job */
    async function handleApply() {
        if (!applied && currentUser) {
            try {
                await applyToJob(id); // Apply for the job
                setApplied(true); // Update button state
            } catch (err) {
                console.error('Error applying for job:', err);
            }
        }
    }

    return (
        <div className="JobCard card">
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <p>{companyName}</p>
                {salary && (
                    <div>
                        <small>Salary: {salary}</small>
                    </div>
                )}
                {equity !== undefined && (
                    <div>
                        <small>Equity: {equity}</small>
                    </div>
                )}
                <button
                    className="btn btn-danger font-weight-bold text-uppercase float-right"
                    onClick={handleApply}
                    disabled={applied}>
                    {applied ? 'Applied' : 'Apply'}
                </button>
            </div>
        </div>
    );
}

export default JobCard;
