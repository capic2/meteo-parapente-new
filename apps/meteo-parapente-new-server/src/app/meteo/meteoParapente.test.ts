import { getMeteoParapenteData } from './meteoParapente';
import { describe, expect, it } from 'vitest';
import { MeteoStandardProviderStructure } from '../../types';

describe.skip('meteoParapente', () => {
  it('should return data', async () => {
    const data = await getMeteoParapenteData({
      latitude: 46.971161,
      longitude: 5.885981,
      hourRanges: ['09-12', '12-16', '16-19'],
      date: new Date('2025-08-19 00:00:00 GMT+2'),
    });

    const expected: MeteoStandardProviderStructure = {
      wind: {
        direction: {
          '09-12': ['E', 'NE', 'N', 'NE'],
          '12-16': ['NE', 'NE', 'NE', 'N', 'SW'],
          '16-19': ['SW', 'SW', 'W', 'SW'],
        },
        speed: {
          '09-12': 10.63067260336805,
          '12-16': 10.63067260336805,
          '16-19': 20.969806866063408,
        },
      },
      rain: {
        '09-12': 0.3,
        '12-16': 0.2,
        '16-19': 4.1,
      },
    };

    expect(data).toStrictEqual(expected);
  });
});
