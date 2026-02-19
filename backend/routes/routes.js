import express from "express";
import UserData from "../models/UserData.js";

const router = express.Router();

// Get All Users
router.get("/", async (req, res) => {
  try {
    const user = await UserData.find();
    console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
