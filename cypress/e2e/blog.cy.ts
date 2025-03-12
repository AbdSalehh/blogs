describe("Blog CRUD Operations", () => {
  const TOKEN = Cypress.env("GOREST_TOKEN");

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });

  it("should require token and show welcome dialog", () => {
    cy.get(".ant-modal-content").should("be.visible");
    cy.get(".ant-modal-title").should("contain", "Welcome");

    cy.get('input[placeholder="Your Name"]').first().type("Chris John", { force: true });
    cy.get('input[placeholder="GoRest Token"]').last().type(TOKEN, { force: true });
    
    cy.contains('span', 'Confirm').click({ force: true });

    cy.get(".ant-modal-content").should("not.exist");
    cy.get("a").contains("Create New Post").should("be.visible");
  });

  // it('should create new post', () => {
  //   cy.window().then((win) => {
  //     win.localStorage.setItem('goRestToken', TOKEN);
  //   });
  //   cy.visit('/');

  //   cy.get('a').contains('Create New Post').click();

  //   cy.get('select').select('1');
  //   cy.get('input[placeholder*="title"]').type('Test Post Title');
  //   cy.get('textarea').type('Test Post Content');

  //   cy.get('button').contains('Submit').click();

  //   cy.get('.ant-message').should('contain', 'Post successfully created');
  //   cy.url().should('eq', Cypress.config().baseUrl + '/');
  // });

  // it('should read post details', () => {
  //   cy.window().then((win) => {
  //     win.localStorage.setItem('goRestToken', TOKEN);
  //   });
  //   cy.visit('/');

  //   cy.get('.ant-card-head-title').first().click();

  //   cy.get('.ant-card-head-title').should('exist');
  //   cy.get('.ant-card').should('contain', 'Author ID');
  // });

  // it('should update post', () => {
  //   cy.window().then((win) => {
  //     win.localStorage.setItem('goRestToken', TOKEN);
  //   });
  //   cy.visit('/');

  //   cy.get('button').contains('Edit').first().click();

  //   cy.get('input[placeholder*="title"]').clear().type('Updated Title');
  //   cy.get('textarea').clear().type('Updated Content');

  //   cy.get('button').contains('Update').click();

  //   cy.get('.ant-message').should('contain', 'Post updated successfully');
  // });

  // it('should delete post', () => {
  //   // Setup token
  //   cy.window().then((win) => {
  //     win.localStorage.setItem('goRestToken', TOKEN);
  //   });
  //   cy.visit('/');

  //   cy.get('.ant-card').its('length').then((initialCount) => {
  //     cy.get('button').contains('Delete').first().click();

  //     cy.get('.ant-popconfirm-buttons button').contains('Yes').click();

  //     cy.get('.ant-message').should('contain', 'Post deleted successfully');

  //     cy.get('.ant-card').should('have.length', initialCount - 1);
  //   });
  // });

  // it('should handle invalid token', () => {
  //   cy.window().then((win) => {
  //     win.localStorage.setItem('goRestToken', 'invalid_token');
  //   });
  //   cy.visit('/');

  //   cy.get('.ant-modal-content').should('be.visible');

  //   cy.get('input[placeholder*="GoRest Token"]').type(TOKEN);
  //   cy.get('button').contains('Masuk').click();

  //   cy.get('.ant-modal-content').should('not.exist');
  //   cy.get('a').contains('Create New Post').should('be.visible');
  // });

  // it('should handle pagination', () => {
  //   cy.window().then((win) => {
  //     win.localStorage.setItem('goRestToken', TOKEN);
  //   });
  //   cy.visit('/');

  //   cy.get('.ant-pagination-item-1').should('have.class', 'ant-pagination-item-active');

  //   cy.get('.ant-pagination-next').click();

  //   cy.get('.ant-pagination-item-2').should('have.class', 'ant-pagination-item-active');
  // });
});
