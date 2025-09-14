import { useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useEffect } from 'react';
import { Coordinates } from '../Maps';

interface SearchProps {
  onSelection?: ({ lat, lon }: Coordinates) => void;
}

const Search = ({ onSelection }: SearchProps) => {
  const map = useMap();

  map.on('geosearch/showlocation', (e) => {
    //@ts-expect-error event is not typed correctly
    const { lat, lon } = e.location.raw;
    onSelection?.({ lat: Number(lat), lon: Number(lon) });
  });
  map.invalidateSize();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    //@ts-expect-error constructor is not typed correctly
    const searchControl = new GeoSearchControl({
      provider,
      style: 'bar',
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

export { Search };
