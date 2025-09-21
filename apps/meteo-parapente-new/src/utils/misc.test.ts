import { describe } from 'vitest';
import { isPropertyWithSubProperties } from './misc';

describe('misc', () => {
  describe('isPropertyWithSubProperties', () => {
    it('returns true if the property has sub properties', () => {
      expect(
        isPropertyWithSubProperties(
          {
            properties: {
              direction: { ranges: { '09-12': { meteoBlue: 0 } } },
            },
          },
          {
            properties: [
              {
                id: 'wind',
                label: 'wind',
                properties: [{ id: 'direction', label: 'direction' }],
              },
            ],
            hourRanges: ['09-12'],
          },
          'wind'
        )
      ).toBeTruthy();
    });

    it('returns false if the property does not have sub properties', () => {
      expect(
        isPropertyWithSubProperties(
          {
            properties: { wind: { ranges: { '09-12': { meteoBlue: 0 } } } },
          },
          {
            properties: [{ id: 'wind', label: 'wind' }],
            hourRanges: ['09-12'],
          },
          'wind'
        )
      ).toBeFalsy();
    });

    it('returns false if the property is not an object', () => {
      expect(
        isPropertyWithSubProperties(
          {
            properties: { wind: { ranges: { '09-12': { meteoBlue: 0 } } } },
          },
          {
            properties: [{ id: 'wind', label: 'wind' }],
            hourRanges: ['09-12'],
          },
          'wind'
        )
      ).toBeFalsy();
    });
  });
});
