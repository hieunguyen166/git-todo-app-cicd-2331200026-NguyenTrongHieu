const { TodoService } = require('../../js/model');
const { Controller } = require('../../js/controller');

// Mock the View because we are not testing the UI, only Controller-Model interaction.
const mockView = {
    update: jest.fn(),
    bindAddTodo: jest.fn(),
    bindToggleTodo: jest.fn(),
    bindRemoveTodo: jest.fn(),
};

describe('Controller-Service Integration Tests', () => {
    let service;
    let controller;

    beforeEach(() => {
        service = new TodoService();

        // Reset singleton data for tests
        service.todos = [];
        service.observers = [];

        controller = new Controller(service, mockView);
    });

    test('handleAddTodo should call service.addTodo and update the model', () => {
        controller.handleAddTodo('Learn Testing');

        const todos = service.getTodos();

        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe('Learn Testing');
        expect(todos[0].completed).toBe(false);
    });

    test('handleRemoveTodo should call service.removeTodo and update the model', () => {
        service.addTodo('Delete Me');

        const id = service.getTodos()[0].id;

        controller.handleRemoveTodo(id);

        expect(service.getTodos().length).toBe(0);
    });
});