import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import router from './routes/index.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req,res) => res.json({
  ok: true,
  message: 'SaaS working'
}))
app.use('/api', router)

app.listen(env.PORT, () =>{
  console.log(`API on http://localhost:${env.PORT}`)
})
