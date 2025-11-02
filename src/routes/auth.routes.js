import { Router } from "express";
import { registerUser, loginUser } from "../services/auth.service.js";
// import { messaging } from "firebase-admin";

const router = Router()

router.post('/register', async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await registerUser(email, password)
    res.status(201).json({
      ok:true,
      user
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      message: error.message
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await loginUser(email, password)
    res.status(201).json({
      ok:true,
      user
    })
  } catch (error) {
    res.status(400).json({
      ok:false,
      message: error.message
    })
  }
})

export default router