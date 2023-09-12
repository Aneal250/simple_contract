export function sessionMiddleware(req, res, next) {
  const sessionToken = req.headers.authorization;

  if (!sessionToken) {
    return res
      .status(401)
      .json({ status: "error", message: "Session token is missing" });
  }
  next();
}
