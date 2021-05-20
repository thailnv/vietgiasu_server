const mongoose = require("mongoose");

//await function must in a async
async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://ThaiVinh:kingkuro2140@cluster0.0oaqc.mongodb.net/vlearning?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Connect to v_learning successfully!");
  } catch (error) {
    console.log(error);
    console.log("Fail to connect the database!");
  }
}

module.exports = { connect };
