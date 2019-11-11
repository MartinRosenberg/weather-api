import { BadRequestException, Controller, Get, Query } from '@nestjs/common'

import { Forecast, WeatherService } from './weather.service'

@Controller('weather')
export class WeatherController {
  constructor (private readonly weatherService: WeatherService) {}

  @Get()
  async getForecast (@Query() query: { zip: string }): Promise<Forecast> {
    if (query.zip == null) {
      throw new BadRequestException('Must request forecast for at least 1 ZIP code.')
    }

    const zips = query.zip.split(',')

    if (zips.length > 5) {
      throw new BadRequestException('Must request forecast for at most 5 ZIP codes.')
    }
    if (zips.some(zip => !/^\d{5}$/.test(zip))) {
      throw new BadRequestException('Only 5-digit US ZIP codes are allowed.')
    }

    return Promise
      .all(zips.map(async zip => this.weatherService.getForecastByZip(zip)))
      .then(data => data.reduce((acc, curr) => ({ ...acc, ...curr }), {}))
  }
}
