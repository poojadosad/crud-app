const express = require("express");
const router = express.Router();
const Student = require("../models/student");

router.get("/", async (req, res) => {
  console.log("get request");
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.send("Error " + err);
  }
});

router.post("/", async (req, res) => {
  console.log("post request");
  const student = new Student({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  try {
    const s1 = await student.save();
    res.json(s1);
  } catch (err) {
    res.send("Error");
  }
});

module.exports = router;
