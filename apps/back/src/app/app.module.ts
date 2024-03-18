import { Module } from '@nestjs/common';

import { CoreModule } from '@gt-technical-test/libs/api/core';
import { ExpenseModule } from '@gt-technical-test/libs/api/expense';

@Module({
  imports: [CoreModule, ExpenseModule],
})
export class AppModule {}
