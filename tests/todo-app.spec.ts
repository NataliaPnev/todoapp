import {expect, test} from "@playwright/test";
import {ToDoPage} from "./pages/todo-page";

test.beforeEach(async ({ page }) => {
    await page.goto('https://todo-app.tallinn-learning.ee/');
});

test('create a task', async ({ page }) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.input.fill('Test task');
    await toDoPage.input.press('Enter');
    await expect.soft(toDoPage.toDoText).toHaveText('Test task');
});

test('delete a task', async ({ page }) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.input.fill('Test task');
    await toDoPage.input.press('Enter');
    await toDoPage.input.fill('Milk');
    await toDoPage.input.press('Enter');
    expect(await toDoPage.countToDoItems()).toBe(2);
    await toDoPage.deleteTaskByName('Test task');
    expect(await toDoPage.countToDoItems()).toBe(1);
    });