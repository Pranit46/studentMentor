const mongoose = require("mongoose");
const { Schema } = mongoose;
const MentorSchema = new Schema({
  Mentor_name: { type: String, required: true },
  Mentor_ID: { type: Number, index: { unique: true }, required: true },
  Students: [{ type: Schema.Types.ObjectId, ref: "student" }],
});

const mentor = mongoose.model("mentor", MentorSchema);

module.exports = mentor;
