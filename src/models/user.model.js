export default class User {
  constructor({id, email, password, role = 'USER', plan = 'TRIAL', createdAt, expiresAt}) {
    this.id = id
    this.email = email
    this.password = password
    this.role = role
    this.plan = plan
    this.createdAt = createdAt
    this.expiresAt = expiresAt
  }
}