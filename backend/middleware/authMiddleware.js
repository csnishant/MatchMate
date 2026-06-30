import jwt from "jsonwebtoken";
//correct
const isAuthenticated = (req, res, next) => {
  try {
    //     What?
    // Starts error handling.
    // Why?

    // JWT verification may fail if:

    // token is invalid
    // token is expired
    // secret key is incorrect

    // Without try-catch, the server could crash.
    const token = req.cookies.token;

    // JWT middleware protects private routes by checking if the user has a valid token. It verifies that the token was created by our server, has not been changed, and has not expired. If the token is valid, the user can access the protected route. However, if someone steals a valid token before it expires, JWT alone cannot detect that because the token is still valid. That's why big companies use multiple security layers like HTTPS, HttpOnly cookies, short-lived access tokens, refresh tokens, token revocation on logout, and 2FA for sensitive actions. Security is built using multiple layers, not just JWT alone.

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    //     This is the most important line.
    // What?
    // Verifies the JWT.
    // Why?
    // A JWT can be edited by anyone, so we must check:
    // Was it created by our server?
    // Has it been modified?
    // Has it expired?

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
