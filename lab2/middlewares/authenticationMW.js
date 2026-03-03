export default (req, res, next) => {
  // as auth middleware
  console.log("second middleware");
  let isAuth = true;
  if (isAuth) {
    next();
  } else {
    // terminate request
    // return response
    return res.status(401).send("unauthenticated user");
  }
};