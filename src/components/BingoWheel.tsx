import React from 'react';
import { Dices } from 'lucide-react';

interface BingoWheelProps {
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
    <div className="flex flex-col items-center space-y-6 w-full max-w-sm mx-auto p-20">
      {/* Número actual */}
      <div className="bg-white rounded-full w-40 h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 flex items-center justify-center shadow-2xl border-4 border-yellow-400">
        <div className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-800">
          {isSpinning ? (
            <Dices className="w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 animate-spin text-blue-600" />
          ) : (
            currentNumber
          )}
        </div>
      </div>

      {/* Botones de modalidades */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {bingoModes.map((mode) => {
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => selectMode(mode.id)}
              className={`
                px-4 py-3 text-base lg:text-lg font-bold rounded-lg
                transition-all duration-300 transform hover:scale-105 active:scale-95
                shadow-lg hover:shadow-xl text-white
                bg-gradient-to-r ${isActive ? mode.activeColor : mode.color}
                ${!isActive ? 'opacity-60' : 'opacity-100'}
                ${isActive ? 'ring-4 ring-yellow-400 ring-opacity-50' : ''}
              `}
            >
              {isActive ? '✓ ' : ''}{mode.label}
            </button>
          );
        })}
      </div>

      {/* Botón de girar */}
      <button
        onClick={onSpin}
        disabled={disabled || isSpinning}
        className={`w-full
          px-8 py-4 text-xl lg:text-2xl font-bold rounded-full
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