import mongoose from "mongoose";
import { DB_URL } from "../config";
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`Mongo DB Connected ${data.connection.host}`);
  });
