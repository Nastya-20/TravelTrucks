import axios from "axios";

// Базова URL-адреса для API
const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";  

// Створення екземпляру axios з базовою URL-адресою
const api = axios.create({
  baseURL: BASE_URL,
});

// Функція для отримання всіх кемперів з фільтрацією
export const fetchCampersApi = async (filters) => {
  const { category, location, page } = filters; // Отримуємо фільтри

  // Формуємо запит для отримання фільтрованих даних
  const queryParams = new URLSearchParams();

  if (category) queryParams.append('category', category);
  if (location) queryParams.append('location', location);
  if (page) queryParams.append('page', page);

  try {
    const response = await api.get(`/campers?${queryParams.toString()}`);
    return response.data; // Повертаємо отримані дані
  } catch (error) {
    console.error("Error fetching campers:", error);
    throw error; // Викидаємо помилку для обробки у redux
  }
};

// Функція для отримання деталей кемпера за його ID
export const fetchCamperById = async (id) => {
  try {
    const response = await api.get(`/campers/${id}`);
    console.log("Camper details:", response.data);
    return response.data; // Повертаємо деталі кемпера
  } catch (error) {
    console.error("Error fetching camper by ID:", error);
    throw error; // Викидаємо помилку для обробки у redux
  }
};
// Функція для отримання відгуків за ID кемпера
export const fetchReviewsByCamperId = async (id) => {
  try {
    const response = await api.get(`/campers/${id}`);
    return response.data.reviews; // Повертатимемо лише відгуки
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
export default api;


