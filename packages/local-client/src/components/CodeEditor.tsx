import React, { useRef } from "react"
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react"
import prettier from "prettier"
import parser from "prettier/parser-babel"
// import codeShift from "jscodeshift"
// import Highlighter from "monaco-jsx-highlighter"
import "./codeEditor.css"

interface CodeEditorProps {
	initialValue: string
	onChange(value: string): void
}

export default function CodeEditor({
	initialValue,
	onChange,
}: CodeEditorProps) {
	const editorRef = useRef<any>()

	const onEditorDidMount: EditorDidMount = (
		getValue: () => string,
		monacoEditor
	) => {
		editorRef.current = monacoEditor
		monacoEditor.onDidChangeModelContent(() => {
			// print out every content in editor when keys change
			// console.log(getValue())
			onChange(getValue())
		})

		// config tabSize
		monacoEditor.getModel()?.updateOptions({ tabSize: 2 })

		// NOTE: problems with codeshift package, so could not configure code highlighter
		// // config code highlighter
		// const highlighter = new Highlighter(
		// 	// @ts-ignore
		// 	window.monaco,
		// 	// codeShift,
		// 	monacoEditor
		// )

		// highlighter.highLightOnDidChangeModelContent(
		// 	// for every change of highliter, that changes will be printed out in console. Do this to handle!
		// 	() => {},
		// 	() => {},
		// 	undefined,
		// 	() => {}
		// )
	}

	const onFormatClick = () => {
		// get current value from editor
		const unformatted = editorRef.current.getModel().getValue()

		// format that value
		const formatted = prettier
			.format(unformatted, {
				parser: "babel",
				plugins: [parser],
				useTabs: false,
				semi: false,
				singleQuote: false,
			})
			.replace(/\n$/, "") // prevent newline after format code

		// set the formatted value back in the editor
		editorRef.current.setValue(formatted)
	}

	return (
		<div className="editor-wrapper">
			<button
				className="button button-format is-primary is-small"
				onClick={onFormatClick}>
				format
			</button>
			<MonacoEditor
				value={initialValue}
				editorDidMount={onEditorDidMount}
				language="javascript"
				height="100%"
				theme="dark"
				options={{
					wordWrap: "on",
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</div>
	)
}
