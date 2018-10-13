const mongoose = require('mongoose');
const router = require('express').Router();
// const Rounds = mongoose.model('Rounds');

//GET rounds
router.get('/', (req, res, next) => {
    res.status(200);
    res.json(
        [
            {
                name: "Trivia",
                questions: [
                    "Round one question one",
                    "Round one question two"
                ]
            },
            
            {
                name: "True or False",
                questions: [
                    "Here is a very long question to simulate the length of some of the 'Who Am I' style questions that can be about 8 lines long. I'm hoping that this won't break my table styling, but you never know really, do you? Let's see how it goes. W WWWW WWWW WWWW WWWW WWWWW WWW WWW WWWWWWW WWW WWWWW WWWW WWW WWWW WWWW WWWW WWW WWW WWWW WWW WW WWW WWW WWW WWW WWW WWW WWW WWW WWW WWW WWW WWW WWW WWW",
                    "Round two question two"
                ]
            }
        ]
    );
});

module.exports = router;