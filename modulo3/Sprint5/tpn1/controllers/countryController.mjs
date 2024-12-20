import CountryService from '../services/CountryService.mjs';

export default class CountryController {
  constructor() {
    this.countryService = new CountryService();
  }

  async getAll(req, res) {
    try {
      const countries = await this.countryService.getAllCountries();
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const country = await this.countryService.getCountryById(id);
      if (!country) {
        return res.status(404).json({ error: 'País no encontrado' });
      }
      res.status(200).json(country);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      const newCountry = await this.countryService.addCountry(req.body);
      res.status(201).json(newCountry);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedCountry = await this.countryService.updateCountry(id, req.body);
      if (!updatedCountry) {
        return res.status(404).json({ error: 'País no encontrado' });
      }
      res.status(200).json(updatedCountry);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedCountry = await this.countryService.deleteCountry(id);
      if (!deletedCountry) {
        return res.status(404).json({ error: 'País no encontrado' });
      }
      res.status(200).json({ message: 'País eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

// import  Country  from '../models/Country.mjs';

// export const getAllCountries = async (req, res) => {
//   try {
//     const countries = await Country.find({ category: 'country' });
//     res.json(countries);
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener los países' });
//   }
// };

// export const createCountry = async (req, res) => {
//   try {
//     const newCountry = new Country(req.body);
//     await newCountry.save();
//     res.status(201).json(newCountry);
//   } catch (error) {
//     res.status(400).json({ error: 'Error al crear el país' });
//   }
// };
