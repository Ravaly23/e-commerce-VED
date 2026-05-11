import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

// ajoute le token automatique à chaque rêquete

api.interceptors.request.use((config) => {
  // on intercepte la rêquete et on ajoute le token s'il existe
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // on ajoute le token s'il existe
  }

  return config; // on retourne la rêquete modifier
});

api.interceptors.response.use(
  // on intercepte la reponse
  (response) => response, // si status = 200
  async (error) => {
    const originalRequest = error.config;

    // Si 401 (expiré) et qu'on n'a pas déjà tenté un retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        // Appel à l'endpoint de refresh de Django
        // On passe le refresh token dans le BODY 
        const res = await axios.post(
          "http://localhost:8000/api/auth/token/refresh/",
          {
            refresh: refreshToken,
          },
        );

        if (res.status === 200) {
          const newAccessToken = res.data.access;

          // On met à jour le stockage
          localStorage.setItem("token", newAccessToken);

          // On met à jour la requête qui a échoué et on la relance
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Si le refresh échoue (refresh token expiré aussi), on vide tout
        localStorage.clear();
        window.location.href = "/auth";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
