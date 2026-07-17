import api from "@/services/api";

interface InfoAcheteur {
  id: string;
  nom_prenom: string;
  email: string;
  numero_telephone: string;
  adresse: string;
  photo: string | null;
  genre: string;
  user: number;
}

// fonction pour récuperer l'info d'un acheteur dépuis notre BD
export async function recuperationInfoAcheteur(
  id_acheteur: string,
): Promise<InfoAcheteur | null> {
  try {
    const { data, status } = await api.get(
      `article/get_client/?id_client=${id_acheteur}`,
    );

    if (status !== 200) throw new Error(data.message);
    return data.client;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

// fonction pour récuperer nombre de commentaire pour client
export async function recuperationNomresComs(
  id_acheteur: string,
): Promise<number | null> {
  try {
    const { data, status } = await api.get(
      `article/nombre_commentaire_par_client/?id_client=${id_acheteur}`,
    );

    if (status !== 200) throw new Error(data.message);

    return data.nombre_commentaires;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

// fonction pour récuperer nombre de commande pour un client
export async function recuperationNombresCommandes(
  id_acheteur: string,
): Promise<number | null> {
  try {
    const { data, status } = await api.get(
      `article/get_commande_par_client/?id_client=${id_acheteur}`,
    );

    if (status !== 200) throw new Error(data.message);

    return data.commandes.length;
  } catch (error: any) {
    console.error(error.message);
    return null;
  }
}

// fonction pour récuperer nombre des articles dans la favoris pour un client
export async function recuperationNombreArticleFavoris(
  id_acheteur: string,
): Promise<number | null> {
  try {
    const { data, status } = await api.get(
      `article/get_articles_likes/?id_client=${id_acheteur}`,
    );

    if (status !== 200) throw new Error(data.message);

    return data.articles.length;
  } catch (error: any) {
    console.error(error.response.data.message);
    return null;
  }
}

// fonction pour modifier une information pour un utilisateur
export async function modificationInformation(
  information: any,
  id_utilisateur: string,
) {
  try {
    const { data, status } = await api.put(
      `article/update_client/${id_utilisateur}/`,
      information,
    );

    if (status !== 200) throw new Error(data.message);

    return data;
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
}

// fonction pour supprimer un compte client
export async function suppressionCompte(
  id_utilisateur: string,
    information: any,
) {
  try {
    const { data, status } = await api.delete(
      `article/delete_client/${id_utilisateur}/`,
      { data: information },
    );

    if (status !== 200) throw new Error(data.message);

    return { status: status, message: data.message };
  } catch (error: any) {
    return {
      status: error.response.status,
      message: error.response.data.message,
    };
  }
}
