// PURPOSE: wrap up all app logic around esbuild

import * as esbuild from "esbuild-wasm"
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"
import { fetchPlugin } from "./plugins/fetch-plugin"

let service: esbuild.Service

// this takes user's code
const bundle = async (rawCode: string) => {
	if (!service) {
		service = await esbuild.startService({
			worker: true,
			wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
		})
	}

	// NOTE: esbuild includes: transform, build
	// NOTE: transform process
	// await service.transform(input, {
	// 	loader: "jsx",
	// 	target: "es2015",
	// })

	try {
		// build process
		const result = await service.build({
			entryPoints: ["index.js"],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
			// FIXME: warning: Define "process.env.NODE_ENV" when bundling for the browser
			// 3 ¦¢ if (process.env.NODE_ENV === 'production') {
			// => fixed by: define process.env.NODE_ENV = production | development
			define: {
				"process.env.NODE_ENV": '"production"',
				global: "window",
			},
			// avoid naming colisions if user import React or ReactDOM, etc
			// when testing code cell
			jsxFactory: "_React.createElement",
			jsxFragment: "_React.Fragment",
		})

		return {
			code: result.outputFiles[0].text,
			err: "",
		}
	} catch (err: any) {
		return {
			code: "",
			err: err.message,
		}
	}
}

export default bundle
