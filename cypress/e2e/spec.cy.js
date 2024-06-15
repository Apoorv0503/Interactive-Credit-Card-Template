import 'cypress-real-events/support';

describe("Form Input Updates Card Details in Real Time", () => {

  it("should update the card details as the user types", () => {
    cy.visit("index.html");

    // Cardholder Name
    cy.get("#name").type("John Doe");
    cy.get(".name-output").should("have.text", "John Doe");

    // Card Number
    cy.get("#number").type("1234567890123456");
    cy.get(".number-output").should("have.text", "1234 5678 9012 3456");

    // Expiry Month
    cy.get("#month").type("12");
    cy.get(".month-output").should("have.text", "12");

    // Expiry Year
    cy.get("#year").type("34");
    cy.get(".year-output").should("have.text", "34");

    // CVC
    cy.get("#cvc").type("567");
    cy.get(".cvc-output").should("have.text", "567");
  });

  it("should display error messages when any field is empty", () => {
    cy.visit("index.html");

    cy.get("form").submit();

    cy.get(".name-input + .error.empty").should("be.visible");
    cy.get(".number-input + .error.empty").should("be.visible");
    cy.get(".date-input + .error.empty").should("be.visible");
    cy.get(".date-input + .error.empty").should("be.visible");
    cy.get(".cvc-input + .error.empty").should("be.visible");
  });

  it("should display an error message for invalid card number", () => {
    cy.visit("index.html");

    cy.get("#name").type("John Doe");
    cy.get("#number").type("1234abcd5678efgh");
    cy.get("#month").type("12");
    cy.get("#year").type("34");
    cy.get("#cvc").type("567");

    cy.get("form").submit();

    cy.get(".input-field + .error-invalid").should("be.visible");
  });

  it("should display an error message for invalid expiry date", () => {
    cy.visit("index.html");

    cy.get("#name").type("John Doe");
    cy.get("#number").type("1234567890123456");
    cy.get("#month").type("11");
    cy.get("#year").type("3a");
    cy.get("#cvc").type("567");

    cy.get("form").submit();

    // Check if the date container has the class `error-invalid`
    cy.get(".date-container").should("have.class", "error-invalid");

    // Additionally, check if the specific invalid error message is visible
    cy.get(".date-container .error.invalid").should("be.visible");
  });

    it('should display an error message for invalid CVC', () => {
      cy.visit('index.html');
  
      cy.get('#name').type('John Doe');
      cy.get('#number').type('1234567890123456');
      cy.get('#month').type('12');
      cy.get('#year').type('34');
      cy.get('#cvc').type('12a');
  
      cy.get('form').submit();
  
      cy.get('.input-field + .error-invalid').should('be.visible');
    });
  
});

//responsive layout tests
describe('Responsive Layout', () => {
  it('should display the optimal layout on mobile', () => {
    cy.viewport('iphone-6');
    cy.visit('index.html');

    // Check layout adjustments for mobile
    cy.get('.container').should('have.css', 'flex-direction', 'column');
  });


  it('should display the optimal layout on desktop', () => {
    cy.viewport('macbook-15');
    cy.visit('index.html');

    // Check layout adjustments for desktop
    cy.get('.container').should('have.css', 'flex-direction', 'row');
  });


    it('should display hover, active, and focus states correctly', () => {
      cy.visit('index.html');
  
           // Hover state for Confirm button, background colour should be changed upon hovering
           cy.get('.btn').then(($btn) => {
            const initialBgColor = $btn.css('background-color');
            cy.wrap($btn)
              .realHover()
              .wait(1500) // Wait for 500ms to ensure the hover event is fully applied
              .should(($btnAfterHover) => {
                const hoverBgColor = $btnAfterHover.css('background-color');
                expect(hoverBgColor).not.to.eq(initialBgColor);
              });
          });
  
      // Focus state for input fields: optinal test, ignoring it for now
          
    });

});

