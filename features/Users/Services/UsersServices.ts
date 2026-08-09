// services/UserServices.ts
import { apiFetch } from "@/lib/fetch";
import { User, UserResponse, UserQuery } from "../Types/Types";
export async function getUsers(
  options: UserQuery = {}
): Promise<UserResponse> {
  const {
    pageNumber = 1,
    pageSize = 10,
    userName = "",
    email = "",
    country = "",
    groups = [],
  } = options;

  const params = new URLSearchParams({
    pageNumber: String(pageNumber),
    pageSize: String(pageSize),
  });

  if (userName) {
    params.set("userName", userName);
  }
  if (email) {
    params.set("email", email);
  }
  if (country) {
    params.set("country", country);
  }
  if (groups && groups.length > 0) {
    groups.forEach((group) => {
      params.append("groups", String(group));
    });
  }

  return apiFetch<UserResponse>(`/Users?${params.toString()}`, {
    next: {
      revalidate: 0,
    },
  });
}

export async function getCurrentUser(): Promise<User> {
  return apiFetch<User>("/Users/current", {
    next: {
      revalidate: 0,
    },
  });
}

export async function createUser(data: FormData): Promise<User> {
  return apiFetch<User>("/Users/Create", {
    method: "POST",
    body: data,
  });
}

export async function updateUserProfile(data: FormData): Promise<User> {
  return apiFetch<User>("/Users/", {
    method: "PUT",
    body: data,
  });
}

export async function toggleUserActivation(id: number): Promise<User> {
  return apiFetch<User>(`/Users/${id}`, {
    method: "PUT",
  });
}

export async function deleteUser(id: number): Promise<void> {
  return apiFetch(`/Users/${id}`, {
    method: "DELETE",
  });
}