import * as dotenv from 'dotenv'
import * as fs from 'fs'

/**
 * Provides environment variables
 */
export class ConfigService {
  private readonly envConfig: Record<string, string>

  /**
   * @param filePath - path to the file containing environment variables
   */
  constructor (filePath: string) {
    this.envConfig = dotenv.parse(fs.readFileSync(filePath))
  }

  /**
   * @return - the OpenWeatherMap API key
   */
  get owmApiKey (): string {
    return this.envConfig.OWM_API_KEY
  }
}
