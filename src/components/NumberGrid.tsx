import React from 'react';

interface NumberGridProps {
  drawnNumbers: Set<string>;
  lastDrawnNumber: string | null;
}


const NumberGrid: React.FC<NumberGridProps> = ({ drawnNumbers, lastDrawnNumber }) => {
  // Generar números del 00 al 75
  const numbers = Array.from({ length: 76 }, (_, i) => i.toString().padStart(2, '0'));
  return (
    <div className="bg-white rounded-lg shadow-xl p-4 md:p-8 w-full">
      <h2 className="text-base md:text-3xl font-bold text-center mb-2 md:mb-4 text-gray-800">
        Números del Bingo
      </h2>
      <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-19 gap-1 md:gap-2 w-full">
        {numbers.map((number) => {
          const isDrawn = drawnNumbers.has(number);
          const isLastDrawn = number === lastDrawnNumber;
          return (
            <div
              key={number}
              className={`flex items-center justify-center text-xs sm:text-base md:text-xl font-bold rounded transition-all duration-500 aspect-square px-1 py-2 md:px-2 md:py-4
                ${isDrawn
                  ? isLastDrawn
                    ? 'bg-yellow-400 text-black scale-110 shadow-lg animate-pulse'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
              `}
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NumberGrid;
