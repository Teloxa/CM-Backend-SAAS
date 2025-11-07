import { Router } from "express"; 
import authRoutes from "./auth.routes.js";

const router = Router()

router.use('/auth', authRoutes)

router.get('/', (_req, res) => {
  res.json({ok: true, message: 'WORKING API'})
})
export default router