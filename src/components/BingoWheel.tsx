import React from 'react';
import { Dices } from 'lucide-react';

interface BingoWheelProps {
  key={resetVersion}
  currentNumber: string;
  isSpinning: boolean;
  onSpin: () => void;
  disabled: boolean;
}

interface BingoMode {
  id: string;
  label: string;
  color: string;
  activeColor: string;
}
const BingoWheel: React.FC<BingoWheelProps> = ({ currentNumber, isSpinning, onSpin, disabled }) => {
  const [activeMode, setActiveMode] = React.useState<string | null>(null);

  const bingoModes: BingoMode[] = [
    { id: 'horizontal', label: 'Línea Horizontal', color: 'from-blue-500 to-blue-600', activeColor: 'from-blue-700 to-blue-800' },
    { id: 'vertical', label: 'Línea Vertical', color: 'from-green-500 to-green-600', activeColor: 'from-green-700 to-green-800' },
    { id: 'terna', label: 'Terna', color: 'from-purple-500 to-purple-600', activeColor: 'from-purple-700 to-purple-800' },
    { id: 'bingo', label: 'Bingo', color: 'from-red-500 to-red-600', activeColor: 'from-red-700 to-red-800' }
  ];

  const selectMode = (modeId: string) => {
    setActiveMode(prev => prev === modeId ? null : modeId);
  };
  return (
    <div className="flex flex-col items-center space-y-3 lg:space-y-6 w-full max-w-sm mx-auto">
      {/* Número actual */}
      <div className="bg-white rounded-full w-32 h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 flex items-center justify-center shadow-2xl border-4 border-yellow-400">
        <div className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800">
          {isSpinning ? (
            <Dices className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 animate-spin text-blue-600" />
          ) : (
            currentNumber
          )}
        </div>
      </div>

      {/* Botones de modalidades */}
      <div className="grid grid-cols-2 gap-2 lg:gap-3 w-full">
        {bingoModes.map((mode) => {
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => selectMode(mode.id)}
              className={`
                px-2 lg:px-4 py-2 lg:py-3 text-sm lg:text-base font-bold rounded-lg
                transition-all duration-300 transform hover:scale-105 active:scale-95
                shadow-lg hover:shadow-xl text-white
                bg-gradient-to-r ${isActive ? mode.activeColor : mode.color}
                ${!isActive ? 'opacity-60' : 'opacity-100'}
                ${isActive ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}
              `}
            >
              <span className="inline-flex items-center gap-2">
                {isActive && <span aria-hidden>✓</span>}
                <span>{mode.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Botón de girar */}
      <button
        onClick={onSpin}
        disabled={disabled || isSpinning}
        className={`w-full
          px-6 lg:px-8 py-3 lg:py-4 text-lg lg:text-xl font-bold rounded-full
          transition-all duration-300 transform
          ${disabled || isSpinning
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 hover:scale-105 active:scale-95'
          }
          shadow-lg hover:shadow-xl
        `}
      >
        {isSpinning ? '🎰 Sorteando...' : '🎯 ¡SORTEAR!'}
      </button>
    </div>
  );
};

export default BingoWheel;