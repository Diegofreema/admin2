'use client';
import { FC, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import { supabase } from '@/lib/supabase';

type DataProps = {
  email: string;
  latitude: number;
  longitude: number;
  name: string;
  id: number;
  user_id: string;
};
const icon = new Icon({
  iconUrl:
    'https://png.pngtree.com/png-clipart/20210829/original/pngtree-location-icon-png-image_6668653.jpg',
  iconSize: [38, 38],
});
const Map = ({}): JSX.Element => {
  const [persons, setPersons] = useState<DataProps[] | null>();
  const [id, setId] = useState('');
  useEffect(() => {
    const channelA = supabase
      .channel('userData')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'userData',
        },
        (payload) => {
          // @ts-ignore
          const { eventType, old } = payload;
          if (eventType === 'DELETE') {
            const filterData = persons?.filter(
              (person) => person.user_id !== old?.user_id
            );
            return setPersons(filterData);
          }

          setPersons((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channelA);
    };
  }, [persons]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('userData').select();
      setPersons(data as DataProps[]);
    };
    getData();
  }, []);

  // @ts-ignore
  console.log(persons);

  return (
    <MapContainer
      className="h-screen w-full"
      center={[5.47631, 7.025853]}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {persons?.map((person: DataProps, i) => (
        <Marker
          key={i}
          position={[person?.latitude || 5.6767, person?.longitude || 7.02555]}
          icon={icon}
        >
          <Popup>{person?.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
