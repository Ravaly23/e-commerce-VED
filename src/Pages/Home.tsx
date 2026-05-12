import { useState} from "react"
import Article from "../components/Article"
import Fieldset from "../components/Fieldset";
import formatPrice from "@/utils/formatPrice";

export default function Home() {
    const articleTab = [
        {
            id: 1,
            imagePrincipale: '/src/assets/tee-shirt.jfif',
            imageSeller: '/src/assets/tee-shirt.jfif',
            nameSeller: 'Sarah',
            nameArticle: 'Tee-shirt',
            taille: 'M',
            marque: 'Gucci',
            prix: 2000,
            nombreLike: 42,
        },
        {
            id: 2,
            imagePrincipale: '/src/assets/tee-shirt.jfif',
            imageSeller: '/src/assets/tee-shirt.jfif',
            nameSeller: 'Sarah',
            nameArticle: 'Tee-shirt',
            taille: 'M',
            marque: 'Gucci',
            prix: 4000,
            nombreLike: 42,
        },
        {
            id: 3,
            imagePrincipale: '/src/assets/tee-shirt.jfif',
            imageSeller: '/src/assets/tee-shirt.jfif',
            nameSeller: 'Sarah',
            nameArticle: 'Tee-shirt',
            taille: 'M',
            marque: 'Gucci',
            prix: 20000,
            nombreLike: 100,
        },
        {
            id: 4,
            imagePrincipale: '/src/assets/tee-shirt.jfif',
            imageSeller: '/src/assets/tee-shirt.jfif',
            nameSeller: 'Sarah',
            nameArticle: 'Tee-shirt',
            taille: 'M',
            marque: 'Gucci',
            prix: 20000,
            nombreLike: 100,
        },
        {
            id: 5,
            imagePrincipale: '/src/assets/tee-shirt.jfif',
            imageSeller: '/src/assets/tee-shirt.jfif',
            nameSeller: 'Sarah',
            nameArticle: 'Tee-shirt',
            taille: 'M',
            marque: 'Gucci',
            prix: 20000,
            nombreLike: 100,
        },
        {
            id: 6,
            imagePrincipale: '/src/assets/tee-shirt.jfif',
            imageSeller: '/src/assets/tee-shirt.jfif',
            nameSeller: 'Sarah',
            nameArticle: 'Tee-shirt',
            taille: 'M',
            marque: 'Gucci',
            prix: 20000,
            nombreLike: 100,
        }
    ]
    const maxPrice = Math.max(...articleTab.map(a => a.prix));
    const minPrice = Math.min(...articleTab.map(a => a.prix));
    const [price, setPrice] = useState([minPrice, maxPrice])


    const category: string[] = ["All Items", "Dresses", "Jackets & Coats", "Jeans", "Shoes", "T-Shirts", "Knitwear"]
    const size: string[] = ["All Size", "XS", "S", "M", "L", "XL"]
    const condition: string[] = ["All conditions", "New with tags", "Like New", "Very Good", "Good"]
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 bg-[#F9FAFB]">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                <aside className="hidden lg:block border border-gray-200 rounded-xl p-4 w-64">
                    <form className="space-y-6">
                        <Fieldset
                            titre="Category"
                            type="radio"
                            element={category}
                        />

                        <Fieldset
                            titre={`Price Range : ${formatPrice(price[0])} - ${formatPrice(price[1])}`}
                            type="range"
                            price={price}
                            maxPrice={maxPrice}
                            onValueChange={(value: number[]) => setPrice(value)}
                        />
                        <Fieldset
                            titre="Size"
                            type="radio"
                            element={size}
                        />
                        <Fieldset
                            titre="Condition"
                            type="radio"
                            element={condition}
                        />
                    </form>
                </aside>
                <main className="">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {
                            articleTab.map((item) =>
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
                            )
                        }
                    </div>
                </main>
            </div>
        </div>

    )
}

