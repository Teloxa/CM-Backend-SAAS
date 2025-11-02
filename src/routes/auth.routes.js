import { Router } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { messaging } from "firebase-admin";

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
// CODE INCOMPLETE
export default router