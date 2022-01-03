import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { BundleState, BundleComplete } from "state/models/bundle"
import bundle from "../../bundler/index"

const initialState = {} as BundleState

const bundleSlice = createSlice({
	name: "bundle",
	initialState,
	reducers: {
		bundleStart: (state, action: PayloadAction<{ cellId: string }>) => {
			state[action.payload.cellId] = {
				loading: true,
				code: "",
				err: "",
			}
		},
		bundleComplete: (state, action: PayloadAction<BundleComplete>) => {
			state[action.payload.cellId] = {
				loading: false,
				code: action.payload.bundle.code, // NOTE: error will occur in this lines
				err: action.payload.bundle.err,
			}
		},
	},
})

// dispatch custom(async) action in Slice
export const createBundle =
	(cellId: string, input: string) => async (dispatch: Dispatch) => {
		dispatch(bundleStart({ cellId: cellId }))
		const result = await bundle(input)
		dispatch(bundleComplete({ cellId: cellId, bundle: result }))
	}

export const { bundleStart, bundleComplete } = bundleSlice.actions
export default bundleSlice.reducer
