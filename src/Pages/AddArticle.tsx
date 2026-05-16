import { useState, type ChangeEvent, type FormEvent } from "react";
import { IoMdCloudUpload, IoMdCloseCircle } from "react-icons/io";
import LayoutsLambako from "../layouts/LayoutsLambako";
import api from "@/services/api";
import Bouton from "@/components/ButtonInput";

interface ProductData {
  title: string;
  category: string;
  brand: string;
  size: string;
  condition: string;
  price: string;
  description: string;
  qte: number
}

export default function AddArticle() {
  const [images, setImages] = useState<File[]>([]);
  const [formData, setFormData] = useState<ProductData>({
    title: "",
    category: "",
    brand: "",
    size: "",
    condition: "",
    price: "",
    description: "",
    qte: 0,
  });

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
    data.append("nom",formData.title);
    data.append("category",formData.category);
    data.append("quantite",formData.qte.toString());
    data.append("taille",formData.size);
    data.append("marque",formData.brand);
    data.append("condition",formData.condition);
    data.append("id_vendeur","Vendeur00001");
    data.append("description",formData.description);
    data.append("prix",formData.price);

    images.forEach((file)=>{
      data.append("fichiers",file);
    });
    try {
      const post = await api.postForm("article/ajout_article/", data,
      {
        headers: {
           'Content-Type': 'multipart/form-data',
        },
      });
      console.log(post.data);
      // console.log(images);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LayoutsLambako page="adminSeller">
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-10">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-800">
          Item Details
        </h2>

        {/* <form onSubmit={handleSubmit} className="space-y-6"> */}
        <form action={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., Vintage Denim Jacket"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
              onChange={handleInputChange}
            />
          </div>

          {/* Category & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                required
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
                onChange={handleInputChange}
              >
                <option value="">Select category</option>
                <option value="Dress">Dress</option>
                <option value="T-Shirt">T-Shirt</option>
                <option value="HandBag">HandBag</option>
                <option value="Socks">Socks</option>
                <option value="Jacket">Jacket</option>
                <option value="Scarf">Scarf</option>
                <option value="Gloves">Gloves</option>
                <option value="Koat">Koat</option>
                <option value="Cap">Cap</option>
                <option value="Blouse">Blouse</option>
                <option value="Pants">Pants</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Brand *
              </label>
              <input
                type="text"
                name="brand"
                required
                placeholder="e.g., Levi's"
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Size & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Size *
              </label>
              <select
                name="size"
                required
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
                onChange={handleInputChange}
              >
                <option value="">Select size</option>
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
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Condition *
              </label>
              <select
                name="condition"
                required
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
                onChange={handleInputChange}
              >
                <option value="">Select condition</option>
                <option value="new">New with tags</option>
                <option value="good">Very good</option>
                <option value="fair">Satisfactory</option>
              </select>
            </div>
          </div>
          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Quantity
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price (MGA) *
            </label>
            <input
              type="number"
              name="price"
              required
              placeholder="0.00"
              className="w-full p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)]"
              onChange={handleInputChange}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              required
              placeholder="Describe your item, its condition, and any details buyers should know..."
              className="w-full h-32 p-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[rgb(32,202,202)] resize-none"
              onChange={handleInputChange}
            ></textarea>
          </div>

          {/* Multi-Image Upload Section */}
          <div className="pt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-serif">
              Product Photos
            </label>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all group">
              <IoMdCloudUpload
                size={30}
                className="text-gray-400 group-hover:text-[rgb(32,202,202)]"
              />
              <span className="text-xs text-gray-500 mt-2">
                Click to upload multiple images(jpeg,png,jpg)/videos(mp4)
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
          textBtn="Publish Listing"
          textCours="Pending..."
          />
        </form>
      </div>
    </LayoutsLambako>
  );
}
