import express from "express";
const app = express();
const PORT = 3000;
app.use(express.json());
app.listen(PORT, () => {
  console.log(`Express server is running at http://localhost:${PORT}`);
});
