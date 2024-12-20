import  Country  from '../models/Country.mjs';

export const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find({ category: 'country' });
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los países' });
  }
};

export const createCountry = async (req, res) => {
  try {
    const newCountry = new Country(req.body);
    await newCountry.save();
    res.status(201).json(newCountry);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el país' });
  }
};
