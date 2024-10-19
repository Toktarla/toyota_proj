const express = require('express');
const bcrypt = require('bcryptjs');
const saltRounds = 7;

const router = express.Router();
const { User } = require('../config/schemes/user.js');
const { Car } = require('../config/schemes/car.js');

router.get('/admin', async (req, res) => {
    const users = await User.find();
    res.render('admin', { users }); 
});

router.get('/delete-user/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
});

router.get('/edit-user/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edit_user', { user });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/update-user/:id', async (req, res) => {
    const { name, email, password, adminStatus } = req.body;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).send('Invalid email format');
    }

   

    try {
        const updates = { name, email, adminStatus: adminStatus === 'on', updateDate: new Date() };

        if (password) {
            updates.password = await bcrypt.hash(password, saltRounds);
        }

        await User.findByIdAndUpdate(req.params.id, updates);

        res.redirect('/admin');
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/car-crud', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    
    try {
        const carsCar = await Car.find({ type: 'car' });
        const carsSuv = await Car.find({ type: 'suv' });
        const carsTruck = await Car.find({ type: 'truck' });
        const carsUpcoming = await Car.find({ type: 'upcoming' });

        const allCars = [...carsCar, ...carsSuv, ...carsTruck, ...carsUpcoming];

        res.render('car_crud', { cars: allCars });
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/add-car', async (req, res) => {
    const { name_en, name_ru, description_en, description_ru, pictureUrl, type } = req.body;

    try {
        const newCar = new Car({ 
            name: { en: name_en, ru: name_ru }, 
            description: { en: description_en, ru: description_ru }, 
            pictureUrl, 
            type,
            createdAt: new Date(),
            updatedAt: null,
            deletedAt: null
        });
        await newCar.save();

        res.redirect('/car-crud');
    } catch (error) {
        console.error('Error adding car:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/edit-car/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        res.render('edit_car', { car });
    } catch (error) {
        console.error('Error fetching car:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/add-car', async (req, res) => {
    if (!req.session.username) {
        return res.redirect('/');
    }
    res.render('add_car');


});

router.post('/edit-car/:id', async (req, res) => {
    const { name_en, name_ru, description_en, description_ru, pictureUrl, type } = req.body;

    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        car.name = { en: name_en, ru: name_ru };
        car.description = { en: description_en, ru: description_ru };
        car.pictureUrl = pictureUrl;
        car.type = type;
        car.updatedAt = new Date();
        await car.save();

        res.redirect('/car-crud');
    } catch (error) {
        console.error('Error editing car:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/delete-car/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) {
            return res.status(404).send('Car not found');
        }
        await car.deleteOne();

        res.redirect('/car-crud');
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
