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
};
const icon = new Icon({
  iconUrl:
    'https://png.pngtree.com/png-clipart/20210829/original/pngtree-location-icon-png-image_6668653.jpg',
  iconSize: [38, 38],
});
const Map = ({}): JSX.Element => {
  const [persons, setPersons] = useState<DataProps[] | null>();
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
          setPersons((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();
    console.log('running');

    return () => {
      supabase.removeChannel(channelA);
    };
  }, []);
  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('userData').select();
      setPersons(data as DataProps[]);
    };
    getData();
  }, []);
  console.log(persons);

  return (
    <MapContainer
      className="h-[40rem] w-full"
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
          position={[person.latitude, person.longitude]}
          icon={icon}
        >
          <Popup>{person.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
