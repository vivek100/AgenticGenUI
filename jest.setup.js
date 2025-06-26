import '@testing-library/jest-dom'

// Mock canvas context for tests
HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  clearRect: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  arc: jest.fn(),
  roundRect: jest.fn(),
  fillText: jest.fn(),
  measureText: jest.fn(() => ({ width: 100 })),
  set fillStyle(value) {},
  set strokeStyle(value) {},
  set lineWidth(value) {},
  set font(value) {},
  set textAlign(value) {},
  set textBaseline(value) {},
}))

// Mock canvas dimensions
Object.defineProperty(HTMLCanvasElement.prototype, 'clientWidth', {
  value: 800,
  writable: true,
})

Object.defineProperty(HTMLCanvasElement.prototype, 'clientHeight', {
  value: 600,
  writable: true,
})

Object.defineProperty(HTMLCanvasElement.prototype, 'width', {
  value: 800,
  writable: true,
})

Object.defineProperty(HTMLCanvasElement.prototype, 'height', {
  value: 600,
  writable: true,
})