import { authAdmin } from "firebase-admin";

export async function  verifyAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const [, token] = header.split(' ')
    if(!token) {
      return res.status(401).json({
        ok: false,
        message: 'No token provided'
      })
    }
    const decoded = await authAdmin.verifyIdToken(token)
    req.user = {
      uid: decoded.uid,
      email: decoded.email
    }
    next()
  } catch (error) {
    console.log('@@@ Error =>', error)
    res.status(401).json({
      ok: false,
      message: 'Invalid token'
    })
  }
}