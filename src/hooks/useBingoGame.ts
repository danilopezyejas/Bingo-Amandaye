import { useState, useCallback, useRef } from 'react';

export const useBingoGame = () => {
  const [drawnNumbers, setDrawnNumbers] = useState<Set<string>>(new Set());
  const [currentNumber, setCurrentNumber] = useState<string>('00');
  const [lastDrawnNumber, setLastDrawnNumber] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const spinIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const finalNumberTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generar números disponibles
  const getAvailableNumbers = useCallback(() => {
    const allNumbers = Array.from({ length: 76 }, (_, i) => 
      i.toString().padStart(2, '0')
    );
    return allNumbers.filter(num => !drawnNumbers.has(num));
  }, [drawnNumbers]);

  // Girar la ruleta
  const spin = useCallback(() => {
    if (isSpinning) return;
    
    const availableNumbers = getAvailableNumbers();
    if (availableNumbers.length === 0) return;

    setIsSpinning(true);
    setLastDrawnNumber(null);

    // Fase 1: Animación rápida inicial (primeros 1.5 segundos)
    spinIntervalRef.current = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 100);
      const displayNumber = randomIndex.toString().padStart(2, '0');
      setCurrentNumber(displayNumber);
    }, 80);

    // Fase 2: Desaceleración gradual
    setTimeout(() => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }
      
      // Animación más lenta para la desaceleración
      spinIntervalRef.current = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * 76);
        const displayNumber = randomIndex.toString().padStart(2, '0');
        setCurrentNumber(displayNumber);
      }, 200);
    }, 1500);

    // Fase 3: Resultado final
    finalNumberTimeoutRef.current = setTimeout(() => {
      if (spinIntervalRef.current) {
        clearInterval(spinIntervalRef.current);
      }

      // Seleccionar número final de los disponibles
      const randomIndex = Math.floor(Math.random() * availableNumbers.length);
      const finalNumber = availableNumbers[randomIndex];
      
      setCurrentNumber(finalNumber);
      setLastDrawnNumber(finalNumber);
      setDrawnNumbers(prev => new Set([...prev, finalNumber]));
      setIsSpinning(false);
    }, 3000);
  }, [isSpinning, getAvailableNumbers]);

  // Reiniciar el juego
  const reset = useCallback(() => {
    if (spinIntervalRef.current) {
      clearInterval(spinIntervalRef.current);
    }
    if (finalNumberTimeoutRef.current) {
      clearTimeout(finalNumberTimeoutRef.current);
    }
    
    setDrawnNumbers(new Set());
    setCurrentNumber('00');
    setLastDrawnNumber(null);
    setIsSpinning(false);
  }, []);

  // Verificar si el juego está completo
  const isGameComplete = drawnNumbers.size === 76;

  return {
    drawnNumbers,
    currentNumber,
    lastDrawnNumber,
    isSpinning,
    isGameComplete,
    spin,
    reset,
    availableCount: getAvailableNumbers().length,
    drawnCount: drawnNumbers.size
  };
};