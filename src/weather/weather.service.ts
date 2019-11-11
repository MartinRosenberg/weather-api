import { HttpService, Injectable } from '@nestjs/common'

import { ConfigService } from '../config/config.service'

/**
 * Just the relevant parts of the data returned by the OWM API. The actual
 * response is much larger than this.
 */
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

/**
 * The result of the transformation.
 */
export type Forecast = {
  [zip: string]: {
    forecast: Array<{
      dateTime: Date
      temperature: number
      conditions: string
    }>
    utcOffsetSeconds: number
  }
}

/**
 *
 */
@Injectable()
export class WeatherService {
  static readonly baseUrl = 'https://api.openweathermap.org/data/2.5'

  /**
   * @param configService - (injected) provides the OWM API key
   * @param httpService - (injected) provides Axios for making requests
   */
  constructor (
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Gets the 5-day forecast for the given ZIP code, including temperature and
   * description of conditions for each date/time twice a day, and the offset
   * from UTC in seconds.
   *
   * @param zip - a ZIP (postal) code within the USA
   * @return - the 5-day forecast
   */
  async getForecastByZip (zip: string): Promise<Forecast> {
    const res: RawData = await this.httpService
      .get(`${WeatherService.baseUrl}/forecast`, {
        params: {
          appid: this.configService.owmApiKey,
          units: 'imperial',
          zip: `${zip},us`,
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
