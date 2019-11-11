import { HttpService, Injectable } from '@nestjs/common'

import { ConfigService } from '../config/config.service'

type RawData = {
  data: {
    list: Array<{
      dt: number
      main: {
        temp: number
      }
      weather: Array<{
        description: string
      }>
    }>
    city: {
      timezone: number
    }
  }
}

export type Forecast = {
  [zip: string]: {
    forecast: any
    utcOffsetSeconds: number
  }
}

@Injectable()
export class WeatherService {
  static readonly baseUrl = 'https://api.openweathermap.org/data/2.5'

  constructor (
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getForecastByZip (zip: string, countryCode: string = 'us'): Promise<Forecast> {
    const res: RawData = await this.httpService
      .get(`${WeatherService.baseUrl}/forecast`, {
        params: {
          appid: this.configService.owmApiKey,
          units: 'imperial',
          zip: `${zip},${countryCode}`,
        },
      })
      .toPromise()

    const utcOffsetSeconds = res.data.city.timezone
    const forecast = res.data.list
      .map(({ dt, main, weather }) => ({
        dateTime: new Date((dt + utcOffsetSeconds) * 1000),
        temperature: main.temp,
        conditions: weather[0].description,
      }))
      .filter(({ dateTime }) => {
        const hour = dateTime.getHours() % 12
        return hour >= 5 && hour < 8
      })
    return { [zip]: { forecast, utcOffsetSeconds } }
  }
}
