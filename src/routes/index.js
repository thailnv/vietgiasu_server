const courseRouter = require("./course");
const siteRouter = require("./site");

function route(app) {
  //The productRouter is executed for any type of HTTP request on the /products
  app.use("/khoa-hoc", courseRouter);

  app.use("/", siteRouter);
}

module.exports = route;
