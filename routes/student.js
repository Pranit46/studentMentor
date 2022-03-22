const express = require("express");
const mongoose = require("mongoose");
const student = require("../models/StudentSchema");
const mentor = require("../models/MentorSchema");
const router = express.Router();
const { dbUrl } = require("../dbConfig");

mongoose.connect(dbUrl);

router.post("/addstudent", async (req, res) => {
  try {
    const studentData = await student.create(req.body);
    res.status(200).json(studentData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/showstudent", async (req, res) => {
  try {
    const studentData = await student.find();
    res.status(200).json(studentData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/notassigned-student", async (req, res) => {
  try {
    const studentData = await student.find({Mentor_Assigned:false});
    res.status(200).json(studentData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/edit-student/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let document = await student.findOneAndReplace(
      { _id: req.params.id },
      req.body
    );
    if (document) {
      res.json({
        message: "Data Changed Successfully!",
      });
    } else {
      res.status(404).json({
        message: "Invalid Id",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal Server Error!",
    });
  }
});

router.delete("/delete-student/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let document = await student.findOneAndDelete({ _id: req.params.id });
    if (document) {
      res.json({
        message: "Data Deleted Successfully!",
      });
    } else {
      res.status(404).json({
        message: "Invalid Id",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      message: "Internal Server Error!",
    });
  }
});

module.exports = router;
