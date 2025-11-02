import express from 'express'
import cors from 'cors'
import { env } from './config/env'
import router from './routes/auth.routes'
import { verifyToken } from './middleware/auth'
import * as projectService from '.'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => res.json({
  ok: true,
  message: 'SaaS API working'
}))
app.use('api/')
