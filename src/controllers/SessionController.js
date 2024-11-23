const UserRepository = require("../repositories/UserRepository");
const AuthService = require("../services/AuthService");

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;
    const userRepository = new UserRepository();
    const authService = new AuthService(userRepository);

    try {
      const { token, user } = await authService.authenticate({
        email,
        password,
      });
      return res
        .status(200)
        .json({ token, user, message: "Usuário autenticado com sucesso!" });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}

module.exports = SessionController;
