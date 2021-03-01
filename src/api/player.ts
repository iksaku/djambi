export type Player = keyof typeof Player

export const Player = {
  Green: 'Green',
  Yellow: 'Yellow',
  Red: 'Red',
  Blue: 'Blue',
} as const

export const PlayerTextColors = {
  Green: 'text-green-500',
  Yellow: 'text-yellow-500',
  Red: 'text-red-500',
  Blue: 'text-blue-500',
} as const

export const PlayerBackgroundColors = {
  Green: 'bg-green-800',
  Yellow: 'bg-yellow-800',
  Red: 'bg-red-800',
  Blue: 'bg-blue-800',
} as const
