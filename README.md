# Weather API

## Setup

1. Download and install:
    ```bash
    git clone https://github.com/MartinRosenberg/weather-api.git
    cd weather-api
    yarn
    ```
2. Add your API key:
    ```bash
    echo "OWM_API_KEY = [your API key]" > .env
    ```
3. Run:
    ```bash
    yarn start:dev
    ```

## Completing the assignment

At no point did I get a solid, uninterrupted block of time to work on this, so it was nearly impossible to track time spent on this.

## Tooling choice

I chose to use NestJS over the other options as it is your current favorite for use on the upcoming work, so it made sense to use this as an opportunity to learn relevant skills.

## Response structure

I made the response an object with the ZIP codes as keys, as opposed to an array, to keep the data organized because the order of the ZIP codes in the query is likely quite arbitrary. I find this makes the data easier to conceptualize and read. The tradeoff is that the end user needs to convert it to an array themselves to map over, if they're only using vanilla JS data structures and utilities.

For the interior structure, however, I went the other way: instead of making the individual weather data an object keyed with dateTimes, I made the dateTimes into values in an array. This is because, while the JSON dates are strings, they're likely to be converted into other formats using native Date, moment.js, or date-fns, and those objects can't be object keys; that would've been a much bigger tradeoff.

## Testing

Testing has all been removed from this application, as the spec calls for maximally simple code and documentation, and does not call for testing, which would then only serve to complicate the code. In a real-world application, this would not be the case.

## To do

Given more time:

- [ ] Add testing
- [ ] Add Swagger (not swagger, but maybe also that)

## Resources used

These resources were used in whole or in part - usually in small part, as you might guess from the number of them.

I didn't have any real prior experience with NestJS, Axios, RxJS, which cost me a bit of extra learning time.

### NestJS basics

- <https://docs.nestjs.com/controllers>
- <https://docs.nestjs.com/providers>
- <https://docs.nestjs.com/modules>
- <https://docs.nestjs.com/techniques/http-module>
- <https://docs.nestjs.com/techniques/configuration>
- <https://www.youtube.com/watch?v=F_oOtaxb0L8> and <https://github.com/academind/nestjs-introduction>
- <https://www.codemag.com/Article/1907081/Nest.js-Step-by-Step>

### Axios basics

- <https://github.com/axios/axios>
- <https://flaviocopes.com/axios/>

### Calling the OpenWeatherMap API

- <https://openweathermap.org/forecast5>
- <https://www.joshmorony.com/using-providers-and-http-requests-in-a-nestjs-backend/>

### Using the API data

- <https://stackoverflow.com/questions/52859515/nestjs-using-axios>
- <https://stackoverflow.com/questions/50355670/nestjs-returning-the-result-of-an-http-request>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date>

### Error handling

- <https://www.restapitutorial.com/httpstatuscodes.html>
- <https://stackoverflow.com/questions/49709429/decorator-to-return-a-404-in-a-nest-controller>
- <https://stackoverflow.com/questions/51112952/what-is-the-nestjs-error-handling-approach-business-logic-error-vs-http-error>

### NestJS examples

Some other NestJS APIs I found in my searching also happened to use the OWM API, though you'll see my code is still rather different from theirs.

- <https://github.com/lujakob/nestjs-realworld-example-app>
- <https://matwrites.com/nestjs-typescript-nodejs-framework/>
- <https://github.com/xmlking/ngx-starter-kit/blob/develop/apps/api/src/app/external/weather/weather.service.ts>
