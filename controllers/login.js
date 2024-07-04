const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { generateJWT } = require("../helpers/generateJWT");
const bcrypt = require('bcrypt');
const { catchedAsync, response } = require("../helpers");
const { LoginError } = require("../helpers/errors");
const resError = require("../helpers/resError");

const signIn = async (req, res) => {
  let {email, password} = req.body;

  let user = await User.findOne({ where: { email }});

  if(!user) throw new LoginError("El email no pertenece a un usuario registrado."); 
  if(!user.state) throw new LoginError( "El acceso fue bloqueado por el administrador.");
  if(!bcrypt.compareSync(password, user.password)) throw new LoginError("La contraseña no es correcta.");

  const token = await generateJWT(user.id);
  response(res, 200, {
    user,
    token
  }); 
};

const registerUser = async(req, res) => {
  let {email, password} = req.body;
  let user = await User.findOne({ where: { email }});

  if (user) throw new LoginError("Ya existe un usuario registrado con el email proporcionado.");
  
  const salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  user = await User.create({ email, password });
  await user.save();
  response(res, 201, user);
}


const validateToken = async(req, res) =>{
  const {token} = req.body;
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  if(id){
    response(res, 200, {token: token});
    return;
  }
  resError(res, 400, "El token no es valido.");
}

module.exports = {
  signIn: catchedAsync(signIn),
  registerUser: catchedAsync(registerUser),
  validateToken: catchedAsync(validateToken)
};
