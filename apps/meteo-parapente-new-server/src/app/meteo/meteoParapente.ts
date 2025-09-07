import { z } from 'zod';
import ky from 'ky';
import { degToCardinal8, formatDateYYYYMMDD } from '../utils/misc';
import { MeteoStandardProviderStructure } from '../../types';
import { logger } from '../utils/logger';

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

const getMeteoParapenteDataForOneDay = async (
  date: string,
  lat: number,
  lon: number,
  hourRanges: string[]
) => {
  const url = `https://data0.meteo-parapente.com/data.php?run=${date}00&location=${lat},${lon}&date=${date}&plot=windgram`;
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

    console.log(start, end);
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
  /* for (let i = 0; i < 7; i++) {
    const formattedDate = formatDateYYYYMMDD(
      new Date(new Date().setDate(date.getDate() + i))
    );
    data[formattedDate] = await getMeteoParapenteDataForOneDay(
      formattedDate,
      latitude,
      longitude,
      hourRanges
    );
  }*/

  const dataDay = await getMeteoParapenteDataForOneDay(
    formatDateYYYYMMDD(date),
    latitude,
    longitude,
    hourRanges
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
