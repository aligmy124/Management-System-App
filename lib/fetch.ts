import { getToken } from "./cookies";

const BASE_URL = process.env.API_URL;
import { ApiError } from "./api-error";
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const start = performance.now();
  const token = await getToken();
  const isFormData = options.body instanceof FormData;
  
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...options.headers,
    },
  });

if (!res.ok) {
  const error = await res.json();

  throw new ApiError(
   res.status,
   error.message,
   error.fieldErrors
)
}
console.log(
  `[API] ${endpoint} → ${(performance.now() - start).toFixed(0)}ms`
);
  return (await res.json()) as T;
}
