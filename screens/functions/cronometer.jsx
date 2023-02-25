import React, { useState, useEffect } from 'react';

const useCronometro = () => {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSegundos(segundos => segundos + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return segundos;
};

export default useCronometro;