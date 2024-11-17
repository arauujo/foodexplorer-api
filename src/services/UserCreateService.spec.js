// UserCreateService.test.js
const UserCreateService = require("./UserCreateService");
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");

describe("UserCreateService", () => {
  let userRepositoryInMemory;
  let userCreateService;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userCreateService = new UserCreateService(userRepositoryInMemory);
  });

  it("should create a new user", async () => {
    const userData = {
      name: "John Doe",
      email: "john@email.com",
      password: "1234",
    };

    await userCreateService.execute(userData);

    const createdUser = userRepositoryInMemory.users.find(
      user => user.email === userData.email,
    );

    expect(createdUser).toHaveProperty("id");
  });

  it("should throw an error when the email is already in use", async () => {
    const userData = {
      name: "John Doe",
      email: "john@email.com",
      password: "1234",
    };

    await userCreateService.execute(userData);

    await expect(userCreateService.execute(userData)).rejects.toEqual(
      new AppError("Este e-mail já está em uso."),
    );
  });
});
