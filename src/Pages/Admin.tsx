import LayoutsAdmin from "@/layouts/LayoutsAdmin";
import { FiUsers } from "react-icons/fi";
import { BsBoxSeam } from "react-icons/bs";
import BoiteListing from "@/components/BoiteListing";
import { Mga } from "@/components/icon/Mga";
import { RiListSettingsLine } from "react-icons/ri";
import Bouton from "@/components/ButtonInput";
import { useEffect, useState } from "react";
import StatusVendeur from "@/components/DetailsStatusVendeur";

interface DemandeProps {
  pdp?: string; // photo de la personne
  nom_prenom?: string;
  statusActuel?: string; // status entre En attente, Actifs, ou Bloqués
  statusDemande?: string;
  date?: string;
  adress?: string;
  message?: string; // message adressé à l'admin ex : venait de faire une inscription
}

const listeDemandes: DemandeProps[] = [
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marie Julie",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-20",
    adress: "12 Rue de la Paix, Paris",
    message: "Venait de faire une inscription sur la plateforme.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Thomas Dubois",
    statusActuel: "Actif",
    statusDemande: "Mise à niveau",
    date: "2026-05-19",
    adress: "45 Avenue des Ternes, Lyon",
    message: "Demande l'accès au statut de membre Premium.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Acha Diallo",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-19",
    adress: "8 Boulevard National, Marseille",
    message: "Mon compte a été bloqué par erreur, je souhaite le réactiver.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Lucas Morel",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-18",
    adress: "22 Rue des Fleurs, Bordeaux",
    message: "Venait de faire une inscription via l'application mobile.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Chloé Bernard",
    statusActuel: "Actif",
    statusDemande: "Changement d'adresse",
    date: "2026-05-18",
    adress: "77 Rue de la Liberté, Lille",
    message: "Je viens de déménager, merci de valider ma nouvelle adresse.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Jean-Pierre Ndoye",
    statusActuel: "Actif",
    statusDemande: "Actif",
    date: "2026-05-17",
    adress: "3 Avenue du Peuple, Dakar",
    message: "Je souhaite fermer mon compte définitivement.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Sarah Connor",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-16",
    adress: "504 Cyberdyne Road, Los Angeles",
    message: "Demande de vérification humaine suite à une détection suspecte.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Yuki Tanaka",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-15",
    adress: "1-2 Shibuya, Tokyo",
    message: "Venait de faire une inscription pour l'offre entreprise.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Emma Watson",
    statusActuel: "Actif",
    statusDemande: "Certification",
    date: "2026-05-14",
    adress: "42 High Street, Oxford",
    message: "Demande de badge de profil vérifié avec pièces justificatives.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marc Antoine",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-13",
    adress: "14 Place du Capitole, Toulouse",
    message: "Ancien utilisateur qui souhaite recréer un espace personnel.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marie Julie",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-20",
    adress: "12 Rue de la Paix, Paris",
    message: "Venait de faire une inscription sur la plateforme.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Thomas Dubois",
    statusActuel: "Actif",
    statusDemande: "Mise à niveau",
    date: "2026-05-19",
    adress: "45 Avenue des Ternes, Lyon",
    message: "Demande l'accès au statut de membre Premium.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Acha Diallo",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-19",
    adress: "8 Boulevard National, Marseille",
    message: "Mon compte a été bloqué par erreur, je souhaite le réactiver.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Lucas Morel",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-18",
    adress: "22 Rue des Fleurs, Bordeaux",
    message: "Venait de faire une inscription via l'application mobile.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Chloé Bernard",
    statusActuel: "Actif",
    statusDemande: "Changement d'adresse",
    date: "2026-05-18",
    adress: "77 Rue de la Liberté, Lille",
    message: "Je viens de déménager, merci de valider ma nouvelle adresse.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Jean-Pierre Ndoye",
    statusActuel: "Actif",
    statusDemande: "Actif",
    date: "2026-05-17",
    adress: "3 Avenue du Peuple, Dakar",
    message: "Je souhaite fermer mon compte définitivement.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Sarah Connor",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-16",
    adress: "504 Cyberdyne Road, Los Angeles",
    message: "Demande de vérification humaine suite à une détection suspecte.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Yuki Tanaka",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-15",
    adress: "1-2 Shibuya, Tokyo",
    message: "Venait de faire une inscription pour l'offre entreprise.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Emma Watson",
    statusActuel: "Actif",
    statusDemande: "Certification",
    date: "2026-05-14",
    adress: "42 High Street, Oxford",
    message: "Demande de badge de profil vérifié avec pièces justificatives.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marc Antoine",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-13",
    adress: "14 Place du Capitole, Toulouse",
    message: "Ancien utilisateur qui souhaite recréer un espace personnel.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Lucas Morel",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-18",
    adress: "22 Rue des Fleurs, Bordeaux",
    message: "Venait de faire une inscription via l'application mobile.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Chloé Bernard",
    statusActuel: "Actif",
    statusDemande: "Changement d'adresse",
    date: "2026-05-18",
    adress: "77 Rue de la Liberté, Lille",
    message: "Je viens de déménager, merci de valider ma nouvelle adresse.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Jean-Pierre Ndoye",
    statusActuel: "Actif",
    statusDemande: "Actif",
    date: "2026-05-17",
    adress: "3 Avenue du Peuple, Dakar",
    message: "Je souhaite fermer mon compte définitivement.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Sarah Connor",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-16",
    adress: "504 Cyberdyne Road, Los Angeles",
    message: "Demande de vérification humaine suite à une détection suspecte.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Yuki Tanaka",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-15",
    adress: "1-2 Shibuya, Tokyo",
    message: "Venait de faire une inscription pour l'offre entreprise.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Emma Watson",
    statusActuel: "Actif",
    statusDemande: "Certification",
    date: "2026-05-14",
    adress: "42 High Street, Oxford",
    message: "Demande de badge de profil vérifié avec pièces justificatives.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marc Antoine",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-13",
    adress: "14 Place du Capitole, Toulouse",
    message: "Ancien utilisateur qui souhaite recréer un espace personnel.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marie Julie",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-20",
    adress: "12 Rue de la Paix, Paris",
    message: "Venait de faire une inscription sur la plateforme.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Thomas Dubois",
    statusActuel: "Actif",
    statusDemande: "Mise à niveau",
    date: "2026-05-19",
    adress: "45 Avenue des Ternes, Lyon",
    message: "Demande l'accès au statut de membre Premium.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Acha Diallo",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-19",
    adress: "8 Boulevard National, Marseille",
    message: "Mon compte a été bloqué par erreur, je souhaite le réactiver.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Lucas Morel",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-18",
    adress: "22 Rue des Fleurs, Bordeaux",
    message: "Venait de faire une inscription via l'application mobile.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Chloé Bernard",
    statusActuel: "Actif",
    statusDemande: "Changement d'adresse",
    date: "2026-05-18",
    adress: "77 Rue de la Liberté, Lille",
    message: "Je viens de déménager, merci de valider ma nouvelle adresse.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Jean-Pierre Ndoye",
    statusActuel: "Actif",
    statusDemande: "Actif",
    date: "2026-05-17",
    adress: "3 Avenue du Peuple, Dakar",
    message: "Je souhaite fermer mon compte définitivement.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Sarah Connor",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-16",
    adress: "504 Cyberdyne Road, Los Angeles",
    message: "Demande de vérification humaine suite à une détection suspecte.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Yuki Tanaka",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-15",
    adress: "1-2 Shibuya, Tokyo",
    message: "Venait de faire une inscription pour l'offre entreprise.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Emma Watson",
    statusActuel: "Actif",
    statusDemande: "Certification",
    date: "2026-05-14",
    adress: "42 High Street, Oxford",
    message: "Demande de badge de profil vérifié avec pièces justificatives.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marc Antoine",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-13",
    adress: "14 Place du Capitole, Toulouse",
    message: "Ancien utilisateur qui souhaite recréer un espace personnel.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Lucas Morel",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-18",
    adress: "22 Rue des Fleurs, Bordeaux",
    message: "Venait de faire une inscription via l'application mobile.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Chloé Bernard",
    statusActuel: "Actif",
    statusDemande: "Changement d'adresse",
    date: "2026-05-18",
    adress: "77 Rue de la Liberté, Lille",
    message: "Je viens de déménager, merci de valider ma nouvelle adresse.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Jean-Pierre Ndoye",
    statusActuel: "Actif",
    statusDemande: "Actif",
    date: "2026-05-17",
    adress: "3 Avenue du Peuple, Dakar",
    message: "Je souhaite fermer mon compte définitivement.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Sarah Connor",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-16",
    adress: "504 Cyberdyne Road, Los Angeles",
    message: "Demande de vérification humaine suite à une détection suspecte.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Yuki Tanaka",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-15",
    adress: "1-2 Shibuya, Tokyo",
    message: "Venait de faire une inscription pour l'offre entreprise.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Emma Watson",
    statusActuel: "Actif",
    statusDemande: "Certification",
    date: "2026-05-14",
    adress: "42 High Street, Oxford",
    message: "Demande de badge de profil vérifié avec pièces justificatives.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marc Antoine",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-13",
    adress: "14 Place du Capitole, Toulouse",
    message: "Ancien utilisateur qui souhaite recréer un espace personnel.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marie Julie",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-20",
    adress: "12 Rue de la Paix, Paris",
    message: "Venait de faire une inscription sur la plateforme.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Thomas Dubois",
    statusActuel: "Actif",
    statusDemande: "Mise à niveau",
    date: "2026-05-19",
    adress: "45 Avenue des Ternes, Lyon",
    message: "Demande l'accès au statut de membre Premium.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Acha Diallo",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-19",
    adress: "8 Boulevard National, Marseille",
    message: "Mon compte a été bloqué par erreur, je souhaite le réactiver.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Lucas Morel",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-18",
    adress: "22 Rue des Fleurs, Bordeaux",
    message: "Venait de faire une inscription via l'application mobile.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Chloé Bernard",
    statusActuel: "Actif",
    statusDemande: "Changement d'adresse",
    date: "2026-05-18",
    adress: "77 Rue de la Liberté, Lille",
    message: "Je viens de déménager, merci de valider ma nouvelle adresse.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Jean-Pierre Ndoye",
    statusActuel: "Actif",
    statusDemande: "Actif",
    date: "2026-05-17",
    adress: "3 Avenue du Peuple, Dakar",
    message: "Je souhaite fermer mon compte définitivement.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Sarah Connor",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-16",
    adress: "504 Cyberdyne Road, Los Angeles",
    message: "Demande de vérification humaine suite à une détection suspecte.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Yuki Tanaka",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-15",
    adress: "1-2 Shibuya, Tokyo",
    message: "Venait de faire une inscription pour l'offre entreprise.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Emma Watson",
    statusActuel: "Actif",
    statusDemande: "Certification",
    date: "2026-05-14",
    adress: "42 High Street, Oxford",
    message: "Demande de badge de profil vérifié avec pièces justificatives.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marc Antoine",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-13",
    adress: "14 Place du Capitole, Toulouse",
    message: "Ancien utilisateur qui souhaite recréer un espace personnel.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Lucas Morel",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-18",
    adress: "22 Rue des Fleurs, Bordeaux",
    message: "Venait de faire une inscription via l'application mobile.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Chloé Bernard",
    statusActuel: "Actif",
    statusDemande: "Changement d'adresse",
    date: "2026-05-18",
    adress: "77 Rue de la Liberté, Lille",
    message: "Je viens de déménager, merci de valider ma nouvelle adresse.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Jean-Pierre Ndoye",
    statusActuel: "Actif",
    statusDemande: "Actif",
    date: "2026-05-17",
    adress: "3 Avenue du Peuple, Dakar",
    message: "Je souhaite fermer mon compte définitivement.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Sarah Connor",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-16",
    adress: "504 Cyberdyne Road, Los Angeles",
    message: "Demande de vérification humaine suite à une détection suspecte.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Yuki Tanaka",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-15",
    adress: "1-2 Shibuya, Tokyo",
    message: "Venait de faire une inscription pour l'offre entreprise.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Emma Watson",
    statusActuel: "Actif",
    statusDemande: "Certification",
    date: "2026-05-14",
    adress: "42 High Street, Oxford",
    message: "Demande de badge de profil vérifié avec pièces justificatives.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marc Antoine",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-13",
    adress: "14 Place du Capitole, Toulouse",
    message: "Ancien utilisateur qui souhaite recréer un espace personnel.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marie Julie",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-20",
    adress: "12 Rue de la Paix, Paris",
    message: "Venait de faire une inscription sur la plateforme.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Thomas Dubois",
    statusActuel: "Actif",
    statusDemande: "Mise à niveau",
    date: "2026-05-19",
    adress: "45 Avenue des Ternes, Lyon",
    message: "Demande l'accès au statut de membre Premium.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Acha Diallo",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-19",
    adress: "8 Boulevard National, Marseille",
    message: "Mon compte a été bloqué par erreur, je souhaite le réactiver.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Lucas Morel",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-18",
    adress: "22 Rue des Fleurs, Bordeaux",
    message: "Venait de faire une inscription via l'application mobile.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Chloé Bernard",
    statusActuel: "Actif",
    statusDemande: "Changement d'adresse",
    date: "2026-05-18",
    adress: "77 Rue de la Liberté, Lille",
    message: "Je viens de déménager, merci de valider ma nouvelle adresse.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Jean-Pierre Ndoye",
    statusActuel: "Actif",
    statusDemande: "Actif",
    date: "2026-05-17",
    adress: "3 Avenue du Peuple, Dakar",
    message: "Je souhaite fermer mon compte définitivement.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Sarah Connor",
    statusActuel: "Bloqué",
    statusDemande: "Actif",
    date: "2026-05-16",
    adress: "504 Cyberdyne Road, Los Angeles",
    message: "Demande de vérification humaine suite à une détection suspecte.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Yuki Tanaka",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-15",
    adress: "1-2 Shibuya, Tokyo",
    message: "Venait de faire une inscription pour l'offre entreprise.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Emma Watson",
    statusActuel: "Actif",
    statusDemande: "Certification",
    date: "2026-05-14",
    adress: "42 High Street, Oxford",
    message: "Demande de badge de profil vérifié avec pièces justificatives.",
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marc Antoine",
    statusActuel: "En attente",
    statusDemande: "Actif",
    date: "2026-05-13",
    adress: "14 Place du Capitole, Toulouse",
    message: "Ancien utilisateur qui souhaite recréer un espace personnel.",
  },
];

