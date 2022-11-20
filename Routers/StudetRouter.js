const router = require("express").Router();
const Department = require("../Models/Department");
const Student = require("../Models/Student");

const jwt = require("jsonwebtoken");
const localstorage = require("localStorage");
const checktoken = require("../jwt/checktoken");

router.post("/login", (req, res) => {
  Student.find({ username: req.body.username }, (err, data) => {
    const student = data[0];
    if (student) {
      if (req.body.password == student.password) {
        const token = jwt.sign({ studentID: student._id }, process.env.JWT_SECRET);
        localstorage.setItem('token', token);
        res.send(token);
      }
      else {
        res.status(401).send("Unauthorized!!!");
      }
    }
    else {
      res.status(401).send("Invalid credentials!!!");
    }
  })
})

router.get("/getdepts", checktoken, (req, res) => {
  Department.find((err, depts) => {
    res.send(depts);
  })
})

router.get("/", checktoken, (req, res) => {
  var students = [];
  Student.find().populate("dept").exec((err, data) => {
    data.forEach((student) => {
      const studentData = {
        _id: student._id,
        rollno: student.rollno,
        name: student.name,
        dept: student.dept.deptName,
        age: student.age,
        sem: student.sem,
        username: student.username,
        password: student.password
      }
      students.push(studentData);
    })
    res.send(students);
  })
})

router.post("/", (req, res) => {
  const addStudent = new Student({
    rollno: req.body.rollno,
    name: req.body.name,
    dept: req.body.dept,
    age: req.body.age,
    sem: req.body.sem,
    username: req.body.username,
    password: req.body.password
  })
  addStudent.save((err, student) => {
    res.send(student);
  })
})

router.get("/:id", (req, res) => {
  Student.findById({ "_id": req.params.id }).populate("dept").exec((err, data) => {
    const student = {
      _id: data._id,
      rollno: data.rollno,
      name: data.name,
      dept: data.dept.deptName,
      age: data.age,
      sem: data.sem,
      username: data.username,
      password: data.password
    }
    res.send(student);
  })
})

router.put("/:id", (req, res) => {
  Student.findOneAndUpdate({ "_id": req.params.id }, req.body, { new: true }, (err, student) => {
    if (!student) res.status(404).send("No data found!!!");
    res.send(student);
  })
})

router.delete("/:id", (req, res) => {
  Student.findByIdAndRemove({ "_id": req.params.id }, (err, student) => {
    res.send(student);
  })
})

module.exports = router;