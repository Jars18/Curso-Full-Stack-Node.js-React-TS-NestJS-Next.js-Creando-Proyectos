// Funciones que manejan el request, el tipo de petición y realizar las acciones que deseamos

import User from "../models/User";
import { Request, Response } from "express"; // Le paso el type a req y res, de esa forma no estan tipados como 'any'
import { validationResult } from "express-validator";
import slug from "slug";
import { checkPassword, hashPassword } from "../utils/auth";

export const createAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email }); // findOne filtra en el DB, si no existe aparece null y si existe trae el objeto
  if (userExists) {
    const error = new Error("El usuario ya esta registrado");
    return res.status(409).json({ error: error.message }); // Retorno para detener la ejecución, envio el status code personalizado y Creo un objeto que tiene el key de error y tambien el valor
  }

  const handle = slug(req.body.handle, "");
  const handleExists = await User.findOne({ handle });
  if (handleExists) {
    const error = new Error("Nombre de usuario no disponible");
    return res.status(409).json({ error: error.message }); // Retorno para detener la ejecución, envio el status code personalizado y Creo un objeto que tiene el key de error y tambien el valor
  }
  // Almacenar datos enviados por el usuario
  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.handle = handle;

  await user.save();
  res.status(201).send("Registro Creado Correctamente");
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Revisar si el usuario esta registrado
  const userExists = await User.findOne({ email });
  if (!userExists) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ error: error.message });
  }

  // Comprobar el password
  // Para comprobar el password ingresado con el hasheado que esta en el DB debemos usar la misma libreria
  const isPasswordCorrect = await checkPassword(password, userExists.password); // password es del DB y userExists.password es lo que llena el usuario. Es necesario el await ya que necesitamos la respuesta!
  if (!isPasswordCorrect) {
    const error = new Error("Password Incorrecto");
    return res.status(401).json({ error: error.message });
  } // Si es incorrecto ahi muere

  res.send("Autenticando..."); // Si es correcto muestra este mensaje
};
