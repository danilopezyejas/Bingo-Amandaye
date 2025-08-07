import React, { useEffect, useState } from 'react';
import BingoWheel from './components/BingoWheel';
import NumberGrid from './components/NumberGrid';
import { useBingoGame } from './hooks/useBingoGame';

function App() {
  const {
    drawnNumbers,
    currentNumber,
    lastDrawnNumber,
    isSpinning,
    isGameComplete,
    spin,
    reset,
    drawnCount,
  } = useBingoGame();

  const handleReset = () => {
    if (drawnCount === 0) {
      reset();
      return;
    }

    const confirmed = window.confirm(
      `¿Estás seguro de que quieres reiniciar el sorteo?\n\nSe perderán los ${drawnCount} números ya sorteados.`
    );

    if (confirmed) {
      reset();
    }
  };

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (lastDrawnNumber && !isSpinning) {
      setShowModal(true);
      const timer = setTimeout(() => setShowModal(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [lastDrawnNumber, isSpinning]);
  // ...existing code...
  return (
    <div className="flex flex-col min-h-screen items-center bg-white overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white shadow-lg w-full">
        <div className="flex items-center justify-center gap-2 py-2 px-2 md:gap-4 md:px-8">
          <img src="/img/logo.png" alt="Bingo izquierda" className="h-20 md:h-28" />
          <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none py-2 md:py-6 text-center flex-1">
            Bingo Amandayé
          </h1>
          <img src="/img/logo.png" alt="Bingo derecha" className="h-20 md:h-28" />
        </div>
      </header>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-6 md:px-16 md:py-12 rounded-3xl shadow-2xl animate-pulse">
            <span className="text-2xl md:text-5xl font-extrabold">
              ¡Salió el número:{' '}
              <span className="text-yellow-300">{lastDrawnNumber}</span>!
            </span>
          </div>
        </div>
      )}
      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full px-2 md:px-4 min-h-0">
        <div className="flex flex-col items-center w-full md:w-1/3">
          {/* Ruleta */}
          <BingoWheel
            currentNumber={currentNumber}
            isSpinning={isSpinning}
            onSpin={spin}
            disabled={isGameComplete}
          />
        </div>
        <div className="flex flex-col items-center w-full md:w-2/3">
          <NumberGrid
            drawnNumbers={drawnNumbers}
            lastDrawnNumber={lastDrawnNumber}
          />
          {/* Botón de reinicio */}
          <div className="mt-2 w-full flex justify-end">
            <button
              onClick={handleReset}
              className="w-max px-4 py-2 md:px-6 md:py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-base md:text-lg"
            >
              🔄 Reiniciar Sorteo
            </button>
            {drawnCount === 76 && (
              <div className="text-center p-2 md:p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400 mt-2 md:mt-4">
                <div className="text-lg md:text-2xl">🎉</div>
                <div className="text-sm md:text-lg font-bold text-yellow-800">
                  ¡Sorteo Completado!
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="w-full text-center py-2 md:py-4 bg-white text-gray-700 text-xs md:text-lg">
        🎯 Aplicación de Bingo Virtual del Amandayé Ipeguá • Números únicos garantizados
      </footer>
    </div>
  );
}

export default App;
