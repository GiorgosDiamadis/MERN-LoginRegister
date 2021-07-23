const express = require("express");

const cors = require("cors");
const userRoutes = require("./Routes/user");
const app = express();
const PORT = process.env.PORT || 8080;
const isAuthenticated = require("./Middleware/isAuthenticated");

app.use(express.urlencoded());
app.use(express.json({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "authorization");
  next();
});

app.use("/user", userRoutes);
app.use(isAuthenticated);
app.post("/pipes", (req, res, next) => {
  res.send("pipes");
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
