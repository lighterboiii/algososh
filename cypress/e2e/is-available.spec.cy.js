describe('Тест работоспособности приложения:', function() {
  it('Приложение запускается', function() {
    cy.visit('http://localhost:3000');
    cy.contains('МБОУ АЛГОСОШ');
  });
});