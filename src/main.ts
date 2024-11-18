import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpenseService } from './expense/expense.service';
import { Command } from 'commander';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const expenseService = app.get(ExpenseService);

  const program = new Command();

  program
    .name('expense-tracker')
    .description('A simple expense tracker CLI')
    .version('1.0.0');

  // Add an expense
  program
    .command('add')
    .description('Add a new expense')
    .requiredOption('--description <description>', 'Expense description')
    .requiredOption('--amount <amount>', 'Expense amount', parseFloat)
    .action((options) => {
      try {
        const { description, amount } = options;
        const expense = expenseService.addExpense(description, amount);
        console.log(`Expense added successfully (ID: ${expense.id})`);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    });

  // Delete an expense
  program
    .command('delete')
    .description('Delete an expense by ID')
    .requiredOption('--id <id>', 'Expense ID', parseInt)
    .action((options) => {
      try {
        const { id } = options;
        expenseService.deleteExpense(id);
        console.log('Expense deleted successfully');
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    });

  // List all expenses
  program
    .command('list')
    .description('List all expenses')
    .action(() => {
      const expenses = expenseService.listExpenses();
      if (expenses.length === 0) {
        console.log('No expenses recorded yet.');
        return;
      }

      console.log('ID  Date       Description  Amount');
      expenses.forEach((expense) => {
        console.log(
          `${expense.id}   ${expense.date}  ${expense.description.padEnd(10)} $${expense.amount}`,
        );
      });
    });

  // Show summary of expenses
  program
    .command('summary')
    .description('Show expense summary')
    .option('--month <month>', 'Month (1-12)', parseInt)
    .action((options) => {
      try {
        const { month } = options;
        const summary = expenseService.getSummary(month);
        console.log(summary);
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    });

  await program.parseAsync(process.argv);
}

bootstrap();
