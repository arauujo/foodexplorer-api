const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async authenticate({ email, password }) {
    if (!email || !password) {
      throw new AppError("É necessário preencher todos os campos.");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Usuário não cadastrado.");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Credenciais inválidas.");
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = jwt.sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return {token, user };
  }
}

module.exports = AuthService;
