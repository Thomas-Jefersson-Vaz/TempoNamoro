import moment from "moment/moment";
import { useState, useEffect } from "react"; 

export default function DaysCounter() {
  function calculateRelationshipTime() {
    const dataAtual = moment();
    const inicioNamoro = moment("2024-11-02");
    const totalMonthDifference = dataAtual.diff(inicioNamoro, 'months');
    const years = Math.floor(totalMonthDifference / 12);
    const months = totalMonthDifference % 12;
    let result = '';
    if (years > 0 ){
      result += `${years} ${years === 1 ? 'ano' : 'anos'}`;
    }
    if (months > 0) {
      if(result.length > 0){  
        result += " e ";
      }
      result += `${months} ${months === 1 ? 'mês' : 'meses'}`;
    }
    if (result.length === 0 && totalMonthDifference === 0){
      const daysDiff = dataAtual.diff(inicioNamoro, 'days');
      return `${daysDiff} ${daysDiff === 1 ? 'dia' : 'dias'}`;
    } else if (result.length === 0){
      return "Menos de um mês";
    }
    return result;
  }

  const [durationString, setDurationString] = useState(calculateRelationshipTime());

  useEffect(() =>{
    const timerId = setInterval(() => {
      setDurationString(calculateRelationshipTime());
    }, 1000);
    return () => {
      clearInterval(timerId);
    }
  }, []);

  return (
    <div className=" flex h-screen w-screen items-center justify-center flex-col p-4 bg-gradient-to-br from-rose-100 via-fuchsia-100 to-indigo-200">
      <div className="bg-white/70 p-8 rounded-x1 shadow-lg text-center backdrop-blur-sm max-w-full w-max">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600">
            Thomas <span className="text-purple-600">+</span> Fernanda
          </h1>
          <span className="text-2xl mt-2 block" aria-label="heart emoji">💖</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            Tempo juntos:
          </div>
          <div className="text-3xl md:text-4xl text-indigo-700 font-semibold animate-pulse">
          {durationString}
          </div>
        </div>
      </div>
    </div>
    
  );
}