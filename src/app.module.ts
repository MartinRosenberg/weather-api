import { Module } from '@nestjs/common'

import { ConfigModule } from './config/config.module'
import { WeatherModule } from './weather/weather.module'

@Module({
  imports: [ConfigModule, WeatherModule],
})
export class AppModule {}
