const dbConnection = require('../db/connection');

var Application = function (application) {
    this.applicationId = application.applicationId,
        this.jobId = application.jobId,
        this.appliedBy = application.appliedBy,
        this.experience = application.experience,
        this.noticePeriod = application.noticePeriod,
        this.resumeLink = application.resumeLink,
        this.postedBy = application.postedBy,
        this.createdAt = new Date(),
        this.updatedAt = new Date()
}

Application.create = function (newApplication, result) {
    const jobApplicant = newApplication.appliedBy;
    dbConnection.query("SELECT role from users WHERE username = ?", jobApplicant, function (err, roleResult) {
        let isApplicant = roleResult[0] && roleResult[0].role === 'J' ? true : false;
        if (err) {
            result(err, null);
        }
        else if (isApplicant) {
            dbConnection.query("INSERT INTO applications set ?", newApplication, function (err, res) {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, res[0]);
                }
            });
        }
        else {
            result(new Error('Not authorized to apply for jobs'), null);
        }
    }
    );
};


Application.findAll = function (recruiterId, result) {
    dbConnection.query("SELECT  applications.*, jobs.title, users.fullName FROM jobs inner join applications on jobs.jobId = applications.jobId inner join users on users.username=applications.appliedBy where applications.postedBy=?", [recruiterId], function (err, res) {

        let isNoResults = res.toString() == [];
        if (err || isNoResults) {
            err = isNoResults ? new Error('No applications found') : err;
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
}

module.exports = Application;

