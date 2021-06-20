const Application = require('../models/Application.model');

exports.create = (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: 'Invalid data' });
    }
    else {
        const newApplication = new Application(req.body);
        Application.create(newApplication, function (err, application) {
            if (err) {
                let message = err.message;
                err.code === 'ER_DUP_ENTRY' ? message = 'You already applied for this job' : message;
                return res.status(409).json({ error: true, message: message });
            }
            return res.status(200).json({ error: false, message: "Job Applied successfully!" });
        });
    }
};

exports.findAll = (req, res) => {

    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        return res.status(400).send({ error: true, message: 'Invalid data' });
    }
    else {
        const recruiterId = req.body.recruiterId;
        Application.findAll(recruiterId, function (err, applications) {
            if (err) {
                return res.status(404).send({ error: true, message: 'No applications found' });
            }
            else if (applications) {
                return res.status(200).json({ error: false, message: "Applications fetched successfully!", data: applications });
            }
        });
    }
}

