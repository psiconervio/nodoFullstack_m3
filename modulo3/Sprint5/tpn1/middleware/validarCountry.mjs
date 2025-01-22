import { body, validationResult } from 'express-validator';
//Los middlewares son funciones intermedias que pueden realizar tareas como autenticación,
//  registro de solicitudes, validación de datos, o manejo de errores.
export const validateCountry = [
  body('name.common')
    .trim()
    .notEmpty()
    .withMessage('El nombre común es obligatorio.'),
  body('name.official')
    .trim()
    .notEmpty()
    .withMessage('El nombre oficial es obligatorio.'),
  body('capital')
    .isArray({ min: 1 })
    .withMessage('Debe haber al menos una capital.')
    .custom((value) => value.every((v) => typeof v === 'string' && v.trim() !== ''))
    .withMessage('Cada capital debe ser una cadena de texto no vacía.'),
  body('region')
    .trim()
    .notEmpty()
    .withMessage('La región es obligatoria.'),
  body('subregion')
    .trim()
    .notEmpty()
    .withMessage('La subregión es obligatoria.'),
  body('population')
    .isInt({ min: 0 })
    .withMessage('La población debe ser un número entero positivo.'),
  body('area')
    .isFloat({ min: 0 })
    .withMessage('El área debe ser un número positivo.'),
  body('creator')
    .trim()
    .notEmpty()
    .withMessage('El creador es obligatorio.'),
  body('startOfWeek')
    .trim()
    .notEmpty()
    .withMessage('El inicio de la semana es obligatorio.'),
  body('flags.svg')
    .trim()
    .notEmpty()
    .withMessage('La bandera (SVG) es obligatoria.'),
  body('flags.png')
    .trim()
    .notEmpty()
    .withMessage('La bandera (PNG) es obligatoria.'),
  body('maps.openStreetMaps')
    .trim()
    .notEmpty()
    .withMessage('El enlace de OpenStreetMaps es obligatorio.'),
  body('maps.googleMaps')
    .trim()
    .notEmpty()
    .withMessage('El enlace de Google Maps es obligatorio.'),
  body('flag')
    .trim()
    .notEmpty()
    .withMessage('La bandera es obligatoria.'),
  body('landlocked')
    .isBoolean()
    .withMessage('El campo sin litoral debe ser un valor booleano.'),
  body('unMember')
    .isBoolean()
    .withMessage('El campo miembro de la ONU debe ser un valor booleano.'),
  body('status')
    .trim()
    .notEmpty()
    .withMessage('El estado es obligatorio.'),
  body('independent')
    .isBoolean()
    .withMessage('El campo independiente debe ser un valor booleano.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => {
        switch (error.param) {
          case 'name.common':
            return 'El nombre común es obligatorio y no puede estar vacío.';
          case 'name.official':
            return 'El nombre oficial es obligatorio y no puede estar vacío.';
          case 'capital':
            return 'Debe haber al menos una capital y cada capital debe ser una cadena de texto no vacía.';
          case 'region':
            return 'La región es obligatoria y no puede estar vacía.';
          case 'subregion':
            return 'La subregión es obligatoria y no puede estar vacía.';
          case 'population':
            return 'La población debe ser un número entero positivo.';
          case 'area':
            return 'El área debe ser un número positivo.';
          case 'creator':
            return 'El creador es obligatorio y no puede estar vacío.';
          case 'startOfWeek':
            return 'El inicio de la semana es obligatorio y no puede estar vacío.';
          case 'flags.svg':
            return 'La bandera (SVG) es obligatoria y no puede estar vacía.';
          case 'flags.png':
            return 'La bandera (PNG) es obligatoria y no puede estar vacía.';
          case 'maps.openStreetMaps':
            return 'El enlace de OpenStreetMaps es obligatorio y no puede estar vacío.';
          case 'maps.googleMaps':
            return 'El enlace de Google Maps es obligatorio y no puede estar vacío.';
          case 'flag':
            return 'La bandera es obligatoria y no puede estar vacía.';
          case 'landlocked':
            return 'El campo sin litoral debe ser un valor booleano.';
          case 'unMember':
            return 'El campo miembro de la ONU debe ser un valor booleano.';
          case 'status':
            return 'El estado es obligatorio y no puede estar vacío.';
          case 'independent':
            return 'El campo independiente debe ser un valor booleano.';
          default:
            return error.msg;
        }
      });
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  }
];
// import { body, validationResult } from 'express-validator';

// export const validateCountry = [
//   body('name.common')
//     .trim()
//     .notEmpty()
//     .withMessage('El nombre común es obligatorio.'),
//   body('name.official')
//     .trim()
//     .notEmpty()
//     .withMessage('El nombre oficial es obligatorio.'),
//   body('capital')
//     .isArray({ min: 1 })
//     .withMessage('Debe haber al menos una capital.')
//     .custom((value) => value.every((v) => typeof v === 'string' && v.trim() !== ''))
//     .withMessage('Cada capital debe ser una cadena de texto no vacía.'),
//   body('region')
//     .trim()
//     .notEmpty()
//     .withMessage('La región es obligatoria.'),
//   body('subregion')
//     .trim()
//     .notEmpty()
//     .withMessage('La subregión es obligatoria.'),
//   body('population')
//     .isInt({ min: 0 })
//     .withMessage('La población debe ser un número entero positivo.'),
//   body('area')
//     .isFloat({ min: 0 })
//     .withMessage('El área debe ser un número positivo.'),
//   body('creator')
//     .trim()
//     .notEmpty()
//     .withMessage('El creador es obligatorio.'),
//   body('startOfWeek')
//     .trim()
//     .notEmpty()
//     .withMessage('El inicio de la semana es obligatorio.'),
//   body('flags.svg')
//     .trim()
//     .notEmpty()
//     .withMessage('La bandera (SVG) es obligatoria.'),
//   body('flags.png')
//     .trim()
//     .notEmpty()
//     .withMessage('La bandera (PNG) es obligatoria.'),
//   body('maps.openStreetMaps')
//     .trim()
//     .notEmpty()
//     .withMessage('El enlace de OpenStreetMaps es obligatorio.'),
//   body('maps.googleMaps')
//     .trim()
//     .notEmpty()
//     .withMessage('El enlace de Google Maps es obligatorio.'),
//   body('flag')
//     .trim()
//     .notEmpty()
//     .withMessage('La bandera es obligatoria.'),
//   body('landlocked')
//     .isBoolean()
//     .withMessage('El campo sin litoral debe ser un valor booleano.'),
//   body('unMember')
//     .isBoolean()
//     .withMessage('El campo miembro de la ONU debe ser un valor booleano.'),
//   body('status')
//     .trim()
//     .notEmpty()
//     .withMessage('El estado es obligatorio.'),
//   body('independent')
//     .isBoolean()
//     .withMessage('El campo independiente debe ser un valor booleano.'),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     next();
//   }
// ];