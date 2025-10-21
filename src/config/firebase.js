import admin from 'firebase-admin'
import {readFileSync} from 'node:fs'
import {resolve} from 'node:path'
import 'dotenv/config' 

const serviceAccountPath = resolve('SA-Teloxa.json')
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))

if(!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL
  })
}

export const db = admin.firestore()
export const authAdmin = admin.auth()
