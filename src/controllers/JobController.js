const Job = require('../models/Job.model');

exports.create = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: 'Invalid data' });
    }
    else {
        const newJob = new Job(req.body);
        Job.create(newJob, function (err, job) {
            if (err) {
                let message = err.message;
                err.code === 'ER_DUP_ENTRY' ? message = 'Job already posted' : message;
                return res.status(409).json({ error: true, message: message });
            }
            return res.status(200).json({ error: false, message: "Job posted successfully!" });
        });
    }
};

exports.findAll = (req, res) => {
    Job.findAll(function (err, jobs) {
        if (err) {
            return res.status(404).send({ error: true, message: 'No jobs found' });
        }
        else if (jobs) {
            return res.status(200).json({ error: false, message: "Jobs fetched successfully!", data: jobs });
        }
    });
}

