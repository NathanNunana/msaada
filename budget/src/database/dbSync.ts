import sequelize from "./dbConfig";

export default (async () => {
  await sequelize.sync({force: false});
  console.log("Database synced successfully");
})()  