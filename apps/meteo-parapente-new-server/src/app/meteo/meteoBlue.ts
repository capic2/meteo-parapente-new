import ky from 'ky';
import { z } from 'zod';
import { degToCardinal8, formatDateYYYYMMDD } from '../utils/misc';
import { MeteoStandardProviderStructure } from '../../types';
import { logger } from '../utils/logger';
import { allSettledWithIds } from '../utils/promise';

const meteoBlueBasic1hDaySchema = z
  .object({
    metadata: z.object({
      modelrun_updatetime_utc: z.string(),
      name: z.string(),
      height: z.number(),
      timezone_abbrevation: z.string(),
      latitude: z.number(),
      modelrun_utc: z.string(),
      longitude: z.number(),
      utc_timeoffset: z.number(),
      generation_time_ms: z.number(),
    }),
    units: z.object({
      predictability: z.string(),
      precipitation: z.string(),
      windspeed: z.string(),
      precipitation_probability: z.string(),
      relativehumidity: z.string(),
      temperature: z.string(),
      time: z.string(),
      pressure: z.string(),
      winddirection: z.string(),
    }),
    data_1h: z.object({
      time: z.string().array(),
      snowfraction: z.number().array(),
      windspeed: z.number().array(),
      temperature: z.number().array(),
      precipitation_probability: z.number().array(),
      convective_precipitation: z.number().array(),
      rainspot: z.string().array(),
      pitcode: z.number().array().optional(),
      felttemperature: z.number().array(),
      precipitation: z.number().array(),
      isdaylight: z.number().array(),
      uvindex: z.number().array(),
      relativehumidity: z.number().array(),
      sealevelpressure: z.number().array(),
      winddirection: z.number().array(),
    }),
    data_day: z.object({
      time: z.string().array(),
      temperature_instant: z.number().array(),
      precipitation: z.number().array(),
      predictability: z.number().array(),
      temperature_max: z.number().array(),
      sealevelpressure_mean: z.number().array(),
      windspeed_mean: z.number().array(),
      precipitation_hours: z.number().array(),
      sealevelpressure_min: z.number().array(),
      pictocode: z.number().array(),
      snowfraction: z.number().array(),
      humiditygreater90_hours: z.number().array(),
      convective_precipitation: z.number().array(),
      relativehumidity_max: z.number().array(),
      temperature_min: z.number().array(),
      winddirection: z.number().array(),
      felttemperature_max: z.number().array(),
      indexto1hvalues_end: z.number().array(),
      relativehumidity_min: z.number().array(),
      felttemperature_mean: z.number().array(),
      windspeed_min: z.number().array(),
      felttemperature_min: z.number().array(),
      precipitation_probability: z.number().array(),
      uvindex: z.number().array(),
      indexto1hvalues_start: z.number().array(),
      rainspot: z.string().array(),
      temperature_mean: z.number().array(),
      sealevelpressure_max: z.number().array(),
      relativehumidity_mean: z.number().array(),
      predictability_class: z.number().array(),
      windspeed_max: z.number().array(),
    }),
  })
  .or(z.undefined());

const meteoBlueWindSchema = z
  .object({
    metadata: z.object({
      modelrun_updatetime_utc: z.string(),
      name: z.string(),
      height: z.number(),
      timezone_abbrevation: z.string(),
      latitude: z.number(),
      modelrun_utc: z.string(),
      longitude: z.number(),
      utc_timeoffset: z.number(),
      generation_time_ms: z.number(),
    }),
    units: z.object({
      time: z.string(),
      windspeed: z.string(),
      density: z.string(),
      winddirection: z.string(),
      surfaceairpressure: z.string(),
    }),
    data_1h: z.object({
      time: z.string().array(),
      surfaceairpressure: z.number().array(),
      winddirection_80m: z.number().array(),
      airdensity: z.number().array(),
      windspeed_80m: z.number().array(),
      gust: z.number().array(),
    }),
    data_day: z
      .object({
        time: z.string().array(),
        windspeed_80m_mean: z.number().array(),
        gust_max: z.number().array(),
        winddirection_80m: z.number().array(),
        indexto1hvalues_start: z.number().array(),
        surfaceairpressure_max: z.number().array(),
        airdensity_min: z.number().array(),
        windspeed_80m_max: z.number().array(),
        gust_mean: z.number().array(),
        windspeed_80m_min: z.number().array(),
        surfaceairpressure_min: z.number().array(),
        surfaceairpressure_mean: z.number().array(),
        airdensity_max: z.number().array(),
        indexto1hvalues_end: z.number().array(),
        airdensity_mean: z.number().array(),
        gust_min: z.number().array(),
      })
      .optional(),
  })
  .or(z.undefined());

const getPeridotData = (
  data: number[],
  day: number,
  start: number,
  end: number
) => {
  const hoursPerDay = 24;
  const dayStartIndex = day * hoursPerDay + start;
  const dayEndIndex = day * hoursPerDay + end + 1;

  return data.slice(dayStartIndex, dayEndIndex);
};

const computeMaxData = (
  data: number[],
  day: number,
  start: number,
  end: number
) => {
  return Math.max(...getPeridotData(data, day, start, end));
};

