import React from 'react';

interface NumberGridProps {
  drawnNumbers: Set<string>;
  lastDrawnNumber: string | null;
}

const NumberGrid: React.FC<NumberGridProps> = ({
  drawnNumbers,
  lastDrawnNumber,
}) => {
  // Generar números del 00 al 75
  const numbers = Array.from({ length: 76 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  return (
    <div className="bg-white rounded-lg shadow-xl p-2 lg:p-4 xl:p-6 w-full h-full flex flex-col">
      <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-center mb-2 lg:mb-4 text-gray-800">
        Números del Bingo
      </h2>
      <div className="grid grid-cols-19 gap-1 lg:gap-2 w-full flex-1 auto-rows-fr">
        {numbers.map((number) => {
          const isDrawn = drawnNumbers.has(number);
          const isLastDrawn = number === lastDrawnNumber;

          return (
            <div
              key={number}
              className={`
                flex items-center justify-center
                text-sm lg:text-lg xl:text-2xl font-bold rounded
                transition-all duration-500
                aspect-square min-h-0
                ${
                  isDrawn
                    ? isLastDrawn
                      ? 'bg-yellow-400 text-black scale-110 shadow-lg animate-pulse'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
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
