export enum PlayerId {
  Green = 'Green',
  Yellow = 'Yellow',
  Red = 'Red',
  Blue = 'Blue',
}

export const PlayerOrder: Readonly<PlayerId[]> = [
  PlayerId.Green,
  PlayerId.Yellow,
  PlayerId.Blue,
  PlayerId.Red,
]

export const PlayerTextColors: Record<PlayerId, string> = {
  Green: 'text-green-500',
  Yellow: 'text-yellow-500',
  Red: 'text-red-500',
  Blue: 'text-blue-500',
} as const

export const PlayerBackgroundColors: Record<PlayerId, string> = {
  Green: 'bg-green-800',
  Yellow: 'bg-yellow-800',
  Red: 'bg-red-800',
  Blue: 'bg-blue-800',
} as const
