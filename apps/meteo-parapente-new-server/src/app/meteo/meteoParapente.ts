import { z } from 'zod';
import ky from 'ky';
import { degToCardinal8, formatDateYYYYMMDD } from '../utils/misc.js';
import { MeteoStandardProviderStructure } from '../../types.js';
import { logger } from '../utils/logger.js';

const meteoParapenteStatySchema = z.object({
  france: z.array(
    z.object({
      run: z.string(),
      day: z.string(),
      private: z.boolean(),
      status: z.string(),
      update: z.string().optional(),
    })
  ),
  app: z.object({
    favored: z.string(),
    minimal: z.string(),
  }),
  js: z.object({
    manifest: z.string(),
    vendor: z.string(),
    client: z.string(),
  }),
  tos: z.string(),
  news: z.array(z.string()),
});

const meteoParapenteDataSchema = z.object({
  z: z.number().array(),
  umet: z.number().array(),
  vmet: z.number().array(),
  ter: z.number(),
  pblh: z.number(),
  raintot: z.number(),
  cfracl: z.number(),
  cfracm: z.number(),
  cfrach: z.number(),
  cldfra: z.number().array().or(z.number()),
  ths: z.number().array(),
  thr: z.number().array(),
});
const meteoParapenteSchema = z.object({
  gridCoords: z.object({
    domain: z.number(),
    sn: z.number(),
    we: z.number(),
    lat: z.number(),
    lon: z.number(),
    latDiff: z.number(),
    lonDiff: z.number(),
  }),
  data: z.object({
    '04:00': meteoParapenteDataSchema,
    '05:00': meteoParapenteDataSchema,
    '06:00': meteoParapenteDataSchema,
    '07:00': meteoParapenteDataSchema,
    '08:00': meteoParapenteDataSchema,
    '09:00': meteoParapenteDataSchema,
    '10:00': meteoParapenteDataSchema,
    '11:00': meteoParapenteDataSchema,
    '12:00': meteoParapenteDataSchema,
    '13:00': meteoParapenteDataSchema,
    '14:00': meteoParapenteDataSchema,
    '15:00': meteoParapenteDataSchema,
    '16:00': meteoParapenteDataSchema,
    '17:00': meteoParapenteDataSchema,
    '18:00': meteoParapenteDataSchema,
    '19:00': meteoParapenteDataSchema,
    '20:00': meteoParapenteDataSchema,
    '21:00': meteoParapenteDataSchema,
  }),
});

const computeWindProfile = (umet: number, vmet: number, z: number) => {
  const speedInMs = Math.sqrt(Math.pow(umet, 2) + Math.pow(vmet, 2));
  const direction = ((Math.atan2(-umet, -vmet) * 180) / Math.PI + 360) % 360;

  return {
    speedInKmh: speedInMs * 3.6,
    direction,
    altitude: z,
  };
};

const getMeteoParapenteInitValue = async () => {
  const url = 'https://data0.meteo-parapente.com/status.php';
  const response = await ky.get(url);
  const json = await response.json();
  const meteoParapenteInitValueResponse =
    meteoParapenteStatySchema.safeParse(json);

  if (meteoParapenteInitValueResponse.error) {
    logger.error(meteoParapenteInitValueResponse.error);
    logger.error(json);
    return null;
  }

  if (!meteoParapenteInitValueResponse.data) {
    logger.error('No data for meteoParapente');
    return null;
  }

  return meteoParapenteInitValueResponse.data.france.at(0)?.run;
};

const getMeteoParapenteDataForOneDay = async (
  initValue: string,
  date: string,
  lat: number,
  lon: number,
  hourRanges: string[]
) => {
  logger.info(
    { file: 'meteoParapente', function: 'getMeteoParapenteDataForOneDay' },
    `initValue: ${initValue}, date: ${date}, lat: ${lat}, lon: ${lon}, hourRanges: ${hourRanges}`
  );
  const url = `https://data0.meteo-parapente.com/data.php?run=${initValue}&location=${lat},${lon}&date=${date}&plot=windgram`;
  logger.info(
    { file: 'meteoParapente', function: 'getMeteoParapenteDataForOneDay' },
    `fetching data from ${url}`
  );
  const response = await ky.get(url);
  const json = await response.json();
  const meteoParapenteResponse = meteoParapenteSchema.safeParse(json);

  if (meteoParapenteResponse.error) {
    logger.error(meteoParapenteResponse.error);
    logger.error(json);
    return null;
  }

  const meteoParapenteData = meteoParapenteResponse.data;

  const data: Record<string, { [key: string]: number | number[] | string[] }> =
    {};

  const utcOffset = -new Date().getTimezoneOffset() / 60;

  for (const hourRange of hourRanges) {
    const start = Number(hourRange.split('-')[0]) - utcOffset;
    const end = Number(hourRange.split('-')[1]) - utcOffset;

    logger.info(
      { file: 'meteoParapente', function: 'getMeteoParapenteDataForOneDay' },
      `hour start: ${start}, hour end: ${end}`
    );

    const computedData = Array.from(
      { length: Math.floor(end - start) + 1 },
      (_, i) => start + i
    ).map((value) => {
      const key = `${String(value).padStart(
        2,
        '0'
      )}:00` as keyof typeof meteoParapenteData.data;
      const { umet, vmet, z } = meteoParapenteData.data[key];
      //TODO: pour le moment on utilise que l'altitude de l'atterro mais il faudrait utiliser la hauteur du deco
      return {
        wind: computeWindProfile(umet[0], vmet[0], z[0]),
        rain: meteoParapenteData.data[key].raintot,
      };
    });

    data[hourRange] = {
      maxWindSpeedInKmh: Math.max(
        ...computedData.map(({ wind }) => wind.speedInKmh)
      ),
      windDirection: computedData.map(({ wind }) =>
        degToCardinal8(wind.direction)
      ),
      altitude: computedData[0].wind.altitude,
      rain: Math.max(...computedData.map(({ rain }) => rain)),
    };
  }

  return data;
};

export const getMeteoParapenteData = async ({
  longitude,
  latitude,
  hourRanges,
  date,
}: {
  latitude: number;
  longitude: number;
  hourRanges: string[];
  date: Date;
}) => {
  const initValue = await getMeteoParapenteInitValue();

  if (!initValue) {
    logger.error('No init value for meteoParapente');
    return null;
  }

  const dataDay = await getMeteoParapenteDataForOneDay(
    initValue,
    formatDateYYYYMMDD(date),
    latitude,
    longitude,
    hourRanges
  );

  logger.info(
    { file: 'meteoParapente', function: 'getMeteoParapenteData' },
    `dataDay: ${JSON.stringify(dataDay, null, 2)}`
  );

  if (!dataDay) {
    return null;
  }

  const data: MeteoStandardProviderStructure = {
    wind: {
      direction: Object.fromEntries(
        hourRanges.map((hourRange) => [
          hourRange,
          dataDay[hourRange].windDirection,
        ])
      ),
      speed: Object.fromEntries(
        hourRanges.map((hourRange) => [
          hourRange,
          dataDay[hourRange].maxWindSpeedInKmh,
        ])
      ),
    },
    rain: Object.fromEntries(
      hourRanges.map((hourRange) => [hourRange, dataDay[hourRange].rain])
    ),
  };

  return data;
};
