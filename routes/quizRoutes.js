const express = require('express');
const router = express.Router();
const { QuizHistory } = require('../config/schemes/quiz-history.js'); 


router.get('/quiz', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    res.render('quiz');

});

router.get('/quiz-history', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }

    try {
        const quizHistory = await QuizHistory.find({ username: req.session.userId });
        res.render('quiz_history', { quizHistory:quizHistory });
    } catch (error) {
        console.error('Error fetching quiz history:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/submit-quiz', async (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { score, totalQuestions } = req.query; 

    const quizResult = new QuizHistory({
        username: req.session.userId,
        score,
        totalQuestions
    });

    try {
        await quizResult.save();
        res.status(200).json({ message: 'Quiz results stored successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
