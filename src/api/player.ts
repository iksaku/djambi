export type Player = keyof typeof Player

export const Player = {
  Green: 'Green',
  Yellow: 'Yellow',
  Red: 'Red',
  Blue: 'Blue',
} as const
