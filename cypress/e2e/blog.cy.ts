describe("Blog CRUD Operations", () => {
  const TOKEN = Cypress.env("GOREST_TOKEN");
  const TEST_TITLE = 'Test Post Title ' + Date.now();
  const UPDATED_TITLE = 'Updated Title ' + Date.now();

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

    cy.get("a").contains("Create New Post").should("be.visible");
    cy.wait(3000);
    cy.get('.ant-card').should('exist');
    cy.get('.ant-pagination').should('exist');
  });

  it('should create new post', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('goRestToken', TOKEN);
    });
    cy.visit('/');

    cy.get('a').contains('Create New Post').click();
    cy.wait(2000);

    cy.get('.ant-select').click();
    cy.wait(2000);
    cy.get('.ant-select-item-option').first().click();
    
    cy.get('input[placeholder*="Title"]').type(TEST_TITLE);
    cy.get('textarea').type('Test Post Content');
    
    cy.get('button').contains('Create Post').click();
    cy.get('.ant-message').should('contain', 'Post successfully created');
  });

  it('should read post details', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('goRestToken', TOKEN);
    });
    cy.visit('/');
    cy.wait(2000);

    cy.get('.ant-card-head-title').contains(TEST_TITLE).should('exist');
    cy.get('a').contains('Read More')
      .parents('.ant-card')
      .find('.ant-card-head-title')
      .contains(TEST_TITLE)
      .parents('.ant-card')
      .find('a')
      .contains('Read More')
      .click();

    cy.wait(2000);

    cy.get('.ant-card-head-title').should('contain', TEST_TITLE);
    cy.get('button').contains('Back').should('exist');
    cy.get('strong').contains('Author ID').should('exist');
  });

  it('should update post', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('goRestToken', TOKEN);
    });
    cy.visit('/');
    cy.wait(2000);

    cy.get('.ant-card-head-title')
      .contains(TEST_TITLE)
      .parents('.ant-card')
      .find('a')
      .contains('Edit')
      .click();

    cy.wait(2000);

    cy.get('input[placeholder*="Title"]').clear().type(UPDATED_TITLE);
    cy.get('textarea').clear().type('Updated Content');
    cy.get('button').contains('Update Post').click();

    cy.get('.ant-message').should('contain', 'Post updated successfully');
    cy.get('.ant-card-head-title').contains(UPDATED_TITLE).should('exist');
  });

  it('should delete post', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('goRestToken', TOKEN);
    });
    cy.visit('/');
    cy.wait(2000);

    cy.get('.ant-card').its('length').then((initialCount) => {
      cy.get('.ant-card-head-title')
        .contains(UPDATED_TITLE)
        .parents('.ant-card')
        .find('button')
        .contains('Delete')
        .click();

      cy.get('.ant-btn-primary').contains('OK').click();

      cy.get('.ant-message').should('contain', 'Post deleted successfully');
      cy.get('.ant-card-head-title').contains(UPDATED_TITLE).should('not.exist');
    });
  });

  it('should handle pagination', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('goRestToken', TOKEN);
    });
    cy.visit('/');
    cy.wait(2000);

    cy.get('.ant-pagination-item-1').should('have.class', 'ant-pagination-item-active');

    cy.get('.ant-pagination-next').click();

    cy.get('.ant-pagination-item-2').should('have.class', 'ant-pagination-item-active');
  });
});
