


function BarreNavigation(){
  return(
    <>
      <nav className="flex justify-around">
         <div className="md:flex-1">
            <h1 >E-commerce-VED</h1>
         </div>
         <div className="flex md:flex-1 justify-between">
            <li className="list-none flex-1"><a href="" className="no-underline">Home</a></li>
            <li className="list-none flex-1"><a href="" className="no-underline">Shop</a></li>
            <li className="list-none flex-1"><a href="" className="no-underline">About us</a></li>
            <li className="list-none flex-1"><a href="" className="no-underline">Contact us</a></li>
            <li className="list-none flex-1"><a href="" className="no-underline">Blog</a></li>
         </div>
         <div className="flex md:flex-1 justify-between">
            <li className="list-none"><a href="" className="flex-1">Log in</a></li>
            <li className="list-none"><button>Search</button></li>
         </div>
      </nav>
    </>
  )
}

export default BarreNavigation