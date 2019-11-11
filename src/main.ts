import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'

async function bootstrap (): Promise<any> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  return app.listen(4000)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
