import app from "./app.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // inject in global object process.env

// connect to database
const DB_URI = process.env.MONGO_URI;
mongoose
  .connect(DB_URI)
  .then(() => console.log('Connected to MongoDB Successfully! ✅ '))
  .catch((err) => console.error('Failed to connect to MongoDB ❌', err));
// intiate server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});