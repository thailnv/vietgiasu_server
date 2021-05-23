const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Convert = require("../../util/mongoose");

const UserSchema = new Schema(
  {
    name: { type: String },
    phone: { type: String },
    email: String,
    password: String,
    role: { type: String, default: "guess" },
    balance: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

const UserModel = mongoose.model("user", UserSchema);

class User {
  async signup(data, result) {
    let user = {};
    let doc = new UserModel(data);
    await doc
      .save()
      .then((doc) => {
        result.status = "success";
        user.id = doc._id;
        user.name = doc.name;
        user.role = doc.role;
        user.balance = doc.balance;
        user.phone = doc.phone;
        user.email = doc.email;
        result.user = user;
      })
      .catch((err) => {
        console.log(err);
        result.status = "fail";
      });
  }

  async login(data, result) {
    console.log(data);
    let user = {};
    await UserModel.find({ email: data.email, password: data.password })
      .then((doc) => {
        if (doc.length > 0) {
          result.status = "success";
          user.id = doc[0]._id;
          user.name = doc[0].name;
          user.email = doc[0].email;
          user.phone = doc[0].phone;
          user.role = doc[0].role;
          user.balance = doc[0].balance;
          result.user = user;
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
