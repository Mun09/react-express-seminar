const authMiddleware = (req, res, next) => {
  const { api_key, input_password } = req.body;
    if (process.env.API_KEY === api_key && process.env.PASSWORD === input_password) {
        console.log("[AUTH-MIDDLEWARE] Authorized User");
        next();
    }
    else {
        console.log("[AUTH-MIDDLEWARE] Not Authorized User");
        res.status(401).json({ error: "Not Authorized" });
    }
}

module.exports = authMiddleware;