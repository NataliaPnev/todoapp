import {expect, test} from "@playwright/test";
import {ToDoPage} from "./pages/todo-page";

test.beforeEach(async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
});

test('create a task', async ({ page }) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.addTask('Test task');
    await expect.soft(toDoPage.toDoText).toHaveText('Test task');
});

test('delete a task', async ({ page }) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.createSeveralTasks(3);
    expect(await toDoPage.countToDoItems()).toBe(3);
    await toDoPage.deleteTaskByName('Task 1');
    expect(await toDoPage.countToDoItems()).toBe(2);
    });

test('Complete 1 task by name', async ({ page }) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.createSeveralTasks(3);
    await toDoPage.completeTaskByName('Task 2');
    await toDoPage.checkCompleteTaskByName('Task 2')
});

test('All buttons are visible after create task', async ({page}) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.addTask('Test 1');
    await expect.soft(toDoPage.buttonAll).toBeVisible();
    await expect.soft(toDoPage.buttonActive).toBeVisible();
    await expect.soft(toDoPage.buttonCompleted).toBeVisible();
    await expect.soft(toDoPage.buttonClearCompleted).toBeVisible();
    });

test('Complete all task by toggle-all', async ({ page }) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.createSeveralTasks(3);
    await toDoPage.buttonToggleAll.click();
    await toDoPage.checkCompleteTaskByName('Task 1');
    await toDoPage.checkCompleteTaskByName('Task 2');
    await toDoPage.checkCompleteTaskByName('Task 3');
});

test('Check completed filter and active filter', async ({ page }) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.createSeveralTasks(5);
    await toDoPage.completeTaskByName('Task 1');
    await toDoPage.completeTaskByName('Task 2');
    await toDoPage.buttonCompleted.click();
    expect(await toDoPage.countToDoItems()).toBe(2);
    await toDoPage.buttonActive.click();
    expect(await toDoPage.countToDoItems()).toBe(3);
});

test('Check clear completed filter', async ({ page }) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.createSeveralTasks(5);
    await toDoPage.completeTaskByName('Task 1');
    await toDoPage.completeTaskByName('Task 2');
    await toDoPage.completeTaskByName('Task 3');
    await toDoPage.buttonCompleted.click();
    expect(await toDoPage.countToDoItems()).toBe(3);
    await toDoPage.buttonClearCompleted.click();
    expect(await toDoPage.countToDoItems()).toBe(0);
});