const mongoose = require("../config/db");

const DepartmentSchema = mongoose.Schema({
  deptName: String
})

const Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;