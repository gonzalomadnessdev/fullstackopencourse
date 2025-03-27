let userId
describe('Blog app', async function () {

  beforeEach(async function () {
    await cy.task('connectMongo')
    await cy.task('clearCollection', 'users')
    await cy.task('clearCollection', 'blogs')

    userId = await cy.task('createDocument', {
      collectionName: 'users',
      data: {
        "username": "e2etest",
        "password": "$2b$10$GU3wutuHQajmu8C2nwmC/ebAG9s/llsiUbw9Ja7HRa7kL3QgqYXE2",
        "name": "John Doe",
        "blogs": []
      }
    })

    cy.visit('http://localhost:5173')
  })

  afterEach(async function () {
    await cy.task('disconnectMongo')
  })

  it('Login form is shown', function () {
    cy.contains('login')
  })

  it('succeeds with correct credentials', function () {
    cy.get('#username').type('e2etest'); // Fill email input
    cy.get('#password').type('123456*'); // Fill password input
    cy.get('button[type="submit"]').click(); // Click submit button

    // Assert successful login (modify based on your app's behavior)
    cy.contains('welcome').should('be.visible');
    cy.contains('logged in').should('be.visible');
  })

  it('fails with wrong credentials', function () {
    cy.get('#username').type('anotherguy'); // Fill email input
    cy.get('#password').type('asdasd*'); // Fill password input
    cy.get('button[type="submit"]').click(); // Click submit button

    // Assert successful login (modify based on your app's behavior)
    cy.contains('welcome').should('not.exist');
    cy.contains('logged in').should('not.exist')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('e2etest'); // Fill email input
      cy.get('#password').type('123456*'); // Fill password input
      cy.get('button[type="submit"]').click(); // Click submit button
    })

    it('A blog can be created', function () {
      cy.get('button#show').click()

      cy.get('#title').type('Hangar 18')
      cy.get('#author').type('Megadeth')
      cy.get('#url').type('https://www.youtube.com/watch?v=rUGIocJK9Tc')

      cy.get('button#create').click()

      cy.contains('Hangar 18, Megadeth').should('be.visible');
    })
  })

  describe('When blog created', function () {
    beforeEach(function () {
      cy.get('#username').type('e2etest'); // Fill email input
      cy.get('#password').type('123456*'); // Fill password input
      cy.get('button[type="submit"]').click(); // Click submit button
      
      cy.get('button#show').click()

      cy.get('#title').type('Hangar 18')
      cy.get('#author').type('Megadeth')
      cy.get('#url').type('https://www.youtube.com/watch?v=rUGIocJK9Tc')

      cy.get('button#create').click()
      
    })

    it('the user can like a blog', function () {
      cy.get('button#toggle').click()
      cy.get('button#likes').click()
      cy.contains('likes: 1').should('be.visible');
    })

    it('the user can delete it\s own blogs', function () {
      cy.get('button#toggle').click()
      cy.get('button#remove').click()
      cy.contains('Hangar 18, Megadeth').should('not.exist');
    })

    it('cannot see delete button in another user\'s blogs', async function () {
      await cy.task('createDocument', {
        collectionName: 'users',
        data: {
          "username": "e2etest_2",
          "password": "$2b$10$GU3wutuHQajmu8C2nwmC/ebAG9s/llsiUbw9Ja7HRa7kL3QgqYXE2",
          "name": "John Doe",
          "blogs": []
        }
      }).then(()=>{
        cy.get('button#logout').click()
  
        cy.get('#username').type('e2etest_2'); // Fill email input
        cy.get('#password').type('123456*'); // Fill password input
        cy.get('button[type="submit"]').click(); // Click submit button
        cy.get('button#toggle').click()
        cy.contains('button#remove').should('not.exist');
      })
    })
  })

  it('blogs must be ordered by likes', function () {
    cy.task('createMany', {
      collectionName: 'blogs',
      list: [
        {
          "title": "Must be third",
          "author": "Megadeth",
          "url": "https://www.youtube.com/watch?v=rUGIocJK9Tc",
          "likes": 0,
          "user": userId
        },
        {
          "title": "Must be first",
          "author": "Megadeth",
          "url": "https://www.youtube.com/watch?v=rUGIocJK9Tc",
          "likes": 10,
          "user": userId
        },
        {
          "title": "Must be second",
          "author": "Megadeth",
          "url": "https://www.youtube.com/watch?v=rUGIocJK9Tc",
          "likes": 4,
          "user": userId
        },
      ]
    }).then(()=>{
      cy.get('#username').type('e2etest'); // Fill email input
      cy.get('#password').type('123456*'); // Fill password input
      cy.get('button[type="submit"]').click(); // Click submit button

      cy.get('.blog').eq(0).should('contain', 'Must be first')
      cy.get('.blog').eq(1).should('contain', 'Must be second')
      cy.get('.blog').eq(2).should('contain', 'Must be third')
    })
  })
})