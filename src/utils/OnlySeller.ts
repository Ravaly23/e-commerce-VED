import { redirect } from "react-router-dom";

export async function OnlySeller() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    throw redirect("/auth")
  }
  else{
    if(role !== "vendeur"){
    throw redirect("/unAuthorize");
  }
  }
  return null;
}