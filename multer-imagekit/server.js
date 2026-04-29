import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";

let port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
