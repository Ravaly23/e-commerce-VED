import { useState, useEffect } from 'react';

export default function Etude() {
  const [secondes, setSecondes] = useState(0);
  
  useEffect(() => {
    // 1. On crée l'intervalle (le travailleur automatique)
    const intervalle = setInterval(() => {
      setSecondes(s => s + 1);
    }, 1000);

    // 2. LA FONCTION DE NETTOYAGE (Crucial !)
    // Elle s'exécute quand le composant est détruit
    return () => clearInterval(intervalle);
  }, []); // [] signifie : démarre seulement au chargement

  return (
    <div>
      {
        (secondes>60) ? <h1>{Math.floor(secondes/60)} minutes</h1> : <h1>Temps écoulé : {secondes} secondes</h1>
      }
      
    </div>
  );
}