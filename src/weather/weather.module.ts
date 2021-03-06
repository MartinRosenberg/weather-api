import { HttpModule, Module } from '@nestjs/common'

import { ConfigModule } from '../config/config.module'
import { WeatherController } from './weather.controller'
import { WeatherService } from './weather.service'

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
