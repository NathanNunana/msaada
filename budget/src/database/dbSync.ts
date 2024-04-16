import sequelize from "./dbConfig";

export default (async () => {
  await sequelize.sync({force: true});
  console.log("Database synced successfully");
})()  