import "./cellsList.css"
import React, { Fragment } from "react"
import { useTypedSelector } from "state/hooks/hooks"
import CellItem from "./CellItem"
import InsertCell from "./InsertCell"

export default function CellsList() {
	const cells = useTypedSelector(({ cells: { order, data } }) =>
		order.map(id => data[id])
	)

	const renderedCells = cells.map(cell => (
		// NOTE: providing <Fragment key={id}></Fragment> resolve `each child should have unique key` error from React
		<Fragment key={cell.id}>
			<CellItem key={cell.id} cell={cell} />
			<InsertCell nextCellId={cell.id!} />
		</Fragment>
	))

	return (
		<div className="cell-list">
			<InsertCell forceVisible={cells.length === 0} nextCellId={null} />
			{renderedCells}
		</div>
	)
}
