const mongoose = require("mongoose");

//testing the server
// const userSchema = new mongoose.Schema({
//   name: String
// });
const User = mongoose.model("User", { name: String });

export default User;
