import { useEffect, useRef, useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowDown,
  ArrowUp,
  ImagePlus,
  Link as LinkIcon,
  LogOut,
  Save,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  API_BASE_URL,
  authHeaders,
  resolveMediaUrl,
  type MenuItem,
} from "../lib/api";

const TOKEN_KEY = "oniriko_admin_token";
const NEW_ITEM_ID = "__new__";
const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type Status = { type: "success" | "error"; message: string } | null;

const StatusMessage = ({ status }: { status: Status }) => {
  if (!status) return null;
  return (
    <div
      className={`rounded-md border px-4 py-3 text-sm ${
        status.type === "success"
          ? "border-green-200 bg-green-100 text-green-800"
          : "border-red-200 bg-red-100 text-red-800"
      }`}
    >
      {status.message}
    </div>
  );
};

const AdminMenuPage = () => {
  const [token, setToken] = useState<string | null>(() =>
    sessionStorage.getItem(TOKEN_KEY),
  );
  const [checkingSession, setCheckingSession] = useState(true);
  const [password, setPassword] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [drafts, setDrafts] = useState<
    Record<string, { label: string; alt: string }>
  >({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const previewRef = useRef<Record<string, string>>({});
  const [newLabel, setNewLabel] = useState("");
  const [newAlt, setNewAlt] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return () => {
      Object.values(previewRef.current).forEach((url) =>
        URL.revokeObjectURL(url),
      );
    };
  }, []);

  const showError = (error: unknown) => {
    setStatus({
      type: "error",
      message: error instanceof Error ? error.message : "Hubo un error.",
    });
  };

  const adminFetch = async <T,>(
    path: string,
    options: RequestInit = {},
    activeToken: string | null = token,
  ): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...authHeaders(activeToken),
        ...((options.headers as Record<string, string> | undefined) ?? {}),
      },
    });

    if (response.status === 401) {
      sessionStorage.removeItem(TOKEN_KEY);
      setToken(null);
      throw new Error("La sesión ha caducado. Vuelve a introducir la contraseña.");
    }

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(data?.error || "Error inesperado del servidor.");
    }
    return data as T;
  };

  const setPreview = (id: string, file: File | null) => {
    const previous = previewRef.current[id];
    if (previous) URL.revokeObjectURL(previous);

    const nextMap = { ...previewRef.current };
    if (file) {
      nextMap[id] = URL.createObjectURL(file);
    } else {
      delete nextMap[id];
    }

    previewRef.current = nextMap;
    setPreviews(nextMap);
  };

  const applyItems = (nextItems: MenuItem[]) => {
    const ids = new Set(nextItems.map((item) => item.id));
    Object.keys(previewRef.current).forEach((id) => {
      if (!ids.has(id)) setPreview(id, null);
    });

    setItems(nextItems);
    setDrafts((prev) =>
      Object.fromEntries(Object.entries(prev).filter(([id]) => ids.has(id))),
    );
    setFiles((prev) =>
      Object.fromEntries(Object.entries(prev).filter(([id]) => ids.has(id))),
    );
  };

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      if (!token) {
        setCheckingSession(false);
        return;
      }

      try {
        await adminFetch<{ ok: boolean }>("/admin/verify", {}, token);
        const data = await adminFetch<{ items: MenuItem[] }>("/menu", {}, token);
        if (!active) return;
        setItems(data.items);
        setStatus(null);
      } catch (error) {
        if (!active) return;
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
        showError(error);
      } finally {
        if (active) setCheckingSession(false);
      }
    };

    verifySession();
    return () => {
      active = false;
    };
  }, [token]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(data?.error || "No se pudo iniciar sesión.");
      }

      sessionStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword("");
    } catch (error) {
      showError(error);
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    Object.values(previewRef.current).forEach((url) => URL.revokeObjectURL(url));
    previewRef.current = {};
    setPreviews({});
    setFiles({});
    setDrafts({});
    setItems([]);
    setToken(null);
    setStatus(null);
  };

  const chooseFile = (id: string, file: File | null) => {
    if (!file) {
      setFiles((prev) => ({ ...prev, [id]: null }));
      setPreview(id, null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      showError(new Error("La imagen supera el límite de 8 MB."));
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      showError(new Error("Formato no permitido. Usa JPG, PNG o WEBP."));
      return;
    }

    setStatus(null);
    setFiles((prev) => ({ ...prev, [id]: file }));
    setPreview(id, file);
  };

  const labelOf = (item: MenuItem) => drafts[item.id]?.label ?? item.label;
  const altOf = (item: MenuItem) => drafts[item.id]?.alt ?? item.alt;

  const setField = (id: string, key: "label" | "alt", value: string) => {
    const item = items.find((entry) => entry.id === id);
    setDrafts((prev) => ({
      ...prev,
      [id]: {
        label: key === "label" ? value : (prev[id]?.label ?? item?.label ?? ""),
        alt: key === "alt" ? value : (prev[id]?.alt ?? item?.alt ?? ""),
      },
    }));
  };

  const clearDraft = (id: string) => {
    setDrafts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const runOperation = async (
    operation: () => Promise<{ items: MenuItem[] }>,
    successMessage: string,
    onSuccess?: () => void,
  ) => {
    setBusy(true);
    setStatus(null);
    try {
      const data = await operation();
      applyItems(data.items);
      onSuccess?.();
      setStatus({ type: "success", message: successMessage });
    } catch (error) {
      showError(error);
    } finally {
      setBusy(false);
    }
  };

  const handleSaveText = (item: MenuItem) => {
    runOperation(
      () =>
        adminFetch<{ items: MenuItem[] }>(
          `/admin/menu/items/${encodeURIComponent(item.id)}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ label: labelOf(item), alt: altOf(item) }),
          },
        ),
      "Textos guardados.",
      () => clearDraft(item.id),
    );
  };

  const handleSaveImage = (item: MenuItem) => {
    const file = files[item.id];
    if (!file) {
      showError(new Error("Selecciona una imagen antes de guardar."));
      return;
    }

    const form = new FormData();
    form.append("image", file);
    form.append("label", labelOf(item));
    form.append("alt", altOf(item));

    runOperation(
      () =>
        adminFetch<{ items: MenuItem[] }>(
          `/admin/menu/items/${encodeURIComponent(item.id)}/image`,
          { method: "PUT", body: form },
        ),
      "Imagen actualizada.",
      () => {
        setPreview(item.id, null);
        setFiles((prev) => {
          const next = { ...prev };
          delete next[item.id];
          return next;
        });
        clearDraft(item.id);
      },
    );
  };

  const handleMove = (item: MenuItem, direction: -1 | 1) => {
    const index = items.findIndex((entry) => entry.id === item.id);
    const target = index + direction;
    if (index === -1 || target < 0 || target >= items.length) return;

    const ordered = [...items];
    [ordered[index], ordered[target]] = [ordered[target], ordered[index]];

    runOperation(
      () =>
        adminFetch<{ items: MenuItem[] }>("/admin/menu/reorder", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderedIds: ordered.map((entry) => entry.id) }),
        }),
      "Orden actualizado.",
    );
  };

  const handleDelete = (item: MenuItem) => {
    if (!window.confirm(`¿Eliminar "${labelOf(item)}" de la carta?`)) return;

    runOperation(() =>
      adminFetch<{ items: MenuItem[] }>(
        `/admin/menu/items/${encodeURIComponent(item.id)}`,
        { method: "DELETE" },
      ),
      "Imagen eliminada.",
    );
  };

  const handleAddItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const file = files[NEW_ITEM_ID];
    if (!file) {
      showError(new Error("Selecciona una imagen para añadir."));
      return;
    }

    const form = new FormData();
    form.append("image", file);
    form.append("label", newLabel);
    form.append("alt", newAlt || newLabel);

    runOperation(
      () =>
        adminFetch<{ items: MenuItem[] }>("/admin/menu/items", {
          method: "POST",
          body: form,
        }),
      "Imagen añadida a la carta.",
      () => {
        setPreview(NEW_ITEM_ID, null);
        setFiles((prev) => {
          const next = { ...prev };
          delete next[NEW_ITEM_ID];
          return next;
        });
        setNewLabel("");
        setNewAlt("");
      },
    );
  };

  const inputClass =
    "mt-2 w-full rounded-md border border-espresso/15 bg-cream-50 px-4 py-3 text-sm text-espresso placeholder:text-espresso/40 focus:border-espresso focus:outline-none";

  return (
    <>
      <Helmet>
        <title>Gestión de carta · ONÍRIKO</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <main className="min-h-screen bg-cream-50 text-espresso">
        <div className="container-editorial py-16 sm:py-20">
          {checkingSession ? (
            <div className="mx-auto max-w-md text-center">
              <p className="eyebrow">Acceso privado</p>
              <p className="body mt-4">
                Conectando con el servidor… Si el backend estaba en reposo,
                puede tardar unos segundos.
              </p>
            </div>
          ) : !token ? (
            <div className="mx-auto max-w-md rounded-2xl border border-espresso/10 bg-cream-50 p-8 shadow-sm">
              <p className="eyebrow">Acceso privado</p>
              <h1 className="heading-section mt-4">Gestión de carta</h1>
              <p className="body mt-4">
                Introduce la contraseña de administrador para cambiar las
                imágenes de la carta.
              </p>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-xs uppercase tracking-widest text-espresso/60"
                  >
                    Contraseña
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoFocus
                    required
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  disabled={busy}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? "Comprobando…" : "Entrar"}
                </button>
              </form>

              <div className="mt-6">
                <StatusMessage status={status} />
              </div>

              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-espresso/60 transition-colors hover:text-espresso"
              >
                <LinkIcon size={14} /> Volver a la web
              </Link>
            </div>
          ) : (
            <>
              <header className="flex flex-wrap items-start justify-between gap-6">
                <div>
                  <p className="eyebrow">Panel privado</p>
                  <h1 className="heading-section mt-4">
                    Imágenes de la carta
                  </h1>
                  <p className="body mt-4 max-w-2xl">
                    Cambia, añade, reordena o elimina láminas. Los cambios se
                    aplican en la web pública al recargar.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Link
                    to="/"
                    className="btn-outline px-5 py-2 text-xs"
                  >
                    <LinkIcon size={14} /> Ver web
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="btn-outline px-5 py-2 text-xs"
                  >
                    <LogOut size={14} /> Salir
                  </button>
                </div>
              </header>

              <div className="mt-8">
                <StatusMessage status={status} />
              </div>

              <div className="mt-10 space-y-6">
                {items.map((item, index) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-espresso/10 bg-cream-50 p-6 shadow-sm"
                  >
                    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                      <img
                        src={previews[item.id] || resolveMediaUrl(item)}
                        alt={altOf(item)}
                        className="h-auto w-full rounded-lg border border-espresso/10 object-contain"
                      />

                      <div className="space-y-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <p className="eyebrow">
                            #{index + 1} · {item.id}
                          </p>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleMove(item, -1)}
                              disabled={busy || index === 0}
                              aria-label="Subir imagen"
                              className="rounded-full border border-espresso/15 p-2 transition-colors hover:bg-espresso/5 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <ArrowUp size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMove(item, 1)}
                              disabled={busy || index === items.length - 1}
                              aria-label="Bajar imagen"
                              className="rounded-full border border-espresso/15 p-2 transition-colors hover:bg-espresso/5 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <ArrowDown size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item)}
                              disabled={busy}
                              aria-label="Eliminar imagen"
                              className="rounded-full border border-red-200 p-2 text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <label className="block text-xs uppercase tracking-widest text-espresso/60">
                            Nombre
                            <input
                              value={labelOf(item)}
                              onChange={(event) =>
                                setField(item.id, "label", event.target.value)
                              }
                              className={inputClass}
                            />
                          </label>
                          <label className="block text-xs uppercase tracking-widest text-espresso/60">
                            Texto alternativo
                            <input
                              value={altOf(item)}
                              onChange={(event) =>
                                setField(item.id, "alt", event.target.value)
                              }
                              className={inputClass}
                            />
                          </label>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={(event) =>
                              chooseFile(item.id, event.target.files?.[0] ?? null)
                            }
                            className="max-w-full text-xs text-espresso/70"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveText(item)}
                            disabled={busy}
                            className="btn-outline px-5 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Save size={14} /> Guardar textos
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSaveImage(item)}
                            disabled={busy || !files[item.id]}
                            className="btn-primary px-5 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            Actualizar imagen
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <section className="mt-10 rounded-2xl border border-espresso/10 bg-cream-100/60 p-6">
                <h2 className="heading-card">Añadir una imagen</h2>
                <form
                  onSubmit={handleAddItem}
                  className="mt-6 grid gap-4 sm:grid-cols-2"
                >
                  <label className="block text-xs uppercase tracking-widest text-espresso/60">
                    Nombre
                    <input
                      value={newLabel}
                      onChange={(event) => setNewLabel(event.target.value)}
                      placeholder="Carta de invierno"
                      required
                      className={inputClass}
                    />
                  </label>
                  <label className="block text-xs uppercase tracking-widest text-espresso/60">
                    Texto alternativo
                    <input
                      value={newAlt}
                      onChange={(event) => setNewAlt(event.target.value)}
                      placeholder="Carta de invierno Oníriko"
                      className={inputClass}
                    />
                  </label>
                  <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(event) =>
                        chooseFile(NEW_ITEM_ID, event.target.files?.[0] ?? null)
                      }
                      className="max-w-full text-xs text-espresso/70"
                    />
                    <button
                      type="submit"
                      disabled={busy || !files[NEW_ITEM_ID]}
                      className="btn-primary px-5 py-2 text-xs disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <ImagePlus size={14} /> Añadir a la carta
                    </button>
                  </div>
                </form>

                {previews[NEW_ITEM_ID] && (
                  <img
                    src={previews[NEW_ITEM_ID]}
                    alt="Vista previa de la nueva imagen"
                    className="mt-6 max-h-64 w-auto rounded-lg border border-espresso/10"
                  />
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default AdminMenuPage;