export function Admin() {
  const btnStyle: string = "border  py-1 px-3 rounded-4xl hover:cursor-pointer";
  const btnNonActive: string = "text-gray-600 bg-white";
  const btnActive: string = "text-white bg-green-800";
  const textBTN = {
    tous: "Tous",
    attente: "En attente",
    actifs: "Actif",
    bloque: "Bloqué",
  };
  const [statusFiltre, setFiltre] = useState(textBTN.tous);
  const [couleurTous, setCouleurT] = useState(btnActive);
  const [couleurAttente, setCouleurA] = useState(btnNonActive);
  const [couleurActif, setCouleurAc] = useState(btnNonActive);
  const [couleurBloque, setCouleurB] = useState(btnNonActive);
  const [search, setSearch] = useState("");
  // const donne : DemandeProps[] = (statusFiltre !== textBTN.tous ? listeDemandes.filter(x => x.statusActuel===statusFiltre)  : listeDemandes);
  const donne: DemandeProps[] = listeDemandes
    // 1. Premier filtre : Le Statut
    .filter(
      (x) => statusFiltre === textBTN.tous || x.statusActuel === statusFiltre,
    )
    // 2. Deuxième filtre : La recherche textuelle (si 'search' n'est pas vide)
    .filter((x) => {
      if (!search || search.trim() === "") return true; // Si pas de recherche, on garde tout

      // On transforme le nom en chaîne (vide si undefined) AVANT de chercher dedans
      const nomNormalise = x.nom_prenom?.toLowerCase() ?? "";
      const rechercheNormalisee = search.toLowerCase();

      return nomNormalise.includes(rechercheNormalisee);
    });

  // AJOUT : States pour la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  //AJOUT : Réinitialiser la page à 1 si le filtre ou la recherche change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFiltre, search]);

  const changeStatusBtn = (btn: React.MouseEvent<HTMLButtonElement>) => {
    //capture le bouton qui a cliqué ainsi que le texte du bouton avec innerText;
    const text = btn.currentTarget.innerText;
    if (text === textBTN.tous) {
      setFiltre(text);
      setCouleurAc(btnNonActive);
      setCouleurA(btnNonActive);
      setCouleurB(btnNonActive);
      setCouleurT(btnActive);
    } else if (text === textBTN.actifs) {
      setFiltre(text);
      setCouleurAc(btnActive);
      setCouleurA(btnNonActive);
      setCouleurB(btnNonActive);
      setCouleurT(btnNonActive);
    } else if (text === textBTN.attente) {
      setFiltre(text);
      setCouleurAc(btnNonActive);
      setCouleurA(btnActive);
      setCouleurB(btnNonActive);
      setCouleurT(btnNonActive);
    } else {
      setFiltre(text);
      setCouleurAc(btnNonActive);
      setCouleurA(btnNonActive);
      setCouleurB(btnActive);
      setCouleurT(btnNonActive);
    }
  };

  // Calcul des index pour découper le tableau (Pagination)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // C'est ce tableau 'currentItems' contenant max 10 éléments qu'on va mapper !
  const currentItems = donne.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(donne.length / itemsPerPage);

  return (
    <>
      <LayoutsAdmin status="connecte" onSearch={setSearch}>
        <div className="flex flex-col p-5 gap-y-5 gap-x-3 w-full justify-between md:flex-row md:gap-y-0 mx-auto md:pt-10 md:pb-10 md:pl-3 md:pr-3 md:w-11/12">
          <BoiteListing
            Sary={Mga}
            typeB="Revenue total"
            valeurB="15 000"
            size="md:text-2xl"
            fondSary="bg-emerald-50"
            textSary="text-emerald-600"
          />
          <BoiteListing
            Sary={FiUsers}
            typeB="Utilisateurs actif"
            valeurB="4 000"
            size="md:text-2xl"
            fondSary="bg-blue-50"
            textSary="text-blue-600"
          />
          <BoiteListing
            Sary={BsBoxSeam}
            typeB="Annonces en ligne"
            valeurB="15 000"
            size="md:text-2xl"
            fondSary="bg-blue-100"
            textSary="text-blue-950"
          />
          <BoiteListing
            Sary={Mga}
            typeB="Transaction du mois"
            valeurB="15 000"
            size="md:text-2xl"
            fondSary="bg-emerald-50"
            textSary="text-emerald-600"
          />
        </div>
        <div className="flex flex-col gap-y-3 md:gap-y-0 md:flex-row md:justify-between mx-auto pl-3 w-11/12 mb-8">
          <div className="flex items-center md:w-4/12 gap-x-2">
            <RiListSettingsLine className="w-5 md:h-7 h-5 md:w-7 text-green-500" />
            <h1 className="font-bold text-xs md:text-xl">
              Gestion des status vendeurs
            </h1>
            <p className=" flex text-xs items-center justify-center w-5 h-5 rounded-3xl bg-red-600 text-white">
              {donne.length}
            </p>
          </div>
          {search === "" ? (
            <div className="flex pr-3 justify-between  md:gap-x-1">
              <Bouton
                type="button"
                textBtn={textBTN.tous}
                className={`${btnStyle} ${couleurTous}`}
                onCLickStyle={changeStatusBtn}
              />
              <Bouton
                type="button"
                textBtn={textBTN.attente}
                className={`${btnStyle} ${couleurAttente}`}
                onCLickStyle={changeStatusBtn}
              />
              <Bouton
                type="button"
                textBtn={textBTN.actifs}
                className={`${btnStyle} ${couleurActif}`}
                onCLickStyle={changeStatusBtn}
              />
              <Bouton
                type="button"
                textBtn={textBTN.bloque}
                className={`${btnStyle} ${couleurBloque}`}
                onCLickStyle={changeStatusBtn}
              />
            </div>
          ) : (
            ""
          )}
        </div>
        {/* MODIFICATION : On map maintenant sur 'currentItems' au lieu de 'donne' */}
        {currentItems.length > 0 ? (
          currentItems.map((info, index) => (
            <StatusVendeur
              key={index}
              pdp={info.pdp}
              adress={info.adress}
              date={info.date}
              message={info.message}
              statusActuel={info.statusActuel}
              statusDemande={info.statusDemande}
              nom_prenom={info.nom_prenom}
            />
          ))
        ) : (
          <div className="text-center py-10 text-gray-500 text-sm">
            Aucun vendeur n'est trouvé
          </div>
        )}

        {/* AJOUT : Barre de contrôle de la pagination (Style Vinted) */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-x-2 my-8 w-11/12 mx-auto">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Précédent
            </button>

            <div className="flex gap-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-md text-sm font-semibold transition-all ${
                      currentPage === page
                        ? "bg-[#09b1ba] text-white"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-md border border-gray-200 text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Suivant
            </button>
          </div>
        )}
      </LayoutsAdmin>
    </>
  );
}
