import { db } from "../config/firebase.js";

const projects = () => db.collection('projects')

export async function createProject(uid, data, plan) {
if(plan === 'TRIAL'){
    const count = await projects().where('ownerUid', '==', uid).get()
    if(count.size >= 3) {
      throw new Error('Limit reached. Pay for more')
    }
  }  

  const now = new Date()
  const project = await  projects.add({
    ownerUid: uid,
    name: data.name,
    description: data.description || '',
    createdAd: now, 
    updatedAt: now
  })
  const doc = await project.get()
  return{
    id:project.id,
    ...doc.data()
  }
}

export async function getProjects(uid) {
  const count = await projects().where('ownerUid', '==', uid).get()
  return projects.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))    
}




