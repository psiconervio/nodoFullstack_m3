// Middleware para validar nombreSuperHeroe
export const validarNombreSuperHeroe = (req, res, next) => {
    const { nombreSuperHeroe } = req.body;
  
    // Validar que el campo esté presente
    if (!nombreSuperHeroe) {
      return res.status(400).json({ error: 'El campo "nombreSuperHeroe" es requerido.' });
    }
  
    // Validar que no contenga solo espacios en blanco
    if (nombreSuperHeroe.trim() === '') {
      return res.status(400).json({ error: 'El campo "nombreSuperHeroe" no puede estar vacío o contener solo espacios.' });
    }
  
    // Validar longitud mínima
    if (nombreSuperHeroe.trim().length < 3) {
      return res.status(400).json({ error: 'El campo "nombreSuperHeroe" debe tener al menos 3 caracteres.' });
    }
  
    // Validar longitud máxima
    if (nombreSuperHeroe.trim().length > 60) {
      return res.status(400).json({ error: 'El campo "nombreSuperHeroe" no puede exceder los 60 caracteres.' });
    }
  
    // Si pasa todas las validaciones, continuar con el siguiente middleware o controlador
    next();
  };
