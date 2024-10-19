const express = require('express');
const router = express.Router();
const { User } = require('../config/schemes/user.js');
const { Car } = require('../config/schemes/car.js');
const { QuizHistory } = require('../config/schemes/quiz-history.js'); 



router.get('/main', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    res.render('index', { username: req.session.username });

}); 

router.get('/search', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    res.render('search', { username: req.session.username });
});

router.get('/user-info', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    res.render('user_info', { username: req.session.username, email: req.session.email,adminStatus : req.session.adminStatus });
});

router.get('/about', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    res.render('about', { username: req.session.username });
});

router.get('/contactus', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    res.render('contactus', { username: req.session.username });
});

router.get('/support', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    res.render('support', { username: req.session.username });
});

router.post('/setlocale', (req, res) => {
    const locale = req.body.locale;
    req.session.locale = locale; 
    res.sendStatus(200); 
});



router.get('/cars', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }

    try {
        const locale = req.session.locale; 

        const data = await Car.find({ type: "car" });

        const cars = data.map(car => {
            return {
                ...car._doc,
                name: locale === "en" ? car.name.en : car.name.ru,
                description: locale === "en" ? car.description.en : car.description.ru
            };
        });


        res.render('cars', { username: req.session.username, cars: cars });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/suvs', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    try {
        const locale = req.session.locale; 

        const data = await Car.find({ type: "suv" });

        const cars = data.map(car => {
            return {
                ...car._doc,
                name: locale === "en" ? car.name.en : car.name.ru,
                description: locale === "en" ? car.description.en : car.description.ru
            };
        });

        res.render('suvs', { username: req.session.username, cars: cars });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/upcoming', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    try {
        const locale = req.session.locale; 

        const data = await Car.find({ type: "upcoming" });

        const cars = data.map(car => {
            return {
                ...car._doc,
                name: locale === "en" ? car.name.en : car.name.ru,
                description: locale === "en" ? car.description.en : car.description.ru
            };
        });

        res.render('upcoming', { username: req.session.username, cars: cars });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/trucks', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    try {
        const locale = req.session.locale; 

        const data = await Car.find({ type: "truck" });

        const cars = data.map(car => {
            return {
                ...car._doc,
                name: locale === "en" ? car.name.en : car.name.ru,
                description: locale === "en" ? car.description.en : car.description.ru
            };
        });

        res.render('trucks', { username: req.session.username, cars: cars });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/quiz', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    res.render('quiz');

});

router.post('/submit-quiz', async (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { score, totalQuestions } = req.body;

    try {
        const quizResult = new QuizHistory({
            username: req.session.username,
            score,
            totalQuestions
        });
        await quizResult.save();

        res.status(200).json({ message: 'Quiz results stored successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;