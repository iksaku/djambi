export type PlayerTeam = keyof typeof PlayerTeam

export const PlayerTeam = {
  Green: 'Green',
  Yellow: 'Yellow',
  Red: 'Red',
  Blue: 'Blue',
} as const
