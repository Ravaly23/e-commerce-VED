import ProfilImage from "../assets/Profil.jpg";
import { FaStar } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";
import Article from "../components/Article";

interface ProfilSeller {
  nom: string;
  note: number;
}

export default function ProfilSeller() {
  const style = {
    backgroundImage: `url(${ProfilImage})`,
  };

  const articleTab = [
    {
      id: 1,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 2000,
      nombreLike: 42,
    },
    {
      id: 2,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 4000,
      nombreLike: 42,
    },
    {
      id: 3,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
    {
      id: 4,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
    {
      id: 5,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
    {
      id: 6,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
    {
      id: 7,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
    {
      id: 8,
      imagePrincipale: "/src/assets/tee-shirt.jfif",
      imageSeller: "/src/assets/tee-shirt.jfif",
      nameSeller: "Sarah",
      nameArticle: "Tee-shirt",
      taille: "M",
      marque: "Gucci",
      prix: 20000,
      nombreLike: 100,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 bg-[#F9FAFB]">
      {/* Section information vendeur */}
      <div className="bg-[#FFFFFF] rounded-xl border border-[#E2E8F0] flex flex-col items-center gap-6 md:flex-row">
        <div
          className="size-32 bg-yellow-500 m-5 rounded-[50%] bg-cover bg-center"
          style={style}
        ></div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl mb-2">RALADSON Dany Eric</h1>
          <div className="mb-4 flex flex-wrap items-center justify-center gap-4 text-gray-600 md:justify-start">
            <div className="flex items-center gap-1">
              <FaStar className="text-yellow-500" /> <p>4.8</p> <p>rating</p>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <AiOutlineProduct /> <p>145</p> <p>Sales</p>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <IoLocationOutline /> <p>Toamasina</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section articel du vendeur */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5  justify-items-center">
        {articleTab.map((item) => (
          <Article
            key={item.id}
            imagePrincipale={item.imagePrincipale}
            imageSeller={item.imageSeller}
            nameSeller={item.nameSeller}
            nameArticle={item.nameArticle}
            taille={item.taille}
            marque={item.marque}
            prix={item.prix}
            nombreLike={item.nombreLike}
          />
        ))}
      </div>
    </div>
  );
}
