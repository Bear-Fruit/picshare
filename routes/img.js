var express = require('express');
var router = express.Router();

// Require controller modules.
var upload_controller = require('../controllers/uploadController');


// POST request for uploading a pic.
router.post('/upload', upload_controller.save_img);
// POST request for uploading a pic.
router.get('/download', upload_controller.down_img);

module.exports = router;