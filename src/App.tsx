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

  return (
    <div className="flex flex-col h-screen items-center">
      {/* Header */}
      <header className="flex-shrink-0 bg-white shadow-lg w-full">
        <div className="flex items-center justify-center gap-4 py-2">
          <img
            src="/img/logo.png"
            alt="Bingo izquierda"
            className="h-16 md:h-24"
          />
          <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none py-6">
            Bingo Amandayé
          </h1>
          <img
            src="/img/logo.png"
            alt="Bingo derecha"
            className="h-16 md:h-24"
          />
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
      <main className="flex-1 flex items-stretch gap-8 w-full px-4 min-h-0">
        <div className="flex flex-col flex-1 basis-0 justify-center min-w-[320px] max-w-[500px]">
          {/* Ruleta */}
          <BingoWheel
            currentNumber={currentNumber}
            isSpinning={isSpinning}
            onSpin={spin}
            disabled={isGameComplete}
          />
        </div>
        <div className="flex flex-col flex-1 basis-0 justify-center min-w-0">
          <NumberGrid
            drawnNumbers={drawnNumbers}
            lastDrawnNumber={lastDrawnNumber}
          />

          {/* Botón de reinicio */}
          <div className="mt-4 w-full flex justify-end">
            <button
              onClick={handleReset}
              className="w-max px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 
                         text-white font-bold rounded-lg hover:from-red-600 hover:to-red-700
                         transition-all duration-300 transform hover:scale-105 active:scale-95
                         shadow-lg hover:shadow-xl text-lg"
            >
              🔄 Reiniciar Sorteo
            </button>

            {drawnCount === 76 && (
              <div className="text-center p-4 bg-yellow-100 rounded-lg border-2 border-yellow-400 mt-4">
                <div className="text-2xl">🎉</div>
                <div className="text-lg font-bold text-yellow-800">
                  ¡Sorteo Completado!
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          🎯 Aplicación de Bingo Virtual del Amandayé Ipeguá • Números únicos
          garantizados
        </p>
      </footer>
    </div>
  );
}

export default App;
