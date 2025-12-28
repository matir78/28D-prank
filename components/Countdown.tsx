import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +targetDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex flex-wrap gap-4 justify-center text-neon-blue font-mono text-3xl md:text-5xl font-bold my-4 drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
      <div className="flex flex-col items-center bg-black/30 p-2 rounded">
        <span>{timeLeft.days.toString().padStart(2, '0')}</span>
        <span className="text-xs md:text-sm text-gray-500 font-sans tracking-widest mt-1">DÍAS</span>
      </div>
      <span className="self-start mt-2">:</span>
      <div className="flex flex-col items-center bg-black/30 p-2 rounded">
        <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="text-xs md:text-sm text-gray-500 font-sans tracking-widest mt-1">HRS</span>
      </div>
      <span className="self-start mt-2">:</span>
      <div className="flex flex-col items-center bg-black/30 p-2 rounded">
        <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="text-xs md:text-sm text-gray-500 font-sans tracking-widest mt-1">MIN</span>
      </div>
      <span className="self-start mt-2">:</span>
      <div className="flex flex-col items-center bg-black/30 p-2 rounded">
        <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className="text-xs md:text-sm text-gray-500 font-sans tracking-widest mt-1">SEG</span>
      </div>
    </div>
  );
};