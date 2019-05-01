import { Mongoose } from "mongoose";
import { User } from "./models/users";

const database = Mongoose.connect(uri, { useNewUrlParser: true });
