import React from "react"
import { useDispatch } from "react-redux"
import { deleteCell, moveCell } from "state/features/cellSlice"
import "./actionBar.css"

interface ActionBarProps {
	id: string
}

export default function ActionBar({ id }: ActionBarProps) {
	const dispatch = useDispatch()

	return (
		<div className="action-bar">
			<button
				className="button is-primary is-small"
				onClick={() => dispatch(moveCell({ id: id, direction: "up" }))}>
				<span className="icon">
					<i className="fas fa-arrow-up"></i>
				</span>
			</button>
			<button
				className="button is-primary is-small"
				onClick={() =>
					dispatch(moveCell({ id: id, direction: "down" }))
				}>
				<span className="icon">
					<i className="fas fa-arrow-down"></i>
				</span>
			</button>
			<button
				className="button is-primary is-small"
				onClick={() => dispatch(deleteCell(id))}>
				<span className="icon">
					<i className="fas fa-times"></i>
				</span>
			</button>
		</div>
	)
}
