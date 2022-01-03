import "./cellsList.css"
import React from "react"
import { Cell } from "../state/index"
import CodeCell from "./CodeCell"
import TextEditor from "./TextEditor"
import ActionBar from "./ActionBar"

interface CellProps {
	cell: Cell
}

export default function CellItem({ cell }: CellProps) {
	// const dispatch = useDispatch()
	let child: JSX.Element

	// decide current cell.type is Code or Text
	if (cell.type === "code") {
		child = (
			<>
				<div className="action-bar-wrapper">
					<ActionBar id={cell.id!} />
				</div>
				<CodeCell cell={cell} />
			</>
		)
	} else {
		child = (
			<>
				<ActionBar id={cell.id!} />
				<TextEditor cell={cell} />
			</>
		)
	}

	return <div className="cell-list-item">{child}</div>
}
