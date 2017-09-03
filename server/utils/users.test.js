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
    let removed = users.removeUser('3')
    expect(removed).toEqual([{
      id: '1',
      name: 'Sebas',
      room: 'Noder room'
    }, {
      id: '2',
      name: 'Lil',
      room: 'React room'
    }])
  }) 

  it('Should NOT remove a user', () => {
    let removed = users.removeUser('5')
    expect(removed).toEqual(users.users)
  })  

  it('Should get user', () => {
    let selected = users.getUser('2')
    expect(selected).toEqual([{
      id: '2',
      name: 'Lil',
      room: 'React room'
    }])
  })  

  it('Should NOT get user', () => {
    let selected = users.getUser('4')
    expect(selected).toEqual([])
  })

})