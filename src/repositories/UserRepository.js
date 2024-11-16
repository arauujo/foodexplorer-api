const db = require("../database/knex");

class UserRepository {
  async findByEmail(email) {
    const user = await db("users").where({ email }).first();
    return user;
  }

  async create({ name, email, password }) {
    await db("users").insert({ name, email, password });
  }
}

module.exports = UserRepository;
