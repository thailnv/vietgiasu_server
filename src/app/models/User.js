const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Convert = require("../../util/mongoose");

const UserSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: String,
    password: String,
    role: String,
    balance: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", UserSchema);

class User {
  async signup(data, result) {
    let user = new UserModel(data);
    await user
      .save()
      .then((user) => {
        result.status = "success";
        result.id = user._id;
        result.name = user.name;
        result.role = user.role;
        result.balance = user.balance;
        result.phone = user.phone;
        result.email = user.email;
      })
      .catch((err) => {
        console.log(err);
        result.status = "fail";
      });
  }

  async login(data, result) {
    console.log(data);
    await UserModel.find({ email: data.email, password: data.password })
      .then((user) => {
        if (user.length > 0) {
          result.status = "success";
          result.id = user[0]._id;
          result.name = user[0].name;
          result.email = user[0].email;
          result.phone = user[0].phone;
          result.role = user[0].role;
          result.balance = user[0].balance;
        } else {
          result.status = "fail";
        }
      })
      .catch(() => {
        result.status = "fail";
      });
  }
}

module.exports = new User();
