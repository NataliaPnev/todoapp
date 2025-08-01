import {expect, Locator, Page} from "@playwright/test";

export class ToDoPage {
readonly page: Page;
readonly header: Locator;
readonly input: Locator;
readonly toDoText: Locator;
readonly buttonAll: Locator;
readonly buttonActive: Locator;
readonly buttonCompleted: Locator;
readonly buttonClearCompleted: Locator;
readonly buttonDeleteX: Locator;
readonly buttonToggleAll: Locator;

constructor(page: Page) {
    this.page= page;
    this.header = page.getByTestId('header');
    this.input = page.getByTestId('text-input');
    this.toDoText = page.getByTestId('todo-item-label');
    this.buttonAll = page.getByRole('link', { name: 'All' });
    this.buttonActive = page.getByRole('link', { name: 'Active' });
    this.buttonCompleted = page.getByRole('link', { name: 'Completed' });
    this.buttonClearCompleted = page.getByRole('button', { name: 'Clear completed' });
    this.buttonDeleteX = page.getByRole('button', {name: '×'});
    this.buttonToggleAll = page.getByTestId('toggle-all');
    }

    async addTask(taskName: string) {
    await this.input.fill(taskName)
    await this.input.press('Enter')
    }

    async createSeveralTasks(numberOfTask: number) {
    for (let i = 0; i < numberOfTask; i++) {
            await this.addTask(`Task ${i+1}`)
        }
    }

    async countToDoItems() {
        return await this.toDoText.count()
    }
    async deleteTaskByName(taskName: string) {
        const taskToDelete = await this.page.getByText(taskName)
        await taskToDelete.hover()
        await this.buttonDeleteX.click()
    }
    async completeTaskByName(taskName: string) {
        await this.page.locator('div').filter({ hasText: taskName }).getByTestId('todo-item-toggle').click();
    }
    async checkCompleteTaskByName(taskName: string) {
        const completedTask = await this.page.locator('div').filter({hasText: taskName}).getByTestId('todo-item-toggle')
        const liClass = this.page.getByRole('listitem').filter({has: completedTask});
        await expect(liClass).toHaveClass("completed")
    }
}