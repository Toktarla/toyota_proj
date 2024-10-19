const mongoose = require("mongoose");

const quizHistorySchema = new mongoose.Schema(
  {
    username: { type: String, required: false },
    score: { type: Number},
    totalQuestions: { type: Number },
    date: { type: Date, default: Date.now },
  },
  { collection: "quizHistory" }
);

const QuizHistory = mongoose.model("QuizHistory", quizHistorySchema);

module.exports = { QuizHistory };
