Expense Tracker CLI

A simple command-line interface (CLI) application built using NestJS to manage your expenses. This application allows you to add, update, delete, and view expenses. It also provides summaries of your expenses for better financial management.

### Features
- Add Expenses: Add an expense with a description and amount.
- Delete Expenses: Remove an expense by its ID.
- List Expenses: View a list of all recorded expenses.
- Summarize Expenses: Get a total summary of all expenses or a summary for a specific month.
- Persistent Storage: Uses a JSON file to store data.

### Technologies Used
- NestJS: For building the CLI application.
- Commander: For managing CLI commands.
- Node.js: For file handling and execution.

### Installation
1. Clone the Repository

git clone https://github.com/mykytapilec/expense-tracker.git
cd expense-tracker

2. Install Dependencies
npm install

3. Build the Project
npm run build

### Usage
Run the CLI Use the following command structure:
node dist/main.js <command> [options]

Available Commands

1. Add an Expense Add a new expense to the tracker.
node dist/main.js add --description <description> --amount <amount>
Example: node dist/main.js add --description "Lunch" --amount 20
Output: Expense added successfully (ID: 1)

2. Delete an Expense Delete an expense by its ID.
node dist/main.js delete --id <id>
Example: node dist/main.js delete --id 1
Output: Expense deleted successfully

3. List All Expenses View all recorded expenses.
Example: node dist/main.js list
Output: 
ID  Date       Description  Amount
1   2024-11-18  Lunch        $20
2   2024-11-18  Dinner       $15

4. View Summary View the total expenses or a monthly summary.
node dist/main.js summary [--month <month>]
- Total Summary:
Example: node dist/main.js summary
Output: Total expenses: $35
- Monthly Summary:
node dist/main.js summary --month <month>
Example for November: node dist/main.js summary --month 11
Output: Total expenses for November: $35

### Project Structure
src/
├── app.module.ts          # Main application module
├── main.ts                # CLI entry point
└── expense/
    ├── expense.service.ts # Service for handling expense logic
    └── expenses.json      # Persistent data storage

### Known Issues
- The application currently stores data in a plain JSON file, which may not scale for large datasets.
- Only supports viewing expenses for the current year.

### Future Improvements
- Add support for categories (e.g., Food, Travel, etc.).
- Implement search and filtering by description.
- Add support for exporting data (CSV/Excel).
- Enhance storage by using a database (e.g., SQLite or MongoDB).

### Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request for any enhancements or bug fixes.

### License
This project is licensed under the MIT License.

### Author
Created by Mikita Pilets

### Project URL
https://roadmap.sh/projects/expense-tracker
