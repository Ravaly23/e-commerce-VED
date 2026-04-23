from VedBackend.models import Client, Vendeur, Article


def _get_dernier_numero(model, prefixe):
    """
    Récupère le dernier numéro utilisé en base pour un modèle donné.
    Cherche l'ID le plus récent qui commence par le prefixe,
    extrait le numéro à la fin, et retourne le suivant.
    """
    # Récupérer tous les IDs qui commencent par le préfixe
    derniers = model.objects.filter(pk__startswith=prefixe).order_by('-pk')

    if not derniers.exists():
        return 1

    dernier_id = derniers.first().pk

    # Extraire le numéro à la fin de l'identifiant (les 5 derniers caractères)
    try:
        dernier_numero = int(dernier_id[-5:])
        return dernier_numero + 1
    except ValueError:
        return 1


def creationIdentifiantClient(nom="Inconnu"):
    """
    Crée un identifiant unique pour un Client.
    Format : Cl<nom><00001>
    Vérifie en base le dernier numéro utilisé.
    """
    prefixe = f"Cl{nom}"
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
    prefixe = f"Ve{nom}"
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
    prefixe = f"Ar{nom}"
    numero = _get_dernier_numero(Article, prefixe)
    identifiant = f"{prefixe}{numero:05d}"

    while Article.objects.filter(id_article=identifiant).exists():
        numero += 1
        identifiant = f"{prefixe}{numero:05d}"

    return identifiant
