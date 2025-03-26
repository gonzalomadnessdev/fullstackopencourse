describe('Blog app', async function() {

  beforeEach(async function() {
    await cy.task('connectMongo')
    await cy.task('clearCollection', 'users')
    await cy.task('clearCollection', 'blogs')

    await cy.task('createDocument', {
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

  afterEach(async function() {
    await cy.task('disconnectMongo')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('e2etest'); // Fill email input
    cy.get('#password').type('123456*'); // Fill password input
    cy.get('button[type="submit"]').click(); // Click submit button

    // Assert successful login (modify based on your app's behavior)
    cy.contains('welcome').should('be.visible');
    cy.contains('logged in').should('be.visible');
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('anotherguy'); // Fill email input
    cy.get('#password').type('asdasd*'); // Fill password input
    cy.get('button[type="submit"]').click(); // Click submit button

    // Assert successful login (modify based on your app's behavior)
    cy.contains('welcome').should('not.exist');
    cy.contains('logged in').should('not.exist')
  })
})