export type CellTypes = "code" | "text"

export type Direction = "up" | "down"

export interface Cell {
	id: string | null
	type: CellTypes
	content?: string
}

export interface CellMove {
	id: string
	direction: Direction
}

export interface CellsState {
	loading: boolean
	error: string | null
	order: string[]
	data: {
		[key: string]: Cell
	}
}
