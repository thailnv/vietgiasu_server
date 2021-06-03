const courseRouter = require("./course");
const siteRouter = require("./site");
const orderRouter = require("./order");
const tutorRouter = require("./tutor");

function route(app) {
  //The productRouter is executed for any type of HTTP request on the /products
  app.use("/khoa-hoc", courseRouter);

  app.use("/don-hang", orderRouter);

  app.use("/giang-vien", tutorRouter);

  app.use("/", siteRouter);
}

module.exports = route;
