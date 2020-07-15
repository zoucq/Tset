var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/nodejs');
export.mongoose=mongoose;