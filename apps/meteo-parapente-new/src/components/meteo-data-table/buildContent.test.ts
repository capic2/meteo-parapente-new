import { describe } from 'vitest';
import { buildHeader } from './buildContent';

describe('buildContent', () => {
  describe('buildHeader', () => {
    it('should return data', () => {
      const structure = {
        hourRanges: ['09-12', '12-16', '16-19'],
        properties: [
          {
            id: 'wind',
            label: 'app.meteo.wind',
            properties: [
              {
                id: 'direction',
                label: 'app.meteo.meteo-blue.wind.direction',
              },
              {
                id: 'speed',
                label: 'app.meteo.meteo-blue.wind.speed',
              },
              {
                id: 'gust',
                label: 'app.meteo.meteo-blue.wind.gust',
              },
            ],
          },
          {
            id: 'rain',
            label: 'app.meteo.rain',
          },
          {
            id: 'clouds',
            label: 'app.meteo.clouds',
          },
          {
            id: 'temperature',
            label: 'app.meteo.temperature',
          },
        ],
      };

      expect(buildHeader(structure)).toStrictEqual([
        { id: 'row', name: '', isRowHeader: true },
        { id: '09-12', name: '09-12', isRowHeader: false },
        { id: '12-16', name: '12-16', isRowHeader: false },
        { id: '16-19', name: '16-19', isRowHeader: false },
      ]);
    });
  });
});
