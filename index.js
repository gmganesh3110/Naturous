const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const AppError = require("./utils/appError.js");
const globalErrorHanlder = require("./controllers/errorController.js");
const tourRoutes = require("./routes/tourRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const app = express();
dotenv.config({ path: "./config.env" });

app.use(helmet());
const limiter = rateLimit({
  max: 0,
  windowMs: 60 * 60 ** 1000,
  message: "Too many requests send",
});
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api", limiter);
app.use(
  express({
    limit: "10kb",
  })
);
app.use(mongoSanitize());
// app.use(xss());
app.use(
  hpp({
    whitelist: ["sort"],
  })
);
app.use(express.static(`${__dirname}/public`));
app.use("/api/tour", tourRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/review", reviewRoutes);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHanlder);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then((con) => console.log("DB connected"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
