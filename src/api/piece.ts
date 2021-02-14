import type { Player } from '@/api/player'
import board from '@/api/board'

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
  public isAlive: boolean = true

  public constructor(
    public readonly owner: Player,
    public readonly type: PieceType
  ) {}

  public get component(): string {
    return `piece-${this.type.toLowerCase()}`
  }

  public get color(): string {
    const colors = {
      Green: 'text-green-500',
      Yellow: 'text-yellow-500',
      Red: 'text-red-500',
      Blue: 'text-blue-500',
    } as const

    return colors[this.owner] ?? undefined
  }

  public get isCorpse(): boolean {
    return !this.isAlive
  }

  public get canKillDirectly(): boolean {
    return (
      this.type !== PieceType.Diplomat &&
      this.type !== PieceType.Necromobile &&
      this.type !== PieceType.Reporter
    )
  }

  public get canMovePiece(): boolean {
    return this.type === PieceType.Diplomat
  }

  public get canMoveCorpse(): boolean {
    return this.type === PieceType.Necromobile
  }

  public get canEnterMaze(): boolean {
    return this.type === PieceType.Chief || !this.isAlive
  }

  public canBeUsedByPlayer(player: Player): boolean {
    return (
      (this.isAlive && player === this.owner) ||
      (this.isCorpse && player === board.playerInPower)
    )
  }
}
