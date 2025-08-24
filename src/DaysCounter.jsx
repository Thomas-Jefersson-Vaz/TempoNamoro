import moment from "moment/moment";
import { useState, useEffect } from "react";

export default function DaysCounter() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  function calculateRelationshipTime() {
    const inicioNamoro = moment("2024-11-02");
    const dataAtual = moment();

    if (dataAtual.isBefore(inicioNamoro)) {
      return "O nosso tempo ainda não começou... 💖";
    }

    let tempDate = inicioNamoro.clone();
    const years = dataAtual.diff(tempDate, 'years');
    tempDate.add(years, 'years');
    const months = dataAtual.diff(tempDate, 'months');
    tempDate.add(months, 'months');
    const days = dataAtual.diff(tempDate, 'days');
    tempDate.add(days, 'days');
    const hours = dataAtual.diff(tempDate, 'hours');
    tempDate.add(hours, 'hours');
    const minutes = dataAtual.diff(tempDate, 'minutes');
    tempDate.add(minutes, 'minutes');
    const seconds = dataAtual.diff(tempDate, 'seconds');

    const parts = [];
    if (years > 0) parts.push(`${years} ${years === 1 ? 'ano' : 'anos'}`);
    if (months > 0) parts.push(`${months} ${months === 1 ? 'mês' : 'meses'}`);
    if (days > 0) parts.push(`${days} ${days === 1 ? 'dia' : 'dias'}`);
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? 'hora' : 'horas'}`);
    if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`);
    
    parts.push(`${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`);

    if (parts.length > 1) {
      const lastPart = parts.pop();
      return parts.join(', ') + ' e ' + lastPart;
    }

    return parts[0] || '';
  }

  const [durationString, setDurationString] = useState(calculateRelationshipTime());

  useEffect(() => {
    const timerId = setInterval(() => {
      setDurationString(calculateRelationshipTime());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`
      flex h-screen w-screen items-center justify-center flex-col p-4 
      transition-colors duration-500
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900' 
        : 'bg-gradient-to-br from-rose-100 via-fuchsia-100 to-indigo-200'}
    `}>
      <div className={`
        p-8 rounded-xl shadow-lg text-center backdrop-blur-sm w-full
        ${/* THE FIX 1: Slightly wider max-width for more space */ 'max-w-4xl'}
        transition-colors duration-500 relative
        ${isDarkMode 
          ? 'bg-slate-800/60 shadow-purple-500/20' 
          : 'bg-white/70 shadow-rose-200/50'}
      `}>
        <div className="mb-8">
          <h1 className={`
            text-4xl md:text-5xl font-bold 
            ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}
          `}>
            Thomas <span className={isDarkMode ? 'text-purple-400' : 'text-purple-600'}>+</span> Fernanda
          </h1>
          <span className="text-2xl mt-2 block" aria-label="heart emoji">💖</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className={`
            text-lg md:text-xl mb-2 
            ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
          `}>
            Tempo juntos:
          </div>
          <div className={`
            font-semibold min-h-[6rem] flex items-center justify-center
            ${/* THE FIX 2: More granular font sizes to prevent wrapping */ ''}
            text-2xl md:text-3xl lg:text-4xl
            ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}
          `}>
            {durationString}
          </div>
        </div>

        <button 
          onClick={toggleTheme} 
          className={`
            absolute top-4 right-4 p-2 rounded-full transition-all duration-300
            focus:outline-none focus:ring-2
            ${isDarkMode 
              ? 'bg-yellow-400/80 text-gray-900 hover:bg-yellow-300 focus:ring-yellow-200' 
              : 'bg-indigo-500/80 text-white hover:bg-indigo-400 focus:ring-indigo-300'}
          `}
          aria-label="Toggle theme"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
}
