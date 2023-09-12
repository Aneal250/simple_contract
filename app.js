import express from "express";
import mongoose from "mongoose";
import Application from "./models/application.js";
import cors from "cors";
import { sectors } from "./data/data.js";

import * as dotenv from "dotenv";
import { sessionMiddleware } from "./middleware/session.js";
dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());

// Post an Application
app.post("/application", sessionMiddleware, async (req, res) => {
  const { name, sector, agreeTerms } = req.body;
  try {
    if ((!name || !sector, !agreeTerms)) {
      return res
        .status(400)
        .json({ status: "error", message: "Request body is required" });
    }

    const newApplication = new Application({ name, sector, agreeTerms });
    await newApplication.save();
    return res
      .status(200)
      .json({ status: "success", response: newApplication });
  } catch (error) {
    res.status(500).json({ status: "error", response: error });
  }
});

// Get all application
app.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json({
      message: "success",
      response: applications,
    });
  } catch (error) {
    res.status(404).json({ status: "error", response: error });
  }
});

//  get application by Id
app.get("/application/:id", sessionMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const application = await Application.findById(id);
    res.status(200).json({
      message: "success",
      response: application,
    });
  } catch (error) {
    res.status(404).json({ status: "error", response: error });
  }
});

//  update Application
app.patch("/application/:id", sessionMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, sector, agreeTerms } = req.body;
  try {
    const updatedApplication = {
      name,
      sector,
      agreeTerms,
    };

    await Application.findByIdAndUpdate(id, updatedApplication, { new: true });

    res.status(200).json({
      message: "success",
      response: updatedApplication,
    });
  } catch (error) {
    res.status(404).json({ status: "error", response: error });
  }
});

// Get all sectors
app.get("/sectors", async (req, res) => {
  try {
    res.status(200).json({
      message: "success",
      response: sectors,
    });
  } catch (error) {
    res.status(404).json({ status: "error", response: error });
  }
});

const start = async () => {
  try {
    await mongoose.connect(`${process.env.MONGOD_URL}`);
    app.listen(`${port}`, () => console.log("Server started on port 5000"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
