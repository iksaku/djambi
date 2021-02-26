export type PieceType = keyof typeof PieceType

export const PieceType = {
  Assassin: 'Assassin',
  Chief: 'Chief',
  Diplomat: 'Diplomat',
  Militant: 'Militant',
  Necromobile: 'Necromobile',
  Reporter: 'Reporter',
} as const

export { Assassin } from './Assassin'
export { Chief } from './Chief'
export { Diplomat } from './Diplomat'
export { Militant } from './Militant'
export { Necromobile } from './Necromobile'
export { Piece } from './Piece'
export { Reporter } from './Reporter'
