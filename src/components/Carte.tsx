import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

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

export default function Carte({ type }: { type: string }) {
  return (
    <div className="mx-auto md:m-5 pb-25 h-[300px] w-11/12 md:w-1/2 bg-white p-4 rounded-xl shadow">
      {type === "courbe" ? (
        <>
          <h1 className="pb-10 text-xl md:text-2xl">Sales Overview</h1>
          <ResponsiveContainer width="90%" height="90%">
            <LineChart data={dataLine}>
              <CartesianGrid strokeDasharray="3 3" />
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
          </ResponsiveContainer>
        </>
      ) : (
        <>
          <h1 className="pb-10 text-xl md:text-2xl">Revenue Overview</h1>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataBart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                type="monotone"
                dataKey="revenu"
                stroke="rgb(32, 202, 202)"
                strokeWidth={3}
                fill="rgb(32, 202, 202)"
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
