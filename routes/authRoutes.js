const express = require('express');
const router = express.Router();0
const bcrypt = require('bcryptjs');
const { User } = require('../config/schemes/user.js');
const { generateRandomUserId } = require('../utils/generate_random_user_id.js');
const saltRounds = 10;

router.get('/', (req, res) => {
    if (req.session.username) {
        res.redirect('/main');
    } else {
        res.render('register');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/signup', async (req, res) => {
    const { Username, email, password } = req.body;

    if (!Username || !email || !password) {
        return res.status(400).send('<script>alert("All fields are required"); window.location.href="/";</script>');
    }

    try {
        const existingUser = await User.findOne({ name: Username });
        if (existingUser) {
            return res.status(400).send('<script>alert("This username is already taken"); window.location.href="/";</script>');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name: Username,
            email,
            password: hashedPassword,
            userId: generateRandomUserId(), 
            creationDate: new Date(),
            updateDate: null,
            deletionDate: null,
            adminStatus: false 
        });

        await newUser.save();

        req.session.username = Username;
        req.session.email = email;
        req.session.userId = newUser._id; 

        res.redirect('/main');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('<script>alert("Internal Server Error"); window.location.href="/";</script>');
    }
});



router.post('/login', async (req, res) => {
    const { Username, password } = req.body;

    if (!Username || !password) {
        return res.send(`<script>
            document.addEventListener('DOMContentLoaded', function() {
                const errorMessage = 'Username and password are required';
                document.getElementById('errorMessage').innerText = errorMessage;
                new bootstrap.Modal(document.getElementById('loginErrorModal')).show();
            });
        </script>`);
    }

    try {
        const user = await User.findOne({ name: Username }); 

        if (!user) {
            return res.send('<script>alert("No user found with this username"); window.location.href = "/login"; </script>');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            return res.send('<script>alert("Password is incorrect"); window.location.href = "/login"; </script>');
        }

        req.session.username = user.name;
        req.session.email = user.email;
        req.session.userId = user._id; 
        req.session.adminStatus = user.adminStatus; 


        if (user.adminStatus) {
            res.redirect('/admin'); 
        } else {
            res.redirect('/main');
        }
    } catch (err) {
        console.error('Error:', err);
        return res.send('<script>alert("Internal Server Error"); window.location.href = "/login"; </script>');
    }
});

router.post('/signout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
