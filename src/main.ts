import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { log } from './common/helpers/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ instance: log }),
  });
  await app.listen(process.env.PORT);
}
bootstrap();
