import { useTypedSelector } from "./hooks"

// PURPOSE: calculate all cell code (previous cell code included) into cumulative one
// to make code reference from different code cell
export const useCumulativeCode = (cellId: string) => {
	return useTypedSelector(state => {
		const { data, order } = state.cells
		const orderedCells = order.map(id => data[id])

		// show() with operations (in the similar cell code)
		const showFuncWithOp = `
			import _React from 'react'
			import _ReactDOM from 'react-dom'
				
			var show = (value) => {
				const root = document.querySelector('#root')
				if (typeof value === 'object') {
					if (value.$$typeof && value.props) {
						_ReactDOM.render(value, root)
					} else {
						root.querySelector('#root').innerHTML = JSON.stringify(value)
					}
				} 
				else {
					root.querySelector('#root').innerHTML = value
				} 
			}	
		`

		// showing result without operations (in different code cell)
		const showFuncWithoutOp = "var show = () => {}"

		const cumulativeCode = [] as any[]
		for (let _cell of orderedCells) {
			if (_cell.type === "code") {
				// if cell is similar, show operations
				if (_cell.id === cellId) {
					cumulativeCode.push(showFuncWithOp)
				}
				// otherwise, separate operations between different cells
				else {
					cumulativeCode.push(showFuncWithoutOp)
				}
				cumulativeCode.push(_cell.content)
			}
			if (_cell.id === cellId) break
		}

		return cumulativeCode
	}).join("\n")
}
