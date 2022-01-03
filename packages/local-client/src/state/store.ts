import { configureStore } from "@reduxjs/toolkit"
import cellReducer, { insertCellBefore } from "./features/cellSlice"
import bundleReducer from "./features/bundleSlice"

export const store = configureStore({
	reducer: {
		cells: cellReducer,
		bundles: bundleReducer,
	},
})

// test with mannually inserted data
store.dispatch(
	insertCellBefore({
		id: null,
		type: "code",
	})
)

store.dispatch(
	insertCellBefore({
		id: null,
		type: "text",
	})
)

console.log(`cellStore: ${store.getState().cells}`)
console.log(`bundleStore: ${store.getState().bundles === undefined}`)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
