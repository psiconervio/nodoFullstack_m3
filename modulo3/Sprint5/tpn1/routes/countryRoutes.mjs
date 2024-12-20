import express from 'express';
import { getAllCountries, createCountry } from '../controllers/countryController.mjs';

const router = express.Router();

router.get('/countries', getAllCountries);
router.post('/countries', createCountry);

export default router;
