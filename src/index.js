import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import router from './routes/auth.routes.js'
import { verifyToken } from './middleware/auth.js'
import * as projectService from './services/projects.services.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => res.json({
  ok: true,
  message: 'SaaS working API'
}))
app.use('/api/auth', router)

app.listen(env.PORT, () =>{
  console.log(`API on http://localhost:${env.PORT}`)
})
