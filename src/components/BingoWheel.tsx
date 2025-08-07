import React from 'react';

interface BingoWheelProps {
  currentNumber: string;
  isSpinning: boolean;
  onSpin: () => void;
  disabled: boolean;
}

const BingoWheel: React.FC<BingoWheelProps> = ({ currentNumber, isSpinning, onSpin, disabled }) => {
  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Ruleta */}
      <div className="relative">
        <div 
          className={`
            w-64 h-64 md:w-80 md:h-80 rounded-full 
            bg-gradient-to-br from-blue-500 to-blue-700 
            border-8 border-yellow-400 
            flex items-center justify-center
            shadow-2xl relative overflow-hidden
            ${isSpinning ? 'animate-spin-realistic' : ''}
          `}
        >
          {/* Decoraciones de la ruleta */}
          <div className="absolute inset-4 rounded-full border-4 border-yellow-300 opacity-50"></div>
          <div className="absolute inset-8 rounded-full border-2 border-white opacity-30"></div>
          
          {/* Líneas divisorias para efecto visual */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 bg-yellow-300 opacity-60"
              style={{
                height: '30%',
                top: '10%',
                left: '50%',
                transformOrigin: '50% 300%',
                transform: `translateX(-50%) rotate(${i * 30}deg)`
              }}
            />
          ))}
          
          {/* Número central */}
          <div className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg z-10">
            {isSpinning ? '🎲' : currentNumber}
          </div>
        </div>
        
        {/* Indicador superior */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-transparent border-b-red-500"></div>
        </div>
      </div>

      {/* Botón de girar */}
      <button
        onClick={onSpin}
        disabled={disabled || isSpinning}
        className={`
          px-8 py-4 text-xl font-bold rounded-full
          transition-all duration-300 transform
          ${disabled || isSpinning
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 active:scale-95'
          }
          shadow-lg hover:shadow-xl
        `}
      >
        {isSpinning ? '🎰 Girando...' : '🎯 ¡GIRAR RULETA!'}
      </button>
    </div>
  );
};

export default BingoWheel;