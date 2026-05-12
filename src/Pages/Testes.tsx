import axios from "axios";
import { useState } from "react";
import api from "@/services/api";

const Testes = () => {
  const [valeur,setValeur] = useState("");
  async function subtmittingFile(formData :FormData){
      const data = {
        description: formData.get('description'),
        fichier: formData.get('fichier')
      }
      const teste = await axios.postForm("")
  }
  return ( 
    <form action={subtmittingFile}>
        {/* { valeur === "" ? "en attente" : valeur} */}
        <input type="text" name="description" id="" />
        <input type="file" name="fichier" id="" />
        <input type="submit" value="Envoyer" />
    </form>
  );
};

export default Testes;