import "./insertCell.css"
import React from "react"
import { useDispatch } from "react-redux"
import { insertCellBefore } from "state/features/cellSlice"
interface InsertCellProps {
	nextCellId: string | null
	forceVisible?: boolean
}

export default function InsertCell({
	nextCellId,
	forceVisible,
}: InsertCellProps) {
	const dispatch = useDispatch()

	return (
		<div className={`insert-cell ${forceVisible && "force-visible"}`}>
			<div className="insert-buttons">
				<button
					className="button is-rounded is-primary is-small"
					onClick={() =>
						dispatch(
							insertCellBefore({ id: nextCellId, type: "code" })
						)
					}>
					<span className="icon is-small">
						<i className="fas fa-plus" />
					</span>
					<span>Cell (Code)</span>
				</button>
				<button
					className="button is-rounded is-primary is-small"
					onClick={() =>
						dispatch(
							insertCellBefore({ id: nextCellId, type: "text" })
						)
					}>
					<span className="icon is-small">
						<i className="fas fa-plus" />
					</span>
					<span>Cell (Text)</span>
				</button>
			</div>
			<div className="divider"></div>
		</div>
	)
}
