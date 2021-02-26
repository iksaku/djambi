import { Player } from '@/api/player'
import board from '@/api/board'

export abstract class Piece {
  public isAlive: boolean = true

  public constructor(public readonly owner: Player) {}

  public get component(): string {
    return `piece-${this.constructor.name.toLowerCase()}`
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
    return true
  }

  public get canMovePiece(): boolean {
    return false
  }

  public get canMoveCorpse(): boolean {
    return false
  }

  public get canEnterMaze(): boolean {
    return !this.isAlive
  }

  public canBeUsedByPlayer(player: Player): boolean {
    return (
      (this.isAlive && player === this.owner) ||
      (this.isCorpse && player === board.playerInPower)
    )
  }
}
