import { useState, type ChangeEvent, type FormEvent } from "react";
import { IoMdCloudUpload, IoMdCloseCircle } from "react-icons/io";
import LayoutsLambako from "../layouts/LayoutsLambako";
interface ProductData {
  title: string;
  category: string;
  brand: string;
  size: string;
  condition: string;
  price: string;
  description: string;
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting Product:", { ...formData, images });
    // Add your Laravel/Django API call here
  };

  return (
    <LayoutsLambako page="adminSeller">
      <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-sm border border-gray-100 mt-10">
        <h2 className="text-2xl font-serif font-semibold mb-6 text-gray-800">
          Item Details
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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
                <option value="shoes">Shoes</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
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
                <option value="S">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
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

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Price (USD) *
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
                Click to upload multiple images
              </span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
            </label>

            {/* Image Preview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map((file, index) => (
                <div
                  key={index}
                  className="relative h-24 bg-gray-100 rounded-lg overflow-hidden border border-gray-200"
                >
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
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-[rgb(32,202,202)] text-white rounded-xl font-bold hover:bg-[rgb(28,180,180)] transition-all shadow-md active:scale-[0.98]"
          >
            Publish Listing
          </button>
        </form>
      </div>
    </LayoutsLambako>
  );
}
