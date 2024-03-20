import express from "express";
import initializeApp from "./app";
import sequelize from "./database/dbConfig";
import dbSync from "./database/dbSync";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
initializeApp(app);

if(process.env.NODE_ENV !== "production"){

}

(async () => {
  try {
    await sequelize.authenticate();
    // dbSync;
    console.log("Connection has been established and synced successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.listen(port, () => {
  console.log(
    "Server running on http://127.0.0.1:%d in %s mode",
    port,
    process.env.NODE_ENV
  );
});

