const mongoose = require('mongoose');
const router = require('express').Router();
const Scores = mongoose.model('Scores');

//POST new score
router.post('/', (req, res, next) => {
    const {body: {scoreInfo}} = req;

    // Validate request
    if (!scoreInfo.user) {
        return res.status(400).json({
            errors: {
                user: "is required"
            }
        });
    }
    if (!scoreInfo.email) {
        return res.status(400).json({
            errors: {
                email: "is required"
            }
        });
    }
    if (!scoreInfo.week) {
        return res.status(400).json({
            errors: {
                week: "is required"
            }
        });
    }
    if (!scoreInfo.score) {
        return res.status(400).json({
            errors: {
                score: "is required"
            }
        });
    }
    
    //All good case - add to db
    userWeek = scoreInfo.user + scoreInfo.week.toString()
    const finalScore = new Scores({userWeek: userWeek, user: scoreInfo.user, week: scoreInfo.week, email: scoreInfo.email, score: scoreInfo.score});
    console.log("scoreInfo is" + JSON.stringify(scoreInfo));
    finalScore.save(function(err) {
        if(!err){
            res.status(200);
            res.send();
        } else {
            console.log(err);
            res.status(400);
            res.json(err);
        }
    });
    
});

router.get('/', (req, res, next) => {
    res.status(200);
    res.json(
        [
            {
                id: 1, 
                score: 90, 
                user: "Pip"
            }, 
            {
                id: 2, 
                score:90, 
                user: "Jim"
            }
        ]
    );
    // TODO: Return leaderboard
});

module.exports = router;