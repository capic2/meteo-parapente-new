import { http, HttpResponse } from 'msw';
import meteoParapenteJson from './meteoparapente.json' with { type: 'json' };
import meteoBlueJson from './meteoblue.json' with { type: 'json' };
import meteoBlueWindJson from './meteoblue_wind.json' with { type: 'json' };

export const handlers = [
  http.get('https://my.meteoblue.com/packages/basic-1h_basic-day', () => {
    console.log('handlers meteoBlueJson');
    return HttpResponse.json(meteoBlueJson);
  }),
  http.get('https://my.meteoblue.com/packages/wind-1h', () => {
    console.log('handlers meteoBlueWindJson');
    return HttpResponse.json(meteoBlueWindJson);
  }),
  http.get('https://data0.meteo-parapente.com/data.php', () => {
    console.log('handlers meteoParapenteJson');
    return HttpResponse.json(meteoParapenteJson);
  }),
];
