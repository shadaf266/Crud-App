const API_URL = import.meta.env.VITE_API_URL;

async function request(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const getProducts = () => request(API_URL);
export const getProduct = (id) => request(`${API_URL}/${id}`);
export const createProduct = (product) =>
  request(API_URL, { method: "POST", body: JSON.stringify(product) });
export const updateProduct = (id, product) =>
  request(`${API_URL}/${id}`, { method: "PUT", body: JSON.stringify(product) });
export const deleteProduct = (id) =>
  request(`${API_URL}/${id}`, { method: "DELETE" });