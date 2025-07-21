export const BASE_URL = 'http://192.168.68.146:3000'; // Asegúrate que esta IP sea accesible desde tu celular

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const url = `${BASE_URL}${endpoint}`;

  const finalOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, finalOptions);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw {
      status: response.status,
      message: errorData?.message || 'Error en la solicitud',
      data: errorData,
    };
  }

  return response.json();
};