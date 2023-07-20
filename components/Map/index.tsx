import dynamic from 'next/dynamic';
import { FC } from 'react';

const DynamicMap = dynamic(() => import('./Map'), {
  ssr: false,
});

interface Props {}

const Map: FC<Props> = ({}): JSX.Element => {
  return <DynamicMap />;
};

export default Map;
