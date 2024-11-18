import { Module } from '@nestjs/common';
import { ExpenseService } from './expense/expense.service';

@Module({
  providers: [ExpenseService],
})
export class AppModule {}
