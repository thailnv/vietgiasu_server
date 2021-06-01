module.exports = (validator) => {
  return (req, res, next) => {
    const { error } = validator(req.body);
    if (error) {
      console.log(error.details[0].message);
      res.status(400).json({
        status: "fail",
        message: error.details[0].message.replace(/"/g, ""),
      });
      return;
    }
    next();
  };
};
