import { vi } from 'vitest';

// Mock fetch for testing API calls
export function mockFetch(data: any, ok = true, status = 200) {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      status,
      json: () => Promise.resolve(data),
    } as Response)
  );
}
