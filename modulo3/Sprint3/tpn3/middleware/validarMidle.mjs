import { body, validationResult } from 'express-validator';

export const validarCamposSuperHeroe = [
  body('nombreSuperheroe')
    .trim()
    .notEmpty()
    .withMessage('El nombre del superhéroe es obligatorio')
    .isLength({ min: 3, max: 60 })
    .withMessage('El nombre debe tener entre 3 y 60 caracteres'),
  body('nombreReal')
    .trim()
    .notEmpty()
    .withMessage('El nombre real es obligatorio')
    .isLength({ min: 3, max: 60 })
    .withMessage('El nombre real debe tener entre 3 y 60 caracteres'),
  body('edad')
    .isInt({ min: 0 })
    .withMessage('La edad debe ser un número mayor o igual a 0'),
  body('poderes')
    .isArray({ min: 1 })
    .withMessage('Los poderes deben ser un array con al menos un elemento')
    .custom((poderes) => {
      const valid = poderes.every(
        (poder) => typeof poder === 'string' && poder.trim().length >= 3 && poder.trim().length <= 60
      );
      if (!valid) throw new Error('Cada poder debe tener entre 3 y 60 caracteres');
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
