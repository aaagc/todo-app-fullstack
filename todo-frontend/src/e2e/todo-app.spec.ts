import { test, expect } from '@playwright/test';

test.describe('Todo App E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the todo list page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Todo List');
    await expect(page.getByRole('button', { name: /add todo/i })).toBeVisible();
  });

  test('should create a new todo', async ({ page }) => {
    // Click add todo button
    await page.getByRole('button', { name: /add todo/i }).click();

    // Fill in the form
    await page.getByLabel(/title/i).fill('E2E Test Todo');
    await page.getByLabel(/description/i).fill('This is an E2E test todo');

    // Submit the form
    await page.getByRole('button', { name: /save/i }).click();

    // Verify the todo appears in the list
    await expect(page.getByText('E2E Test Todo')).toBeVisible();
    await expect(page.getByText('This is an E2E test todo')).toBeVisible();
  });

  test('should toggle todo completion', async ({ page }) => {
    // First create a todo
    await page.getByRole('button', { name: /add todo/i }).click();
    await page.getByLabel(/title/i).fill('Toggle Test Todo');
    await page.getByRole('button', { name: /save/i }).click();

    // Find the checkbox and click it
    const todoItem = page.locator('[data-testid="todo-item"]').filter({ hasText: 'Toggle Test Todo' });
    const checkbox = todoItem.getByRole('checkbox');
    
    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
  });

  test('should edit a todo', async ({ page }) => {
    // Create a todo first
    await page.getByRole('button', { name: /add todo/i }).click();
    await page.getByLabel(/title/i).fill('Edit Test Todo');
    await page.getByRole('button', { name: /save/i }).click();

    // Click edit button
    const todoItem = page.locator('[data-testid="todo-item"]').filter({ hasText: 'Edit Test Todo' });
    await todoItem.getByRole('button', { name: /edit/i }).click();

    // Edit the title
    await todoItem.getByRole('textbox').first().fill('Edited Todo Title');
    await todoItem.getByRole('button', { name: /save/i }).click();

    // Verify the change
    await expect(page.getByText('Edited Todo Title')).toBeVisible();
  });

  test('should delete a todo', async ({ page }) => {
    // Create a todo first
    await page.getByRole('button', { name: /add todo/i }).click();
    await page.getByLabel(/title/i).fill('Delete Test Todo');
    await page.getByRole('button', { name: /save/i }).click();

    // Delete the todo
    const todoItem = page.locator('[data-testid="todo-item"]').filter({ hasText: 'Delete Test Todo' });
    await todoItem.getByRole('button', { name: /delete/i }).click();

    // Verify it's gone
    await expect(page.getByText('Delete Test Todo')).not.toBeVisible();
  });

  test('should filter todos by status', async ({ page }) => {
    // Create completed and incomplete todos
    await page.getByRole('button', { name: /add todo/i }).click();
    await page.getByLabel(/title/i).fill('Completed Todo');
    await page.getByRole('button', { name: /save/i }).click();

    await page.getByRole('button', { name: /add todo/i }).click();
    await page.getByLabel(/title/i).fill('Incomplete Todo');
    await page.getByRole('button', { name: /save/i }).click();

    // Mark first todo as completed
    const completedTodo = page.locator('[data-testid="todo-item"]').filter({ hasText: 'Completed Todo' });
    await completedTodo.getByRole('checkbox').click();

    // Filter by completed
    await page.getByRole('combobox', { name: /filter/i }).selectOption('completed');
    await expect(page.getByText('Completed Todo')).toBeVisible();
    await expect(page.getByText('Incomplete Todo')).not.toBeVisible();

    // Filter by active
    await page.getByRole('combobox', { name: /filter/i }).selectOption('active');
    await expect(page.getByText('Completed Todo')).not.toBeVisible();
    await expect(page.getByText('Incomplete Todo')).toBeVisible();
  });

  test('should search todos', async ({ page }) => {
    // Create multiple todos
    await page.getByRole('button', { name: /add todo/i }).click();
    await page.getByLabel(/title/i).fill('Search Test Todo 1');
    await page.getByRole('button', { name: /save/i }).click();

    await page.getByRole('button', { name: /add todo/i }).click();
    await page.getByLabel(/title/i).fill('Different Todo');
    await page.getByRole('button', { name: /save/i }).click();

    // Search for specific todo
    await page.getByPlaceholder(/search/i).fill('Search Test');
    
    await expect(page.getByText('Search Test Todo 1')).toBeVisible();
    await expect(page.getByText('Different Todo')).not.toBeVisible();
  });

  test('should display todo statistics', async ({ page }) => {
    // Create todos with different states
    await page.getByRole('button', { name: /add todo/i }).click();
    await page.getByLabel(/title/i).fill('Stats Todo 1');
    await page.getByRole('button', { name: /save/i }).click();

    await page.getByRole('button', { name: /add todo/i }).click();
    await page.getByLabel(/title/i).fill('Stats Todo 2');
    await page.getByRole('button', { name: /save/i }).click();

    // Mark one as completed
    const firstTodo = page.locator('[data-testid="todo-item"]').first();
    await firstTodo.getByRole('checkbox').click();

    // Check statistics
    await expect(page.getByText(/total.*2/i)).toBeVisible();
    await expect(page.getByText(/completed.*1/i)).toBeVisible();
    await expect(page.getByText(/active.*1/i)).toBeVisible();
  });
});