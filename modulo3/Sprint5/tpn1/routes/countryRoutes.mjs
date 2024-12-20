import express from 'express';
import { getAllCountries, createCountry } from '../controllers/countryController.mjs';
import {  } from "../controllers/countryController.mjs";
const router = express.Router();

// router.get('/countries', getAllCountries);
// router.post('/countries', createCountry);

router.get('/', (req, res) => countryController.getAll(req, res));
router.get('/:id', (req, res) => countryController.getById(req, res));
router.post('/', (req, res) => countryController.create(req, res));
router.put('/:id', (req, res) => countryController.update(req, res));
router.delete('/:id', (req, res) => countryController.delete(req, res));


export default router;
