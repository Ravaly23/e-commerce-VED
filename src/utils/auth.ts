import { redirect } from "react-router-dom";

export async function protectedLoader() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log(role && role === "vendeur")
  if (!token && !role && role === "vendeur") {
    throw redirect("/auth");
  }

  if(role && role === "vendeur"){
    throw redirect("/auth");
  }
  
  return null;
}
