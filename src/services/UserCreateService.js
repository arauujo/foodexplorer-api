const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    if (!name || !email || !password) {
      throw new AppError("É necessário preencher todos os campos.");
    }
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError("Este e-mail já está em uso.");
    }
    const hashedPassword = await hash(password, 8);
    await this.userRepository.create({ name, email, password: hashedPassword });
  }
}

module.exports = UserCreateService;
