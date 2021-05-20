const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: "fail",
        message: "You dont have permission to do this action!",
      });
      return;
    }
    next();
  };
};

exports.protect = async (req, res, next) => {
  try {
    // 1) check if the token is there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(403).json({
        status: "fail",
        message: "Please login !",
      });
      return;
    }

    // 2) Verify token
    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = decode.user;

    next();
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Ivalid token !",
    });
    return;
  }
};
