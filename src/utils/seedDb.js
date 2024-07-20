const { UserRepository } = require("../repositories");

module.exports = async () => {
  try {
    const adminExist = await UserRepository.findAdmin();

    if (!adminExist) {
      await userRepository.create({
        firstname: "admin",
        lastname: "admin",
        password: "superadminpassword99",
        email: "admin@example.com",
        role: "admin",
      });
      console.log("Admin created");
    } else {
      console.log("Admin already exists");
    }
  } catch (error) {
    console.error(error);
  }
};
