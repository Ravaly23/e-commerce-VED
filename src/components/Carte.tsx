
import { useEffect, useState, useLayoutEffect, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
   BarChart, Bar
} from "recharts";

export default function Carte({ type }: { type: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // On mesure la largeur disponible à l'intérieur de la carte (après padding)
  useLayoutEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        // On récupère la largeur interne réelle du conteneur
        setWidth(containerRef.current.offsetWidth);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Mesure initiale

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    /* RESTAURATION DE TON DESIGN : bg-white, shadow, rounded-xl */
    <div className="mx-auto md:m-5 w-11/12 md:w-full bg-white p-4 rounded-xl shadow min-h-[400px]">
      <h1 className="pb-10 text-xl md:text-2xl font-serif">
        {type === "courbe" ? "Aperçu des ventes" : "Aperçu des revenues"}
      </h1>

      {/* Zone de mesure du graphique */}
      <div ref={containerRef} className="w-full h-[300px]">
        {width > 0 && (
          <>
            {type === "courbe" ? (
              <LineChart width={width} height={300} data={dataLine}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="nbreVentes"
                  stroke="rgb(32, 202, 202)"
                  strokeWidth={3}
                />
              </LineChart>
            ) : (
              <BarChart width={width} height={300} data={dataBart}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="revenu"
                  fill="rgb(32, 202, 202)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </>
        )}
      </div>
    </div>
  );
}


const dataLine = [
  { name: "Jan", nbreVentes: 10 },
  { name: "Fev", nbreVentes: 5 },
  { name: "Mar", nbreVentes: 20 },
  { name: "Avr", nbreVentes: 10 },
  { name: "Mai", nbreVentes: 8 },
  { name: "Ju", nbreVentes: 7 },
];

const dataBart = [
  { name: "Jan", revenu: 10 },
  { name: "Fev", revenu: 5 },
  { name: "Mar", revenu: 20 },
  { name: "Avr", revenu: 10 },
  { name: "Mai", revenu: 8 },
  { name: "Ju", revenu: 7 },
];