const fs = require('fs');

let errorLogger = (err, req, res, next) => {
    if (err) {
        fs.appendFile('logs/ErrorLogger.txt', "Timestamp: " + new Date().toDateString() + "ERROR - " + err.stack + "\n", (error) => {
            if (error) {
                console.log("logging error failed");
            }
        });
        if (err.status) {
            res.status(err.status);
        } else {
            res.status(500)
        }

        res.json({ "error": err.message })
    }
    next();
}

module.exports = errorLogger;