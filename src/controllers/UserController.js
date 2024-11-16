const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");

class UserController {
  async create(req, res) {
    const { name, email, password } = req.body;
    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    try {
      await userCreateService.execute({ name, email, password });
      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao cadastrar o usuário", details: error.message });
    }
  }
}

module.exports = UserController;
