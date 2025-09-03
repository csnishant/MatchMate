import jwt from "jsonwebtoken";
//correct
const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    // decode में userId होना चाहिए जो आपने login के time डाला था
    req.userId = decode.userId;

    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;
