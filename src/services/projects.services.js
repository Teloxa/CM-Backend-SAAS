import { db } from "../config/firebase.js";

const projects = () => db.collection('projects')

export async function listProjects(uid) {
  const list = await projects().where('ownerUid', '==', ui).orderBy('createdAt', 'desc').get()
  return list.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))
  
}

export async function createProject(uid, data) {
  const now = new Date()
  const doc = await col().add({
    ownerUid: uid,
    name: data.name,
    description: data.description || '',
    plan:data.plan || 'FREE',
    createdAt:now,
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
  if(!projectData().ownerUid !== data){
    throw new Error('Not found')
  }

  await project.update({ ...data, updateAt: new Date()})
  const updated = await project.get()
  return{
    id,
    ...updated.data()
  }

  
}




