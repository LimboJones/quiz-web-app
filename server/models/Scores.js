const mongoose = require('mongoose');
const { Schema } = mongoose;

var Scores;

const ScoresSchema = new Schema({
  userWeek: {
    type: String,
    validate: {
      validator: function(v) {
        return Scores.find({userWeek: v}).then(documents => !documents.length);
      },
      message: 'Entry for this user and week already exists!'
    }
  },
  user: String,
  week: Number,
  email: String,
  score: Number
});

Scores = mongoose.model('Scores', ScoresSchema);