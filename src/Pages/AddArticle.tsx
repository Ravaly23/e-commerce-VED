import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { IoMdCloudUpload, IoMdCloseCircle } from "react-icons/io";
import LayoutsLambako from "../layouts/LayoutsLambako";
import api from "@/services/api";
import Bouton from "@/components/ButtonInput";
import { useAuth } from "@/context/AuthContext";
import { Toaster,toast } from "sonner";
interface ProductData {
  title: string;
  category: string;
  brand: string;
  size: string;
  condition: string;
  price: number;
  description: string;
  qte: number;
}

export default function AddArticle() {
  const {user} = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState<ProductData>({
    title: "",
    category: "",
    brand: "",
    size: "",
    condition: "",
    price: 0.0,
    description: "",
    qte: 0,
  });



  // champ obligatoire *
  const isTitleInvalid = formData.title === "";
  const isCategoryInvalid = formData.category === "";
  const isBrandInvalid = formData.brand === "";
  const isSizeInvalid = formData.size === "";
  const isConditionInvalid = formData.condition === "";
  const isQteInvalid = formData.qte <= 0;
  const isPriceInvalid = formData.price <= 0;
  const isDescInvalid = formData.description === "";
  const isImagesInvalid = images.length === 0;

  // Handle Text Inputs
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Multi-Image Upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages]);
      e.target.value = ""; // Clear input for re-selection
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("nom", formData.title);
    data.append("category", formData.category);
    data.append("quantite", formData.qte.toString());
    data.append("taille", formData.size);
    data.append("marque", formData.brand);
    data.append("condition", formData.condition);
    data.append("id_vendeur", user?.id ?? "");
    data.append("description", formData.description);
    data.append("prix", formData.price.toString());

    if (images.length > 0) {
      images.forEach((file) => {
        data.append("fichiers", file);
      });
      try {
        const post = await api.postForm("article/ajout_article/", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (post.status !== 201) {
          throw new Error("Article non-ajouté");
        }
        console.log(post.data);
      } catch (error: any) {
        //les status autres que 200  sont géré ici
        const erreur = error.response.data;
        console.log(erreur.message);
      }
    } else {
      console.log("Ajouter au moins une image ou video");
    }
  };

  return (
    <LayoutsLambako page="adminSeller">
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-10">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-800">
          Détails de l'article
        </h2>

        {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
        <form action={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="flex text-sm font-semibold text-gray-700 mb-1">
              Nom {isTitleInvalid && <p className="text-red-600 ml-2">*</p>}
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="ex, Vintage Denim Jacket"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
              onChange={handleInputChange}
            />
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex text-sm font-semibold text-gray-700 mb-1">
                Categorie{" "}
                {isCategoryInvalid && <p className="text-red-600 ml-2">*</p>}
              </label>
              <select
                name="category"
                required
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
                onChange={handleInputChange}
              >
                <option value="">Selectionner catégorie</option>
                <option value="pantalon">pantalon</option>
                <option value="short">short</option>
                <option value="tshirt">tshirt</option>
                <option value="débardeur">débardeur</option>
                <option value="chemise">chemise</option>
                <option value="robe">robe</option>
                <option value="jupe">jupe</option>
                <option value="sweat">sweat</option>
                <option value="ensemble">ensemble</option>
                <option value="maillot">maillot</option>
              </select>
            </div>
            <div>
              <label className="flex text-sm font-semibold text-gray-700 mb-1">
                Marque {isBrandInvalid && <p className="text-red-600 ml-2">*</p>}
              </label>
              <input
                type="text"
                name="brand"
                required
                placeholder="ex, Levi's"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Size & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex text-sm font-semibold text-gray-700 mb-1">
                Taille {isSizeInvalid && <p className="text-red-600 ml-2">*</p>}
              </label>
              <select
                name="size"
                required
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
                onChange={handleInputChange}
              >
                <option value="">Selectionner la taille</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
                <option value="2XL">2XL</option>
                <option value="3XL">3XL</option>
                <option value="4XL">4XL</option>
              </select>
            </div>
            <div>
              <label className="flex text-sm font-semibold text-gray-700 mb-1">
                Condition{" "}
                {isConditionInvalid && <p className="text-red-600 ml-2">*</p>}
              </label>
              <select
                name="condition"
                required
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
                onChange={handleInputChange}
              >
                <option value="">Condition de l'article</option>
                <option value="Neuf">Neuf</option>
                <option value="Occasion">Occasion</option>
              </select>
            </div>
          </div>
          {/* Quantity */}
          <div>
            <label className="flex text-sm font-semibold text-gray-700 mb-1">
              Quantité {isQteInvalid && <p className="text-red-600 ml-2">*</p>}
            </label>
            <input
              type="number"
              name="qte"
              required
              placeholder="0"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
              onChange={handleInputChange}
            />
          </div>
          {/* Price */}
          <div>
            <label className="flex text-sm font-semibold text-gray-700 mb-1">
              Prix (MGA) {isPriceInvalid && <p className="text-red-600 ml-2">*</p>}
            </label>
            <input
              type="number"
              name="price"
              placeholder="0.00"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
              onChange={handleInputChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex text-sm font-semibold text-gray-700 mb-1">
              Description {isDescInvalid && <p className="text-red-600 ml-2">*</p>}
            </label>
            <textarea
              name="description"
              required
              placeholder="Veuillez faire la description de votre article"
              className="w-full h-32 p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)] resize-none"
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Multi-Image Upload Section */}
          <div className="pt-4">
            <label className="flex text-sm font-semibold text-gray-700 mb-2 font-serif">
              Photos ou Videos de l'article{" "}
              {isImagesInvalid && <p className="text-red-600 ml-2">*</p>}
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all group">
              <IoMdCloudUpload
                size={30}
                className="text-gray-400 group-hover:text-[rgb(32,202,202)]"
              />
              <span className="text-xs text-gray-500 mt-2">
                Cliquer pour ajouter des images(jpeg,png,jpg)/videos(mp4)
              </span>
              <input
                name="file"
                type="file"
                multiple
                className="hidden"
                onChange={handleImageChange}
                accept="image/png,image/jpg,image/jpeg,video/mp4"
              />
            </label>

            {/* Image Preview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map((file, index) => (
                <div
                  key={index}
                  className="relative h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                >
                  {file.name.match(".jpeg") ||
                  file.name.match(".png") ||
                  file.name.match(".jpg") ? (
                    <>
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 text-white bg-black/50 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <IoMdCloseCircle size={20} />
                      </button>
                    </>
                  ) : (
                    <>
                      <video className="w-full h-full object-cover" controls>
                        <source
                          src={URL.createObjectURL(file)}
                          type="video/mp4"
                        />
                      </video>
                      <p>ici</p>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 text-white bg-black/50 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <IoMdCloseCircle size={20} />
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Bouton
            type="submit"
            className="w-full py-4 bg-[rgb(32,202,202)] text-white rounded-xl font-bold hover:bg-[rgb(28,180,180)] transition-all shadow-md active:scale-[0.98] hover:cursor-pointer"
            textBtn="Enregistrer l'article"
            textCours="En cours ..."
          />
        </form>
      </div>
    </LayoutsLambako>
  );
}
