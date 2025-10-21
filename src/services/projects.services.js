import { db } from "../config/firebase";

const col = () => db.collection('projects')

export async function listProjects(uid) {
  const list = await col().where('ownerUid', '==', uid).orderBy('createdAt', 'desc').get()
  return list.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()

  }))
}

export async function createProject(uid, data) {
  const now = new Date()
  const doc = await col().add({
    ownerUid: uid,
    name:data.name,
    description:data.description || '',
    plan: data.plan || 'FREE',
    createdAt: now,
    updatedAt: now
  })
  const project = await doc.get()
  return {
    id: doc.id,
    ...project.data()
  }
}

export async function updateProject(uid, id, data) {
  const project = col().doc(id)
  const projectData = await project.get()
  if(!projectData.exists){
    throw new Error('Not Found')
  }
  if(projectData.data().ownerUid !== uid){
    throw new Error('Forbidden')
  }
  await project.update({...data, updatedAt: new Data()})
  const updated = await project.get()
  return {
    id,
    ...updated.data()
  }
}