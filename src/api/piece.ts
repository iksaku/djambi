import type { PlayerTeam } from '@/api/player'

export type PieceType = keyof typeof PieceType

export const PieceType = {
  Assassin: 'Assassin',
  Chief: 'Chief',
  Diplomat: 'Diplomat',
  Militant: 'Militant',
  Necromobile: 'Necromobile',
  Reporter: 'Reporter',
} as const

export class Piece {
  public isAlive: boolean = false

  public constructor(
    public readonly owner: PlayerTeam,
    public readonly type: PieceType
  ) {}

  public get component() {
    return `piece-${this.type.toLowerCase()}`
  }

  public get color() {
    const colors = {
      Green: 'text-green-500',
      Yellow: 'text-yellow-500',
      Red: 'text-red-500',
      Blue: 'text-blue-500',
    } as const

    return colors[this.owner] ?? undefined
  }

  public get canKillDirectly() {
    return (
      this.type !== PieceType.Diplomat &&
      this.type !== PieceType.Necromobile &&
      this.type !== PieceType.Reporter
    )
  }

  public get canMovePiece() {
    return this.type === PieceType.Diplomat
  }

  public get canMoveCorpse() {
    return this.type === PieceType.Necromobile
  }

  public get canEnterMaze() {
    return this.type === PieceType.Chief || !this.isAlive
  }
}
