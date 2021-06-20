const dbConnection = require('../db/connection');

var Job = function (job) {
    this.jobId = job.jobId,
        this.title = job.jobTitle,
        this.desc = job.jobDesc,
        this.company = job.company,
        this.companyLogoURL = job.companyLogoURL,
        this.location = job.location,
        this.postedBy = job.postedBy,
        this.createdAt = new Date(),
        this.updatedAt = new Date(),
        this.active = job.status ? job.status : 1
}

Job.create = function (newJob, result) {

    const jobPoster = newJob.postedBy;
    dbConnection.query("SELECT role from users WHERE username = ?", jobPoster, function (err, roleResult) {
        let isRecruiter = roleResult[0] && roleResult[0].role === 'R' ? true : false;
        if (err) {
            result(err, null);
        }
        else if (isRecruiter) {
            dbConnection.query("INSERT INTO jobs set ?", newJob, function (err, res) {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, res[0]);
                }
            });
        }
        else {
            result(new Error('Not authorized to post jobs'), null);
        }
    }
    );
};


Job.findAll = function (result) {
    dbConnection.query("SELECT jobs.jobId,jobs.title,jobs.desc,jobs.location,jobs.company,jobs.companyLogoURL,jobs.createdAt,users.username,users.fullName FROM users inner join jobs on jobs.postedBy = users.username", function (err, res) {

        let isNoResults = res.toString() == [];
        if (err || isNoResults) {
            err = isNoResults ? new Error('No jobs found') : err;
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
}

module.exports = Job;

