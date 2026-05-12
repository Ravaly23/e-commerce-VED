//import tee_shirt from '../assets/tee-shirt.jfif'
import { FaRegHeart } from 'react-icons/fa'
import formatPrice from '@/utils/formatPrice'

interface ArticleProps{
    imagePrincipale : string,
    imageSeller : string,
    nameSeller : string,
    nameArticle : string,
    taille : string,
    marque : string,
    prix : number,
    nombreLike : number,
}

export default function Article({imagePrincipale,imageSeller,nameSeller,nameArticle,taille,marque,prix,nombreLike} : ArticleProps) {

    return (
        <div className="relative bg-white w-full xl:w-70 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 overflow-hidden">

            <div className="h-70 overflow-hidden">
                <img
                    src={imagePrincipale}
                    alt="tee-shirt"
                    className="w-full h-full object-fill"
                />
            </div>

            <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            src={imageSeller}
                            alt="profil"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="font-medium text-sm">{nameSeller}</p>
                </div>

                <h2 className="text-lg font-semibold">{nameArticle}</h2>

                <div className="flex gap-2 text-sm text-gray-500 mt-1">
                    <span>{taille}</span>
                    <span>• {marque}</span>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-bold text-green-700">
                        {formatPrice(prix)}
                    </p>
                    <span className="relative right-10 flex justify-between">
                        <FaRegHeart className='text-gray-500' />
                        <p className='absolute -top-1 left-6 text-gray-500'>{nombreLike}</p>
                    </span>
                </div>

                <button className="size-10 bg-white text-white rounded-[50%] text-sm hover:bg-gray-200 transition absolute top-2 right-2 flex items-center justify-center cursor-pointer">
                    <FaRegHeart className='text-black'/>
                </button>
            </div>
        </div>
    )
}