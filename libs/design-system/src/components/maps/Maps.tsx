import { forwardRef, useRef } from 'react';
import { MapContainer, MapContainerProps, TileLayer } from 'react-leaflet';
import { Search } from './parts/Search';
import { Events } from './parts/Events';

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface MapsProps extends MapContainerProps {
  latitude: number;
  longitude: number;
  onCoordinatesChange?: ({ lat, lon }: Coordinates) => void;
}

const Maps = forwardRef<HTMLDivElement, MapsProps>(
  (
    {
      children,
      latitude,
      longitude,
      onCoordinatesChange,
      className,

      ...rest
    },
    ref
  ) => {
    const mapRef = useRef(null);

    return (
      <MapContainer
        ref={mapRef}
        center={[latitude, longitude]}
        zoom={13}
        className={className}
        {...rest}
      >
        <Search onSelection={onCoordinatesChange} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Events onClick={onCoordinatesChange} />
      </MapContainer>
    );
  }
);

Maps.displayName = 'Maps';

export { Maps };
