import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock do window.open para testes
Object.defineProperty(window, 'open', {
  value: vi.fn(),
  writable: true
})

// Mock de console para testes mais limpos
const originalConsoleError = console.error
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('Warning: ReactDOM.render is no longer supported')
  ) {
    return
  }
  originalConsoleError(...args)
}

// Polyfill para matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})