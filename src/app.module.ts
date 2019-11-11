import { Module } from '@nestjs/common'

import { ConfigModule } from './config'
import { WeatherModule } from './weather'

@Module({
  imports: [ConfigModule, WeatherModule],
})
export class AppModule {}
