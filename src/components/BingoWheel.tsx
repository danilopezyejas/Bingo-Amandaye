import React from 'react';

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
    <div className="flex flex-col items-center space-y-8">
      {/* Número actual */}
      <div className="bg-white rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-2xl border-4 border-yellow-400">
        <div className="text-4xl md:text-6xl font-bold text-gray-800">
          {isSpinning ? '🎲' : currentNumber}
        </div>
      </div>

      {/* Botones de modalidades */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {bingoModes.map((mode) => {
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => selectMode(mode.id)}
              className={`
                px-4 py-3 text-sm md:text-base font-bold rounded-lg
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