import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

// Define the structure of an expense
interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
}

@Injectable()
export class ExpenseService {
  private readonly filePath = path.resolve(__dirname, 'expenses.json');

  constructor() {
    // Initialize the JSON file if it doesn't exist
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
  }

  // Fetch all expenses from the file
  private getExpenses(): Expense[] {
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  // Save all expenses back to the file
  private saveExpenses(expenses: Expense[]) {
    fs.writeFileSync(this.filePath, JSON.stringify(expenses, null, 2));
  }

  addExpense(description: string, amount: number): Expense {
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }

    const expenses = this.getExpenses();
    const newExpense: Expense = {
      id: expenses.length ? expenses[expenses.length - 1].id + 1 : 1,
      date: new Date().toISOString().split('T')[0],
      description,
      amount,
    };

    expenses.push(newExpense);
    this.saveExpenses(expenses);
    return newExpense;
  }

  deleteExpense(id: number): boolean {
    const expenses = this.getExpenses();
    const index = expenses.findIndex((expense) => expense.id === id);

    if (index === -1) {
      throw new Error(`Expense with ID ${id} not found`);
    }

    expenses.splice(index, 1);
    this.saveExpenses(expenses);
    return true;
  }

  listExpenses(): Expense[] {
    return this.getExpenses();
  }

  getSummary(month?: number): string {
    const expenses = this.getExpenses();

    const filteredExpenses = month
      ? expenses.filter(
          (expense) =>
            new Date(expense.date).getMonth() + 1 === month &&
            new Date(expense.date).getFullYear() === new Date().getFullYear(),
        )
      : expenses;

    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    if (month) {
      const monthName = new Date(0, month - 1).toLocaleString('en-US', { month: 'long' });
      return `Total expenses for ${monthName}: $${total}`;
    }

    return `Total expenses: $${total}`;
  }
}
