import { vi } from 'vitest';
import '@testing-library/jest-dom/extend-expect';

vi.mock('axios', () => ({
  get: vi.fn(() => Promise.resolve({ data: 'mocked data' })),
}));
