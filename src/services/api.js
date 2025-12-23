const BASE_URL = "https://chittilaata-backend-production.up.railway.app";

export async function apiRequest(path, options = {}) {
  const response = await fetch(BASE_URL + path, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  let data = {};
  try {
    data = await response.json();
  } catch {
    // ignore if backend sends no body
  }

  if (!response.ok) {
    throw new Error(data.message || `Request failed with ${response.status}`);
  }

  return data;
}
