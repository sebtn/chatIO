const expect = require('expect')
const {Users} = require('./users')

describe('Users', () => {
  let users

  beforeEach(() => {
    users = new Users
    users.users = [{
      id: '1',
      name: 'Sebas',
      room: 'Noder room'
    }, {
      id: '2',
      name: 'Lil',
      room: 'React room'
    }, {
      id: '3',
      name: 'cat',
      room: 'React room'
    }]
  })

  it('Should add new users', () => {
    let users = new Users()
    let user = {
      id: 123,
      name: 'Seb',
      room: 'Fantastic plastic'
    }
    let resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual( [user] )
  })

  it('Should return all names for a specific room', () => {
    let userList = users.getUserList('React room')
    expect(userList).toEqual(['Lil', 'cat'])
  })  

  it('Should remove a user', () => {
    let userId = '3'
    let user = users.removeUser(userId)
    expect(user.id).toBe(userId)
    expect(users.users.length).toBe(2)
  }) 

  it('Should NOT remove a user', () => {
    let removed = users.removeUser('5')
    expect(removed).toNotExist()
  })  

  it('Should get user', () => {
    var userId = '2'
    let user = users.getUser(userId)
    expect(user.id).toBe(userId)
  })  

  it('Should NOT get user', () => {
    let selected = users.getUser('4')
    expect(selected).toNotExist()
  })  
})