export type MenuItem = {
  id: string;
  label: string;
  alt: string;
  url: string;
  updatedAt: number;
};

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:5000"
).replace(/\/+$/, "");

export function resolveMediaUrl(item: Pick<MenuItem, "url" | "updatedAt">): string {
  // Las imágenes subidas desde el panel se sirven desde el backend en local.
  // En producción (Cloudinary) ya llegan como URL absoluta.
  const url = item.url.startsWith("/uploads/")
    ? `${API_BASE_URL}${item.url}`
    : item.url;

  if (!item.updatedAt) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${item.updatedAt}`;
}

export function authHeaders(token: string | null): Record<string, string> {
  return token ? { Authorization: `Bearer ${token}` } : {};
}
