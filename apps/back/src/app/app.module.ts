import { Module } from '@nestjs/common';

import { CoreModule } from '@gt-technical-test/libs/api/core';

@Module({
  imports: [CoreModule],
})
export class AppModule {}
