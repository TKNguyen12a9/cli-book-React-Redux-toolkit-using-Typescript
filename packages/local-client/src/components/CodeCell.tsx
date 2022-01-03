// this is esbuild module from node_modules
// which contains esbuild.wasm file,
// the file is put into /public dir
import "./codeCell.css"
import { useEffect } from "react"
import CodeEditor from "./CodeEditor"
import Resizable from "./Resizable"
import { Cell } from "../state/index"
import { useDispatch } from "react-redux"
import { updateCell } from "state/features/cellSlice"
import { createBundle } from "state/features/bundleSlice"
import { useTypedSelector } from "state/hooks/hooks"
import Preview from "./Preview"
import { useCumulativeCode } from "../state/hooks/useCulmulativeCode"

interface CodeCellProps {
	cell: Cell
}

const CodeCell = ({ cell }: CodeCellProps) => {
	const dispatch = useDispatch()
	const bundle = useTypedSelector(state => state.bundles[cell.id!])
	const cumulativeCode = useCumulativeCode(cell.id!)

	useEffect(() => {
		// PURPOSE reason of this behavior
		// prevent non-stable rendering of `preview` window,
		// create bundle immediately if bundle is undefined
		if (!bundle) {
			// PURPOSE: join all previous and current code cell together
			dispatch(createBundle(cell.id!, cumulativeCode))
			return
		}
		// PURPOSE: assign && calculate timer to bundle in 1s
		const timer = setTimeout(async () => {
			dispatch(createBundle(cell.id!, cumulativeCode))
		}, 800) // 1s to prevent code from executing immediately, can only execute after 1s

		return () => {
			clearTimeout(timer)
		}

		// PURPOSE: disable `dependencies` to prevent from generating bundle infinitely
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cumulativeCode, cell.id, dispatch])

	return (
		<Resizable direction="vertical">
			<div
				style={{
					height: "100%",
					display: "flex",
					flexDirection: "row",
				}}>
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue={cell.content!}
						onChange={value =>
							dispatch(
								updateCell({ id: cell.id!, content: value })
							)
						}
					/>
				</Resizable>
				<div className="progress-wrapper">
					{!bundle || bundle.loading ? (
						<div className="progress-cover">
							<progress
								className="progress is-small is-primary"
								max="100">
								Loading...
							</progress>
						</div>
					) : (
						<Preview code={bundle.code} error={bundle.err} />
					)}
				</div>
			</div>
		</Resizable>
	)
}

export default CodeCell
