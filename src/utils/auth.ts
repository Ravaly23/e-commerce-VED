import { redirect } from "react-router-dom";

export async function protectedLoader() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw redirect("/auth");
  }

  return null;
}