const express = require('express');
const axios = require('axios');

const router = express.Router();

const API_KEY = process.env.API_KEY;
const CAR_API_KEY = process.env.CAR_API_KEY;


router.get('/searchByFuel', async (req, res) => {
    const { model, fuel_type } = req.query;

    const options = {
        method: 'GET',
        url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
        params: {
            model,
            fuel_type,
        },
        headers: {
            'X-RapidAPI-Key': CAR_API_KEY,
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching car data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/get-cars', async (req, res) => {
    const make = req.query.make; 
    const model = req.query.model; 
    try {
        const carData = await getCars(make, model); 
        res.json(carData); 

    } catch (error) {
        console.error('Error fetching car data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

async function getCars(make, model) {
    const url = `https://www.carqueryapi.com/api/0.3/?cmd=getTrims&make=${make}&model=${model}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching car data:', error);
        throw error;
    }
}

router.get('/searchByYearMake', async (req, res) => {
    const { year, make } = req.query;
    const url = `https://mc-api.marketcheck.com/v2/search/car/active?api_key=${API_KEY}&year=${year}&make=${make}&include_relevant_links=true`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error searching cars by year and make:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/searchByYearMakeModel', async (req, res) => {
    const { year, make, model } = req.query;
    const url = `https://mc-api.marketcheck.com/v2/search/car/active?api_key=${API_KEY}&year=${year}&make=${make}&model=${model}&include_relevant_links=true`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error searching cars by year, make, and model:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/searchByColor', async (req, res) => {
    const { year, make, model, color } = req.query;

    const url = `https://mc-api.marketcheck.com/v2/search/car/active?api_key=${API_KEY}&car_type=used&year=${year}&make=${make}&model=${model}&exterior_color=${color}&include_relevant_links=true`;
    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error searching cars by country:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
