module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "test2@gmail",
        password: "$2b$10$6sqEYYmD7EBOsIfdDyI8U.zDtT4QA2vW9otCwJkTYfgbFsQDMPKk2",
        firstName: "Nguyen",
        lastName: "Henry",
        address: "Thái Nguyên",
        phoneNumber: "0997999989",
        gender: 0,
        role: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
