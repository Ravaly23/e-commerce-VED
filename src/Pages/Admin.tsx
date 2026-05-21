import LayoutsLambako from "@/layouts/LayoutsLambako";
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
    statusDemande: "Actifs",
    date: "2026-05-20",
    adress: "12 Rue de la Paix, Paris",
    message: "Venait de faire une inscription sur la plateforme."
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Thomas Dubois",
    statusActuel: "Actifs",
    statusDemande: "Mise à niveau",
    date: "2026-05-19",
    adress: "45 Avenue des Ternes, Lyon",
    message: "Demande l'accès au statut de membre Premium."
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Acha Diallo",
    statusActuel: "Bloqués",
    statusDemande: "Actifs",
    date: "2026-05-19",
    adress: "8 Boulevard National, Marseille",
    message: "Mon compte a été bloqué par erreur, je souhaite le réactiver."
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Lucas Morel",
    statusActuel: "En attente",
    statusDemande: "Actifs",
    date: "2026-05-18",
    adress: "22 Rue des Fleurs, Bordeaux",
    message: "Venait de faire une inscription via l'application mobile."
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Chloé Bernard",
    statusActuel: "Actifs",
    statusDemande: "Changement d'adresse",
    date: "2026-05-18",
    adress: "77 Rue de la Liberté, Lille",
    message: "Je viens de déménager, merci de valider ma nouvelle adresse."
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Jean-Pierre Ndoye",
    statusActuel: "Actifs",
    statusDemande: "Actifs",
    date: "2026-05-17",
    adress: "3 Avenue du Peuple, Dakar",
    message: "Je souhaite fermer mon compte définitivement."
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Sarah Connor",
    statusActuel: "Bloqués",
    statusDemande: "Actifs",
    date: "2026-05-16",
    adress: "504 Cyberdyne Road, Los Angeles",
    message: "Demande de vérification humaine suite à une détection suspecte."
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Yuki Tanaka",
    statusActuel: "En attente",
    statusDemande: "Actifs",
    date: "2026-05-15",
    adress: "1-2 Shibuya, Tokyo",
    message: "Venait de faire une inscription pour l'offre entreprise."
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Emma Watson",
    statusActuel: "Actifs",
    statusDemande: "Certification",
    date: "2026-05-14",
    adress: "42 High Street, Oxford",
    message: "Demande de badge de profil vérifié avec pièces justificatives."
  },
  {
    pdp: "https://dicebear.com",
    nom_prenom: "Marc Antoine",
    statusActuel: "En attente",
    statusDemande: "Actifs",
    date: "2026-05-13",
    adress: "14 Place du Capitole, Toulouse",
    message: "Ancien utilisateur qui souhaite recréer un espace personnel."
  }
];

export function Admin(){
  const btnStyle : string = "border  py-1 px-3 rounded-4xl hover:cursor-pointer";
  const btnNonActive : string = "text-gray-600 bg-white";
  const btnActive : string = "text-white bg-green-800";
  const textBTN = {
    tous: "Tous",
    attente: "En attente",
    actifs: "Actifs",
    bloque: "Bloqués"
  };
  const [statusFiltre,setFiltre] = useState(textBTN.tous);
  const [couleurTous,setCouleurT] = useState(btnActive);
  const [couleurAttente,setCouleurA] = useState(btnNonActive);
  const [couleurActif,setCouleurAc] = useState(btnNonActive);
  const [couleurBloque,setCouleurB] = useState(btnNonActive);
  const [donne,setDonne] = useState<DemandeProps[]>(listeDemandes);
  
  // filtrage
  useEffect(()=>{
    if(statusFiltre === textBTN.tous){
      setDonne(listeDemandes);
    }else{
      setDonne(listeDemandes.filter(x => x.statusActuel===statusFiltre));
    }
  },[statusFiltre]);


  const changeStatusBtn = (btn: React.MouseEvent<HTMLButtonElement>)=>{
    //capture le bouton qui a cliqué ainsi que le texte du bouton avec innerText;
    const text = btn.currentTarget.innerText;
     if(text === textBTN.tous){
      setFiltre(text);
      setCouleurAc(btnNonActive);
      setCouleurA(btnNonActive);
      setCouleurB(btnNonActive);
      setCouleurT(btnActive);
     }else if(text === textBTN.actifs){
      setFiltre(text);
      setCouleurAc(btnActive);
      setCouleurA(btnNonActive);
      setCouleurB(btnNonActive);
      setCouleurT(btnNonActive);
     }
     else if(text === textBTN.attente){
      setFiltre(text);
      setCouleurAc(btnNonActive);
      setCouleurA(btnActive);
      setCouleurB(btnNonActive);
      setCouleurT(btnNonActive);
     }
     else{
      setFiltre(text);
      setCouleurAc(btnNonActive);
      setCouleurA(btnNonActive);
      setCouleurB(btnActive);
      setCouleurT(btnNonActive);
     }
  };
  return (
  <>
    <LayoutsLambako page="">
      <div className="flex flex-col p-5 gap-y-5 w-full justify-between md:flex-row md:gap-y-0 mx-auto md:pt-10 md:pb-10 md:pl-3 md:pr-3 md:w-11/12">
          <BoiteListing Sary={Mga} typeB="Revenue total" valeurB="15 000" size="md:text-2xl"/>
          <BoiteListing Sary={FiUsers} typeB="Utilisateurs actif" valeurB="4 000" size="md:text-2xl"/>
          <BoiteListing Sary={BsBoxSeam} typeB="Annonces en ligne" valeurB="15 000" size="md:text-2xl"/>
          <BoiteListing Sary={BsBoxSeam} typeB="Transaction du mois" valeurB="15 000" size="md:text-2xl"/>
      </div>
      <div className="flex flex-col gap-y-3 md:gap-y-0 md:flex-row md:justify-between mx-auto pl-3 w-11/12 mb-8">
        <div className="flex items-center md:w-4/12 gap-x-2">
           <RiListSettingsLine className="w-5 md:h-7 h-5 md:w-7 text-green-500"/>
           <h1 className="font-bold text-xs md:text-xl">Gestion des status vendeurs</h1>
           <p className=" flex text-xs items-center justify-center w-5 h-5 rounded-3xl bg-red-600 text-white">{donne.length}</p>
        </div>
        <div className="flex pr-3 justify-between  md:gap-x-1">
           <Bouton type="button" textBtn={textBTN.tous} className={`${btnStyle} ${couleurTous}`} onCLickStyle={changeStatusBtn}/>
           <Bouton type="button" textBtn={textBTN.attente} className={`${btnStyle} ${couleurAttente}`} onCLickStyle={changeStatusBtn}/>
           <Bouton type="button" textBtn={textBTN.actifs} className={`${btnStyle} ${couleurActif}`} onCLickStyle={changeStatusBtn}/>
           <Bouton type="button" textBtn={textBTN.bloque} className={`${btnStyle} ${couleurBloque}`} onCLickStyle={changeStatusBtn}/>
        </div>
      </div>
      {
       donne.map(info =>
        (<StatusVendeur 
          pdp={info.pdp} 
          adress={info.adress} 
          date={info.date} 
          message={info.message} 
          statusActuel={info.statusActuel} 
          statusDemande={info.statusDemande}
          nom_prenom={info.nom_prenom}
          />)
      )
      }
    </LayoutsLambako>
  </>
);
}