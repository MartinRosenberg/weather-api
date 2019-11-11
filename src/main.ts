import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

async function bootstrap (): Promise<any> {
  const app = await NestFactory.create(AppModule)
  return app.listen(4000)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
