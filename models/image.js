var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imageSchema = new Schema(
  {
    img_string: {type: String, required: true, max: 100},
    upload_date: {type: Date}
  }
);

// Virtual for author's URL
imageSchema
.virtual('url')
.get(function () {
  return '/img/upload/' + this._id;
});

//Export model
module.exports = mongoose.model('Image', imageSchema);
