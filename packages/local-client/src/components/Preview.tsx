import React, { useEffect, useRef } from "react"
import "./preview.css"

interface PreviewProps {
	code: string
	error: string
}

// TODO: take a look at relationship between <div id="root"></div> and <iframe />
const html = `
		<html>
			<head>
				<style>
					html: {background-color: white}
				</style>
			</head>
			<body>
				<div id="root"></div>
				<script>
					const handleError = (err) => {
						const root = document.querySelector("#root")
            			root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
						console.error(err)
					}

					window.addEventListener('error', (event) => {
						event.preventDefault()
						handleError(event.error)
						console.log(event)
					})
					
					window.addEventListener('message', (event) => { 
						console.log(event.data)
						try {
							eval(event.data)
						} catch (err) {
							handleError(err)
						}
					}, false)
				</script>
			</body>
		</html>
		`

export default function Preview({ code, error }: PreviewProps) {
	const iframe = useRef<any>()

	useEffect(() => {
		iframe.current.srcdoc = html
		// prevent html content updates immediately,
		// wait for browser updates content first before display content
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, "*")
		}, 500)
	}, [code])

	return (
		<div className="preview-wrapper">
			<iframe
				style={{ backgroundColor: "white" }}
				title="preview"
				ref={iframe}
				sandbox="allow-scripts"
				srcDoc={html}
			/>
			{error && <div className="preview-error">{error}</div>}
		</div>
	)
}
