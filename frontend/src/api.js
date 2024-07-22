import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class JoblyApi {
    static token = null;

    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${JoblyApi.token}` };

        try {
            const response = await axios({ url, method, data, headers });
            return response.data;
        } catch (err) {
            console.error('API Error:', err.response || err);
            const message = err.response?.data?.error?.message || 'An error occurred';
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async getCompanies() {
        const res = await this.request('companies');
        return res.companies;
    }

    static async getCompany(handle) {
        const res = await this.request(`companies/${handle}`);
        return res.company;
    }

    static async getJobs() {
        const res = await this.request('jobs');
        return res.jobs;
    }

    static async getJob(id) {
        const res = await this.request(`jobs/${id}`);
        return res.job;
    }

    static async searchJobs(query) {
        const params = new URLSearchParams(query).toString();
        const res = await this.request(`jobs?${params}`, {}, 'get');
        return res.jobs;
    }

    static async searchCompanies(query) {
        const params = new URLSearchParams(query).toString();
        const res = await this.request(`companies?${params}`, {}, 'get');
        return res.companies;
    }

    static async login(data) {
        const res = await this.request('auth/token', data, 'post');
        return res.token;
    }

    static async signup(data) {
        const res = await this.request('auth/register', data, 'post');
        return res.token;
    }

    static async getCurrentUser(username) {
        return this.request(`users/${username}`);
    }

    static async updateUser(username, updatedData) {
        try {
            const res = await axios.put(`${BASE_URL}/users/${username}`, updatedData, {
                headers: { Authorization: `Bearer ${this.token}` },
            });
            return res.data;
        } catch (err) {
            console.error('API updateUser error', err);
            throw err;
        }
    }

    static async applyToJob(jobId) {
        return this.request(`jobs/${jobId}/apply`, {}, 'post');
    }
}

export default JoblyApi;
