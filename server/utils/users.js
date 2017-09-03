class Users {
  constructor() {
    this.users = []
  }
  addUser(id, name, room) {
    let user = {id, name, room}
    this.users.push(user)
    return user
  }
  removeUser(id) {
    // return user that was removed
    return this.users.filter((u) => u.id !== id )
  }
  getUser(id) {
    return this.users.filter((u) => u.id === id)
  }
  getUserList(room) {
    let users = this.users.filter((user) => user.room === room)
    let namesArray = users.map((user) => user.name)
    return namesArray

  }
} 

module.exports = { Users }
// adduser(id, name, room)
// removeuser(id) socket.id
// gewtUser(id) return users
// getuserlist(room) retun [names]