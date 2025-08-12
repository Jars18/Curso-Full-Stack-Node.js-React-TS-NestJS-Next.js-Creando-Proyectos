import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleInputErrors = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Manejo de errores de validacion
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // Esta funcion nos dice que si no hay errores vamos a la siguiente funcion
};
