from VedBackend.models import Client, Vendeur, Article,Commentaire,Facture,Commande,Fichier



def _get_dernier_numero(model, prefixe, id_field='id'):
    """
    Récupère le dernier numéro utilisé en base pour un modèle donné.
    Cherche l'ID le plus récent qui commence par le prefixe,
    extrait le numéro à la fin, et retourne le suivant.
    """
    # Récupérer tous les IDs qui commencent par le préfixe
    kwargs = {f"{id_field}__startswith": prefixe}
    derniers = model.objects.filter(**kwargs).order_by(f"-{id_field}")

    if not derniers.exists():
        return 1

    dernier_id = getattr(derniers.first(), id_field)

    # Extraire le numéro à la fin de l'identifiant (les 5 derniers caractères)
    try:
        dernier_numero = int(str(dernier_id)[-5:])
        return dernier_numero + 1
    except ValueError:
        return 1


def creationIdentifiantClient(nom="Inconnu"):
    """
    Crée un identifiant unique pour un Client.
    Format : Cl<nom><00001>
    Vérifie en base le dernier numéro utilisé.
    """
    prefixe = f"Client"
    numero = _get_dernier_numero(Client, prefixe)
    identifiant = f"{prefixe}{numero:05d}"

    # Sécurité : vérifier que l'identifiant n'existe pas déjà
    while Client.objects.filter(id=identifiant).exists():
        numero += 1
        identifiant = f"{prefixe}{numero:05d}"

    return identifiant


def creationIdentifiantVendeur(nom="Inconnu"):
    """
    Crée un identifiant unique pour un Vendeur.
    Format : Ve<nom><00001>
    Vérifie en base le dernier numéro utilisé.
    """
    prefixe = f"Vendeur"
    numero = _get_dernier_numero(Vendeur, prefixe)
    identifiant = f"{prefixe}{numero:05d}"

    while Vendeur.objects.filter(id=identifiant).exists():
        numero += 1
        identifiant = f"{prefixe}{numero:05d}"

    return identifiant


def creationIdentifiantArticle(nom="Inconnu"):
    """
    Crée un identifiant unique pour un Article.
    Format : Ar<nom><00001>
    Vérifie en base le dernier numéro utilisé.
    """
    nom = nom.replace(" ", "")
    prefixe = f"Article"
    numero = _get_dernier_numero(Article, prefixe, id_field='id_article')
    identifiant = f"{prefixe}{numero:05d}"

    while Article.objects.filter(id_article=identifiant).exists():
        numero += 1
        identifiant = f"{prefixe}{numero:05d}"

    return identifiant

def creationIdentifiantCommentaire():
    """
    Crée un identifiant unique pour un Commentaire.
    Format : Commentaire00001
    """

    prefixe = f"Commentaire"
    numero = _get_dernier_numero(Commentaire, prefixe, id_field='id_commentaire')
    identifiant = f"{prefixe}{numero:05d}"

    while Commentaire.objects.filter(id_commentaire=identifiant).exists():
        numero += 1
        identifiant = f"{prefixe}{numero:05d}"

    return identifiant

def creationIdentifiantFacture():
    """
    Crée un identifiant unique pour une Facture.
    Format : Facture00001
    """
  
    prefixe = f"Facture"
    numero = _get_dernier_numero(Facture, prefixe, id_field='id_facture')
    identifiant = f"{prefixe}{numero:05d}"

    while Facture.objects.filter(id_facture=identifiant).exists():
        numero += 1
        identifiant = f"{prefixe}{numero:05d}"

    return identifiant


def creationIdentifiantCommande():
    """
    Crée un identifiant unique pour une Commande.
    Format : Commande00001
    """
   
    prefixe = f"Commande"
    numero = _get_dernier_numero(Commande, prefixe, id_field='id_commande')
    identifiant = f"{prefixe}{numero:05d}"

    while Commande.objects.filter(id_commande=identifiant).exists():
        numero += 1
        identifiant = f"{prefixe}{numero:05d}"

    return identifiant


def creationIdentifiantFichier():
    """
    Crée un identifiant unique pour un Fichier.
    Format : Fichier00001
    """
  
    prefixe = f"Fichier"
    numero = _get_dernier_numero(Fichier, prefixe, id_field='id_fichier')
    identifiant = f"{prefixe}{numero:05d}"

    while Fichier.objects.filter(id_fichier=identifiant).exists():
        numero += 1
        identifiant = f"{prefixe}{numero:05d}"

    return identifiant