const getMeteoBlueWindData = async (
  lat: number,
  lon: number,
  hourRanges: string[]
) => {
  const url = `https://my.meteoblue.com/packages/wind-1h?lat=${lat}&lon=${lon}&apikey=yI64pdgFs0abhT8k&windspeed=kmh`;
  logger.info(
    { file: 'meteoBlue', function: 'getMeteoBlueWindData' },
    `fetching data from ${url}`
  );

  const response = ky.get(url);
  const json = await response.json();
  const meteoBlueWindResponse = meteoBlueWindSchema.safeParse(json);

  if (meteoBlueWindResponse.error) {
    logger.error(meteoBlueWindResponse.error);
    logger.error(json);
    return null;
  }

  if (!meteoBlueWindResponse.data) {
    logger.error('No data for meteoBlue');
    return null;
  }

  const meteoBlueWindData = meteoBlueWindResponse.data;
  const days = new Set(
    meteoBlueWindData.data_1h.time.map((date) => {
      return formatDateYYYYMMDD(new Date(date));
    })
  );
  const data: Record<
    string,
    Record<string, { [key: string]: number | number[] | string[] }>
  > = {};
  for (let i = 0; i < days.size - 1; i++) {
    const day = Array.from(days.values())[i];
    data[day] = {};

    for (const hourRange of hourRanges) {
      const start = Number(hourRange.split('-')[0]);
      const end = Number(hourRange.split('-')[1]);
      data[day][hourRange] = {
        maxWindspeed_80m: computeMaxData(
          meteoBlueWindData.data_1h.windspeed_80m,
          i,
          start,
          end
        ),
        maxGust:
          computeMaxData(meteoBlueWindData.data_1h.gust, i, start, end) * 3.6,
        winddirection_80m: getPeridotData(
          meteoBlueWindData.data_1h.winddirection_80m,
          i,
          start,
          end
        ).map((winddirection) => degToCardinal8(winddirection)),
      };
    }
  }

  return data;
};

const getMeteoBlueBasicData = async (
  lat: number,
  lon: number,
  hourRanges: string[]
) => {
  const url = `https://my.meteoblue.com/packages/basic-1h_basic-day?lat=${lat}&lon=${lon}&apikey=yI64pdgFs0abhT8k`;
  logger.info(
    { file: 'meteoBlue', function: 'getMeteoBlueBasicData' },
    `fetching data from ${url}`
  );
  const response = await ky.get(url);

  const json = await response.json();
  const meteoBlueBasic1hDayResponse = meteoBlueBasic1hDaySchema.safeParse(json);

  if (meteoBlueBasic1hDayResponse.error) {
    logger.error(meteoBlueBasic1hDayResponse.error);
    logger.error(json);
    return null;
  }

  if (!meteoBlueBasic1hDayResponse.data) {
    logger.error('No data for meteoBlue');
    return null;
  }

  const meteoBlueBasic1hDayData = meteoBlueBasic1hDayResponse.data;

  const days = new Set(
    meteoBlueBasic1hDayData.data_1h.time.map((date) => {
      return formatDateYYYYMMDD(new Date(date));
    })
  );

  const data: Record<
    string,
    Record<string, { [key: string]: number | number[] | string[] }>
  > = {};
  for (let i = 0; i < days.size - 1; i++) {
    const day = Array.from(days.values())[i];
    data[day] = {};

    for (const hourRange of hourRanges) {
      const start = Number(hourRange.split('-')[0]);
      const end = Number(hourRange.split('-')[1]);
      data[day][hourRange] = {
        precipitation: computeMaxData(
          meteoBlueBasic1hDayData.data_1h.precipitation,
          i,
          start,
          end
        ),
        mediumWindspeedInkmh:
          computeMaxData(
            meteoBlueBasic1hDayData.data_1h.windspeed,
            i,
            start,
            end
          ) * 3.6,
        winddirection: getPeridotData(
          meteoBlueBasic1hDayData.data_1h.winddirection,
          i,
          start,
          end
        ).map((winddirection) => degToCardinal8(winddirection)),
      };
    }
  }

  return data;
};

export const getMeteoBlueData = async ({
  latitude,
  longitude,
  hourRanges,
  date,
}: {
  latitude: number;
  longitude: number;
  hourRanges: string[];
  date: Date;
}) => {
  const windPromise = getMeteoBlueWindData(latitude, longitude, hourRanges);
  const basicPromise = getMeteoBlueBasicData(latitude, longitude, hourRanges);

  const results = await allSettledWithIds([
    { id: 'wind', promise: windPromise },
    { id: 'basic', promise: basicPromise },
  ]);

  const windData = results.find((result) => result.id === 'wind')?.value;
  const basicData = results.find((result) => result.id === 'basic')?.value;

  logger.info(
    { file: 'meteoBlue', function: 'getMeteoBlueData' },
    `windData: ${JSON.stringify(windData, null, 2)}`
  );

  logger.info(
    { file: 'meteoBlue', function: 'getMeteoBlueData' },
    `basicData: ${JSON.stringify(basicData, null, 2)}`
  );

  if (!windData || !basicData) {
    return null;
  }

  const dateKey = formatDateYYYYMMDD(date);

  const result: MeteoStandardProviderStructure = {
    rain: Object.fromEntries(
      hourRanges.map((hourRange) => [
        hourRange,
        basicData[dateKey][hourRange].precipitation,
      ])
    ),
    wind: {
      direction: Object.fromEntries(
        hourRanges.map((hourRange) => [
          hourRange,
          windData[dateKey][hourRange].winddirection_80m,
        ])
      ),
      speed: Object.fromEntries(
        hourRanges.map((hourRange) => [
          hourRange,
          windData[dateKey][hourRange].maxWindspeed_80m,
        ])
      ),
      gust: Object.fromEntries(
        hourRanges.map((hourRange) => [
          hourRange,
          windData[dateKey][hourRange].maxGust,
        ])
      ),
    },
  };

  return result;
};
