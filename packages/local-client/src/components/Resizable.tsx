import React, { useEffect, useState } from "react"
import { ResizableBox, ResizableBoxProps } from "react-resizable"
import "./resizable.css"

interface ReziableProps {
	direction: "vertical" | "horizontal"
	children: any
}

export default function Resizable({ direction, children }: ReziableProps) {
	let resizableProps: ResizableBoxProps

	const [innerHeight, setInnerHeight] = useState(window.innerHeight)
	const [innerWidth, setInnerWidth] = useState(window.innerWidth)
	const [width, setWidth] = useState(window.innerWidth)

	useEffect(() => {
		let timer: any
		const listener = () => {
			// deboucing technique
			timer && clearTimeout(timer)
			timer = setTimeout(() => {
				setInnerHeight(innerHeight)
				setInnerWidth(innerWidth)
				if (window.innerWidth * 0.75 < width) {
					setWidth(window.innerWidth * 0.75)
				}
			}, 100)
			// console.log(window.innerWidth, window.innerHeight)
		}
		window.addEventListener("resize", listener)

		return () => {
			window.removeEventListener("resize", listener)
		}
	}, [innerHeight, innerWidth, width])

	if (direction === "horizontal") {
		resizableProps = {
			className: "resize-horizontal",
			maxConstraints: [innerWidth * 0.75, Infinity],
			minConstraints: [Infinity, innerHeight * 0.2],
			height: Infinity,
			width,
			resizeHandles: ["e"],
			// synchronize width state
			onResize: (event, data) => {
				setWidth(data.size.width)
			},
		}
	} else {
		resizableProps = {
			width: Infinity,
			minConstraints: [Infinity, 25], // min of of window, prevent user from decreasing window size
			maxConstraints: [Infinity, window.innerHeight * 0.9], // max of window, prevent user from increasing window size
			height: 500,
			resizeHandles: ["s"],
		}
	}

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}
