const express = require('express');
const authenticateToken = require('../utilities/auth/tokenAuthenticator');
const router = express.Router();
const userController = require('../controllers/UserController');
const jobController = require('../controllers/JobController');
const applicationController = require('../controllers/ApplicationController');

// Route to check API health
router.get('/health', (req, res, next) => {
    res.status(200).json({ 'Status': 'Up and running' });
    next();
});

// Route to add new user
router.post('/user', userController.create);

// Route to authenticate user
router.post('/user/auth', userController.find);

// Route to post a job
router.post('/job', authenticateToken, jobController.create);

// Route to get all jobs posted
router.get('/job', authenticateToken, jobController.findAll);

// Route to post new job application
router.post('/application', authenticateToken, applicationController.create);

// Route to get all applications by recruiterId
router.post('/application/all', authenticateToken, applicationController.findAll);


module.exports = router;