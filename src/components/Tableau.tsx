interface tabProps{
  children?: React.ReactNode
}

export default function Tableau({children}:tabProps) {
  return (
    <>
      <table className=" table-auto overflow-x-auto md:table-fixed border-b border-gray-400 text-sm md:text-xl">
        <thead className="">
          <tr className="border-b h-10 border-gray-400 md:h-15">
            <th>Products</th>
            <th>Category</th>
            <th>Price</th>
            <th>Views</th>
            <th>Likes</th>
            <th>Condition</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="">
          {children}
        </tbody>
      </table>
    </>
  );
}
