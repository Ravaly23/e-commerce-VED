import type { Item } from "@/components/ArticleCard";
import api from "@/services/api";

// fonction pour récuperer chaque articles favoris d'un utilisateur 
export async function getFavoris(): Promise<Item[]> {

  const dataUser = localStorage.getItem("user") ?? null;

  const user = JSON.parse(dataUser!);

  try {

    const { data, status } = await api.get(
      `article/get_articles_likes/?id_client=${user?.id}`,
    );

    if (status !== 200) throw new Error(data.message);

    return data.articles;

  } catch (error: any) {

    console.error(error.response?.data);

    const itemVide: Item[] = [];
    
    return itemVide;
  }
}