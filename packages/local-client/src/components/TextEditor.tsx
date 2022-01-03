import React, { useEffect, useRef, useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import "./textEditor.css"
import { Cell } from "../state/index"
import { useDispatch } from "react-redux"
import { updateCell } from "state/features/cellSlice"

interface CellProps {
	cell: Cell
}

export default function TextEditor({ cell }: CellProps) {
	const [isEditing, setIsEditing] = useState(false)
	// const [value, setValue] = useState("# Header")
	const ref = useRef<HTMLDivElement | null>(null)

	const dispatch = useDispatch()

	// handle toggling TextEditor when click outside or inside of box
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			// verify click is inside editor
			if (
				ref.current &&
				event.target &&
				ref.current.contains(event.target as Node)
			) {
				return
			}
			// click is outside editor
			setIsEditing(false)
		}
		// TODO: take a look at {capture: true}
		document.addEventListener("click", listener, { capture: true })

		return () => {
			document.removeEventListener("click", listener, { capture: true })
		}
	}, [])

	if (isEditing) {
		return (
			<div ref={ref} className="text-editor">
				<MDEditor
					value={cell.content}
					onChange={value =>
						dispatch(
							updateCell({
								id: cell.id!,
								content: value || "",
							})
						)
					}
				/>
			</div>
		)
	}

	return (
		<div className="text-editor card" onClick={() => setIsEditing(true)}>
			<div className="card-content">
				<MDEditor.Markdown
					source={cell.content || "Click here to edit"}
				/>
			</div>
		</div>
	)
}
