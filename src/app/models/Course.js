const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');


const Schema = mongoose.Schema;

const Course = new Schema({
  name: { type: String, required: true, },
  description: { type: String, },
  image: { type: String, },
  videoId: { type: String, required: true },
  level: { type: String,},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  slug: { type: String, slug: 'name', unique: true,}
},{
  timestamps: true,
});


// Add plugin
mongoose.plugin(slug)
Course.plugin(mongoose_delete, { overrideMethods: 'all',deletedAt : true })


module.exports = mongoose.model('Course', Course);
