import { getMeteoBlueData } from './meteoBlue';
import { describe, expect, it } from 'vitest';
import { MeteoStandardProviderStructure } from '../../types';
const lat = 46.971161;
const lon = 5.885981;

describe('meteo', async () => {
  it('should return data', async () => {
    const data = await getMeteoBlueData({
      latitude: lat,
      longitude: lon,
      hourRanges: ['09-12', '12-16', '16-19'],
      date: new Date('2025-08-19'),
    });

    const expected: MeteoStandardProviderStructure = {
      wind: {
        direction: {
          '09-12': ['S', 'W', 'W', 'SW'],
          '12-16': ['SW', 'W', 'W', 'SW', 'SW'],
          '16-19': ['SW', 'SW', 'SW', 'SW'],
        },
        speed: {
          '09-12': 2.69,
          '12-16': 5.22,
          '16-19': 5.22,
        },
        gust: {
          '09-12': 19.8,
          '12-16': 35.892,
          '16-19': 35.892,
        },
      },
      rain: {
        '09-12': 0,
        '12-16': 0.16,
        '16-19': 1.53,
      },
    };

    expect(data).toStrictEqual(expected);
  });

  it.todo('returns an error if the api is down')
});
