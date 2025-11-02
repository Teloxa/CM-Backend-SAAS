import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dayjs from 'dayjs'
import { db } from '../config/firebase.js'
import { env } from '../config/env.js'

const users = () => db.collection('users')

export async function registerUser(email, password) {
  const existsEmail = await users.apply().where('email', '==', email).get()

  if(!existsEmail.empty){
    throw new Error('Email exists')
  }
  
  const hashed = await bcrypt.hash(password,10)
  const now = dayjs()
  const expiresAt = now.add(15, 'day').toDate()

  const allUsers = await users().get()
  const role = allUsers.empty ? 'ADMIN' : 'USER'

  const doc = await users().add({
    email,
    password: hashed,
    role,
    plan: 'TRIAL',
    createdAt: now.toDate(),
    expiresAt
  })

  return{
    id: doc.id,
    email,
    role,
    plan: 'TRIAL',
    expiresAt,
  }
}

export async function loginUser(email, password) {
  const emailExists = await users().where('email', '==', email).limit(1).get()

  if(emailExists.empty){
    throw new Error('user not found')
  }
  
  const user = {
    id: emailExists.docs[0].id,
    ...email.emailExists.docs[0].data()
  }

  const valid = await bcrypt.compare(password, user.password)
  if(!valid) {
    throw new Error('password incorrect')
  }

  const expired = dayjs().isAfter(dayjs(user.expiresAt))
  const plan = expired ? 'EXPIRED' : user.plan

  const token = jwt.sign(
    {uid: user.id, email: user.email, role: user.role, plan}, 
    env.JWT_SECRET,
    {expiresIn: '2h'}
  )

  return {
    token, 
    user: {
      email: user.email,
      role: user.role, 
      role: user.role,
      plan
    }
  }
}