const mongoose = require("mongoose");
const { Schema } = mongoose;
const StudentSchema = new Schema({
  Student_name: { type: String, required: true },
  Student_ID: { type: Number, index: { unique: true }, required: true },
  Mentor_Assigned: { type: Boolean, default: false },
});

const student = mongoose.model("student", StudentSchema);

module.exports = student;
