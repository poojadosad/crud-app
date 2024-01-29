const express = require("express");
const router = express.Router();
const Student = require("../models/student");
const student = require("../models/student");

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
    res.redirect("/");
  } catch (err) {
    res.send("Error posting student " + err);
  }
});

router.delete("/:id", async (req, res) => {
  const response = await student.deleteOne({ _id: req.params.id });
  res.send(JSON.stringify(response));
});

router.put("/:id", async (req, res) => {
  const response = await student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.send(response);
});

module.exports = router;
