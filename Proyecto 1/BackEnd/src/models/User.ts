import mongoose, { Schema } from "mongoose";

//Para usar el mismo nombre de 'interface' que otra constante debemos usar generic
interface IUser {
  // Interface User = IUser
  handle: string;
  name: string;
  email: string;
  password: string;
}

// En mongoose primero se crea el Schema y luego se asocia con el modelo
const userSchema = new Schema({
  handle: {
    type: String,
    required: true, // Dato requerido
    trim: true, // Si se usa espacios al inicio los elimina
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true, // Dato requerido
    trim: true, // Si se usa espacios al inicio los elimina
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Evitara que 2 usuarios tenga el mismo email
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

const User = mongoose.model<IUser>("User", userSchema); // Al modelo se le pasa el nombre de modelo ('User') y Schema que va a tener el modelo de Usuario. Con el generic estoy asociando la interface 'IUser' con el modelo 'UserModel'

export default User;
