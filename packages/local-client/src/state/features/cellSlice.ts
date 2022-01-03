import { createSlice, PayloadAction } from "@reduxjs/toolkit"
// import produce from "immer"
import { Cell, CellMove, CellsState } from "../models/cell"

const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
}

// random id helper
const randomId = () => {
	return Math.random().toString(35).substring(2, 6)
}

export const cellSlice = createSlice({
	name: "cells",
	initialState,
	reducers: {
		updateCell: (
			state,
			action: PayloadAction<{ id: string; content: string }>
		) => {
			// can do this with redux-toolkit(Immer functionality is included)
			state.data[action.payload.id].content = action.payload.content
		},
		moveCell: (state, action: PayloadAction<CellMove>) => {
			const { direction } = action.payload
			const index = state.order.findIndex(id => id === action.payload.id)
			const targetIndex = direction === "up" ? index - 1 : index + 1

			// prevent invalid move
			if (targetIndex < 0 || targetIndex >= state.order.length) return

			// swap previous move with current move
			state.order[index] = state.order[targetIndex]
			state.order[targetIndex] = action.payload.id
		},
		insertCellBefore: (state, action: PayloadAction<Cell>) => {
			const cell: Cell = {
				id: randomId(),
				type: action.payload.type,
				content: "",
			}
			state.data[cell.id!] = cell

			const indexOfCellToInsert = state.order.findIndex(
				id => id === action.payload.id
			)

			// if cell does not exist, create one new
			if (indexOfCellToInsert === -1) state.order.unshift(cell.id!)
			else state.order.splice(indexOfCellToInsert, 0, cell.id!)
		},
		deleteCell: (state, action: PayloadAction<string>) => {
			delete state.data[action.payload]
			state.order = state.order.filter(id => id !== action.payload)
		},
	},
})

export const { deleteCell, updateCell, moveCell, insertCellBefore } =
	cellSlice.actions

export default cellSlice.reducer
