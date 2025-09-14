import { Marker, useMapEvents } from 'react-leaflet';
import { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import { useState } from 'react';
import { Coordinates } from '../Maps';

interface EventsProps {
  onClick?: ({ lat, lon }: Coordinates) => void;
}

const Events = ({ onClick }: EventsProps) => {
  const [position, setPosition] = useState<LatLngExpression>([0, 0]);
  const map = useMapEvents({
    click: (event: LeafletMouseEvent) => {
      setPosition([event.latlng.lat, event.latlng.lng]);
      map.flyTo(event.latlng, map.getZoom());
      onClick?.({ lat: event.latlng.lat, lon: event.latlng.lng });
    },
  });

  return <Marker position={position} />;
};

Events.displayName = 'Events';

export { Events };
