import LayoutsAdmin from "@/layouts/LayoutsAdmin";

const ParametreAdmin = () => {
  return (
    <LayoutsAdmin status="connecte">
      <div>
        <div className="flex flex-col gap-y-3 border-r border-gray-300 w-2/12 pl-3 pt-5">
          <div className="pl-5">
            <h1 className="text-xl md:text-2xl font-bold">Paramètre</h1>
          </div>
          <div className="pl-10 flex flex-col gap-y-2">
            <li className="list-none hover:cursor-pointer hover:text-blue-600">
              <p>Information du compte</p>
            </li>
            <li className="list-none hover:cursor-pointer hover:text-blue-600">
              <p>Parametre du compte</p>
            </li>
          </div>
        </div>
        <div>
            
        </div>
      </div>
    </LayoutsAdmin>
  );
};

export default ParametreAdmin;
