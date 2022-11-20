const { Schema } = require("mongoose");
const mongoose = require("../config/db");

const StudentSchema = mongoose.Schema({
  rollno: Number,
  name: String,
  dept: {
    type: Schema.Types.ObjectId,
    ref: 'Department'
  },
  age: Number,
  sem: Number,
  username: {
    type: String,
    unique: true
  },
  password: String
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;