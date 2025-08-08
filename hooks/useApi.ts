import { Platform } from 'react-native';

const DEFAULT_PORT = 3001;

function resolveBaseUrl(): string {
  // Allow override via env if provided
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl && envUrl.length > 0) return envUrl;

  // Android emulator cannot use localhost
  if (Platform.OS === 'android') {
    return `http://10.0.2.2:${DEFAULT_PORT}`;
  }

  // iOS simulator / Web
  return `http://localhost:${DEFAULT_PORT}`;
}

const BASE_URL = resolveBaseUrl();

type JsonRecord = Record<string, unknown>;

async function jsonFetch<T = any>(path: string, options: RequestInit & { body?: JsonRecord } = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    credentials: 'include',
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let data: any = null;
  try {
    data = await response.json();
  } catch (e) {
    // ignore (non json)
  }

  if (!response.ok) {
    const message = (data && (data.message as string)) || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data as T;
}

export async function apiLogin({ identifier, password }: { identifier: string; password: string }) {
  // send both username and email to backend
  return jsonFetch('/login', {
    body: { username: identifier, email: identifier, password },
  });
}

export async function apiRegister({ name, email, password }: { name: string; email: string; password: string }) {
  return jsonFetch('/register', {
    body: { username: name, email, password },
  });
}

export { BASE_URL };

