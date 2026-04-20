import LayoutsLambako from "../layouts/LayoutsLambako";


function Accueil() {
  return (
    <>
      <LayoutsLambako page={"accueil"}>
   {/* --- SECTION 1: HERO BANNER --- */}
        <section className="px-10 py-10">
          <div className="bg-gray-100 rounded-3xl p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
            <div className="z-10">
              <p className="text-xl font-semibold">Beats Solo</p>
              <h2 className="text-6xl md:text-8xl font-black uppercase leading-none my-4">
                Wireless <br />
                <span className="text-white drop-shadow-sm">HEADPHONE</span>
              </h2>
              <button className="bg-red-500 text-white px-8 py-3 rounded-full font-bold mt-6">
                Shop By Category
              </button>
            </div>

            {/* Emplacement Photo Casque */}
            <div className="w-full md:w-1/2 h-64 bg-gray-300 rounded-xl flex items-center justify-center text-gray-500 italic">
              Photo Casque Beats (Null)
            </div>

            <div className="absolute bottom-10 right-10 text-right hidden md:block">
              <p className="font-bold">Description</p>
              <p className="text-sm text-gray-400 w-64">
                Experience the best and quality headphones over here, even get
                them at a discount.
              </p>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: CATEGORIES GRID --- */}
        <section className="px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Bloc Noir */}
          <div className="bg-zinc-900 rounded-3xl p-8 h-64 flex flex-col justify-end relative text-white md:col-span-1">
            <div className="z-10">
              <p className="text-gray-400">Enjoy</p>
              <h3 className="text-2xl font-bold mb-4">
                With <br /> EARPHONE
              </h3>
              <button className="bg-red-500 px-6 py-2 rounded-full text-sm">
                Browse
              </button>
            </div>
            <div className="absolute top-4 right-4 w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center">
              Null
            </div>
          </div>

          {/* Bloc Jaune/Vert */}
          <div className="bg-yellow-400 rounded-3xl p-8 h-64 flex flex-col justify-end relative text-white md:col-span-1">
            <div className="z-10">
              <p className="text-white/80">New</p>
              <h3 className="text-2xl font-bold mb-4">
                Smart <br /> WATCH
              </h3>
              <button className="bg-white text-yellow-400 px-6 py-2 rounded-full text-sm font-bold">
                Browse
              </button>
            </div>
            <div className="absolute top-4 right-4 w-32 h-32 bg-yellow-500 rounded-lg flex items-center justify-center">
              Null
            </div>
          </div>

          {/* Bloc Rouge (Large) */}
          <div className="bg-red-500 rounded-3xl p-8 h-64 flex flex-col justify-end relative text-white md:col-span-2">
            <div className="z-10">
              <p className="text-white/80">Quality</p>
              <h3 className="text-2xl font-bold mb-4">
                Device <br /> LAPTOP
              </h3>
              <button className="bg-white text-red-500 px-6 py-2 rounded-full text-sm font-bold">
                Browse
              </button>
            </div>
            <div className="absolute top-4 right-4 w-48 h-48 bg-red-600 rounded-lg flex items-center justify-center">
              Null
            </div>
          </div>

          {/* Ligne du bas de la grille */}
          <div className="bg-gray-200 rounded-3xl p-8 h-64 flex flex-col justify-end relative md:col-span-2">
            <div className="z-10 text-gray-800">
              <p className="text-gray-500">Best</p>
              <h3 className="text-2xl font-bold mb-4">
                Gaming <br /> CONSOLE
              </h3>
              <button className="bg-red-500 text-white px-6 py-2 rounded-full text-sm">
                Browse
              </button>
            </div>
            <div className="absolute top-4 right-4 w-48 h-48 bg-gray-400 rounded-lg flex items-center justify-center text-white">
              Null
            </div>
          </div>

          <div className="bg-green-500 rounded-3xl p-8 h-64 flex flex-col justify-end relative text-white">
            <div className="z-10">
              <p className="text-white/80">New</p>
              <h3 className="text-2xl font-bold mb-4">
                Amazon <br /> SPEAKER
              </h3>
              <button className="bg-white text-green-500 px-6 py-2 rounded-full text-sm font-bold">
                Browse
              </button>
            </div>
            <div className="absolute top-4 right-4 w-32 h-32 bg-green-600 rounded-lg flex items-center justify-center">
              Null
            </div>
          </div>

          <div className="bg-blue-500 rounded-3xl p-8 h-64 flex flex-col justify-end relative text-white">
            <div className="z-10">
              <p className="text-white/80">Play</p>
              <h3 className="text-2xl font-bold mb-4">
                Game <br /> OCULUS
              </h3>
              <button className="bg-white text-blue-500 px-6 py-2 rounded-full text-sm font-bold">
                Browse
              </button>
            </div>
            <div className="absolute top-4 right-4 w-32 h-32 bg-blue-600 rounded-lg flex items-center justify-center">
              Null
            </div>
          </div>
        </section>

        {/* --- SECTION 3: SERVICES (Free shipping, etc) --- */}
        <section className="px-10 py-10 flex flex-wrap justify-between gap-8 border-y border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-bold text-sm">Free shipping</p>
              <p className="text-xs text-gray-400">
                Free Shipping On All Orders
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-bold text-sm">Money Guarantee</p>
              <p className="text-xs text-gray-400">30 Day Money Back</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-bold text-sm">Online Support 24/7</p>
              <p className="text-xs text-gray-400">Technical Support 24/7</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div>
              <p className="font-bold text-sm">Secure Payment</p>
              <p className="text-xs text-gray-400">All Cards Accepted</p>
            </div>
          </div>
        </section>
        {/* --- SECTION 4: BANNER ROUGE (SUMMER SALE) --- */}
        <section className="py-10 px-10">
          <div className="bg-[#f42c37] rounded-[40px] min-h-100 relative overflow-hidden flex items-center p-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8">
              {/* Colonne Gauche : Promo */}
              <div className="text-white z-10">
                <p className="text-xl uppercase tracking-widest mb-2">
                  20% OFF
                </p>
                <h2 className="text-7xl md:text-8xl font-black leading-[0.8] uppercase">
                  FINE <br /> SMILE
                </h2>
                <p className="mt-4 text-sm font-medium">03 May to 13 June</p>
              </div>

              {/* Colonne Centre : Image (Null) */}
              <div className="flex justify-center relative">
                <div className="w-80 h-80 bg-black/10 rounded-full flex items-center justify-center border-2 border-white/20 border-dashed">
                  <span className="text-white/50 italic">Image Casque</span>
                </div>
              </div>

              {/* Colonne Droite : Détails */}
              <div className="text-white md:text-right z-10 space-y-4">
                <p className="text-lg">Beats Solo Air</p>
                <h3 className="text-5xl font-bold leading-tight">
                  Summer sale
                </h3>
                <p className="text-sm opacity-90 max-w-62.5 md:ml-auto">
                  Experience the best and quality headphones over here.
                </p>
                <button className="bg-white text-[#f42c37] px-10 py-3 rounded-full font-bold hover:bg-gray-100 transition-all">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* --- SECTION 7: RECENT NEWS --- */}
        <section className="py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Recent News</h2>
            <p className="text-gray-400 text-sm">
              Get the latest information here!!!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="space-y-4">
                <div className="bg-gray-200 h-56 rounded-3xl flex items-center justify-center text-gray-400 italic">
                  News Image {item}
                </div>
                <p className="text-xs text-gray-400">
                  November 11, 2020 by Blake
                </p>
                <h3 className="text-lg font-bold text-gray-800 leading-tight">
                  How to choose perfect gadgets
                </h3>
                <p className="text-gray-500 text-sm">
                  When you are looking for a new gadget, there are a few things
                  you should keep in mind...
                </p>
              </div>
            ))}
          </div>
        </section>
      </LayoutsLambako> 
    </>
  );
}

export default Accueil;
