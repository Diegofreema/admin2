'use client';
import { FC, useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import { DocumentData, collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
interface Props {}
const icon = new Icon({
  iconUrl:
    'https://png.pngtree.com/png-clipart/20210829/original/pngtree-location-icon-png-image_6668653.jpg',
  iconSize: [38, 38],
});
const Map: FC<Props> = ({}): JSX.Element => {
  const peopleCollectionRef = collection(db, 'location');
  const [persons, setPersons] = useState<DocumentData[]>([]);
  useEffect(() => {
    const unSubscribe = onSnapshot(peopleCollectionRef, (snapshot) => {
      // @ts-ignore
      setPersons(snapshot?.docs?.map((doc) => doc.data()));
    });
    return () => unSubscribe();
  }, [persons, peopleCollectionRef]);

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
      {persons.map(({ latitude, longitude, email }, i) => (
        <Marker key={i} position={[latitude, longitude]} icon={icon}>
          <Popup>{email}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
