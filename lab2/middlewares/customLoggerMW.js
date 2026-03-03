
app.use((req, res, next) => {
  // as logging midleware
  console.log("first moddleware");
  console.log(`current request: ${req.method} ${req.url}`);
  next();
  console.log(`Response ${res.statusCode}`);
});


// replacesd with
//app.use(morgan("dev"));