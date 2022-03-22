const express = require("express");
const mongoose = require("mongoose");
const student = require("../models/StudentSchema");
const mentor = require("../models/MentorSchema");
const router = express.Router();
const { dbUrl } = require("../dbConfig");

mongoose.connect(dbUrl);

// Add the mentor
router.post("/addmentor", async (req, res) => {
  try {
    const studentData = await student.updateOne({ _id: req.body.Students},{$set:{Mentor_Assigned: true}});
    const mentorData = await mentor.create(req.body);
    res.status(200).json(mentorData);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// To show all mentor
router.get("/showmentor", async (req, res) => {
  try {
    const mentorData = await mentor.find().populate("Students");
    res.status(200).json(mentorData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Assign student to mentor
router.put("/assignstudent/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const studentData = await student.updateOne({ _id: req.body.Students},{$set:{Mentor_Assigned: true}});
    console.log(studentData);
    const mentorData = await mentor.updateOne({
      Mentor_ID: req.params.id,
      $push: { Students: req.body.Students },
    });
    res.send(mentorData);
  } catch (error) {
    res.send(error);
  }
});

router.get("/show-mentor-student/:id", async (req, res) => {
  try {
    const mentorData = await mentor.find({
      Mentor_ID: req.params.id,
    },{Students:1}).populate("Students");
    res.send(mentorData);
  } catch (error) {
    res.send(error);
  }
});

// Delete Student from mentor
router.put("/delete-assignstudent/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const mentorData = await mentor.updateOne({
      Mentor_ID: req.params.id,
      $pull: { Students: req.body.Students },
    });
    res.send(mentorData);
  } catch (error) {
    res.send(error);
  }
});

// Update the mentor
router.put("/edit-mentor/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let document = await mentor.findOneAndReplace(
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

// Delete the mentor
router.delete("/delete-mentor/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let document = await mentor.findOneAndDelete({ _id: req.params.id });
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
