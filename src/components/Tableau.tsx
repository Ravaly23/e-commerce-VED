interface tabProps {
  children?:React.ReactNode;
}

export default function Tableau({children}:tabProps) {
  return (
    <>
      <table className=" table-auto md:table-fixed border-b border-gray-400 text-sm md:text-xl md:w-11/12 w-full">
        <thead className="">
          <tr className="border-b h-10 border-gray-400 md:h-15">
            <th>Produits</th>
            <th>Categorie</th>
            <th>Prix</th>
            <th>Vues</th>
            <th>J'aime</th>
            <th>Condition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {children}
        </tbody>
      </table>
    </>
  );
}


