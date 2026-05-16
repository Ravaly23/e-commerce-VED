import axios from "axios";
import { useState } from "react";
import api from "@/services/api";

interface ProductData {
  description?: string;
  fichier?: File | null;
}
const Testes = () => {
  const [formData, setFormData] = useState<ProductData>({
    description: "",
    fichier: null,
  });
  const [axiosForm,setAxios] = useState(null);
  async function subtmittingFile(formData: FormData) {
    const data = {
      description: formData.get("description") as string,
      fichier: formData.get("fichier") as File,
    };
    setFormData(data);
    const x = await api.postForm("http://localhost:8000/api/article/ajout_article/",data);
    // setAxios(x);
    console.log(x);
  }
  return (
    <form action={subtmittingFile}>
      {/* { valeur === "" ? "en attente" : valeur} */}
      <input type="text" name="description" id="" />
      <input type="file" name="fichier" id="" />
      <input type="submit" value="Envoyer" />
      {formData && <p>{formData.fichier?.name}</p>}
    </form>
  );
};

export default Testes;
