import { useEffect, useState } from 'react';
import { site } from '../data/site';

export default function LocalTime({ className = '' }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: site.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();

    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ? `${time} NPT` : 'NPT'}
    </span>
  );
}
