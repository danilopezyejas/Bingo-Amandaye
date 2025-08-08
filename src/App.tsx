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

  const [resetVersion, setResetVersion] = useState(0);

  const handleReset = () => {
    if (drawnCount === 0) {
      reset();
      setResetVersion(v => v + 1);
      return;
    }

    const confirmed = window.confirm(
      `¿Estás seguro de que quieres reiniciar el sorteo?\n\nSe perderán los ${drawnCount} números ya sorteados.`
    );

    if (confirmed) {
      setResetVersion(v => v + 1);
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

  return (
  <div className="flex flex-col h-screen items-stretch bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="flex-shrink-0 bg-white shadow-lg w-full">
        <div className="flex items-center justify-center gap-2 py-2 px-2">
          <img src="/img/logo.png" alt="Bingo izquierda" className="h-14 md:h-20" />
          <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none py-6 text-center">
            Bingo Amandayé
          </h1>
          <img src="/img/logo.png" alt="Bingo derecha" className="h-14 md:h-20" />
        </div>
      </header>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-16 py-12 rounded-3xl shadow-2xl animate-pulse">
            <span className="text-4xl md:text-7xl font-extrabold">
              ¡Salió el número:{' '}
              <span className="text-yellow-300">{lastDrawnNumber}</span>!
            </span>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col lg:flex-row items-stretch gap-2 lg:gap-4 w-full px-2 lg:px-4 py-2 lg:py-4 min-h-0 overflow-hidden">
        <div className="flex flex-col lg:w-1/3 justify-center items-center min-w-[280px]">
          <BingoWheel
            key={resetVersion}
            currentNumber={currentNumber}
            isSpinning={isSpinning}
            onSpin={spin}
            disabled={isGameComplete}
          />
        </div>
        <div className="flex flex-col lg:w-2/3 justify-center min-w-0">
          <NumberGrid
            drawnNumbers={drawnNumbers}
            lastDrawnNumber={lastDrawnNumber}
          />
          <div className="mt-1 lg:mt-2 w-full flex justify-end">
            <button
              onClick={handleReset}
              className="w-max px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-sm lg:text-lg"
            >
              🔄 Reiniciar Sorteo
            </button>
            {drawnCount === 76 && (
              <div className="text-center p-2 bg-yellow-100 rounded-lg border-2 border-yellow-400 mt-2">
                <div className="text-xl">🎉</div>
                <div className="text-base font-bold text-yellow-800">¡Sorteo Completado!</div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-inner py-2 px-4 text-center text-xs md:text-base w-full flex-shrink-0">
        <p>
          🎯 Aplicación de Bingo Virtual del Amandayé Ipeguá • Números únicos garantizados
        </p>
      </footer>
    </div>
  );
}

export default App;
