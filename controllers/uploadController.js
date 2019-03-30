const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var Image = require('../models/image');

var path = require('path');
// Save uploaded picture.
exports.save_img = [
    // Validate that the name field is not empty.
  //body('filestring').isLength({ min: 1 }),
 //body('filestring').isLength({ min: 1 }).trim().withMessage('First name must be specified.')
 //       .isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
  // Sanitize (escape) the name field.
 // sanitizeBody('filestring').escape(),

  
  // Process request after validation and sanitization.
  upload.single('filestring'),(req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    
    
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render('index', { title: 'PicShare1', imgString: 'kkkkkkkkkkkkkkkkkkkkkk', image: image, errors: errors.array()});
      return;
    }
    else {
      console.log(req.file);
      // Data from form is valid.
      var image = new Image(
        { img_string: req.file.filename,
        upload_date: Date.now()
      } 
      );
      image.save(function (err) {
        if (err) { return next(err); }
        // Successful - redirect to new author record.
        res.render('index', { title: 'PicShare', imgString: 'http://localhost:3000/img/download?img=' + req.file.filename,image: image, errors: errors.array()});
      });
      

    }
  }
];

exports.down_img = function(req, res){
  console.log(req.query.img);
  res.download(path.resolve(__dirname,'../uploads/'+req.query.img),'picshare.jpg');
};


