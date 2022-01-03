import * as esbuild from "esbuild-wasm"
import axios from "axios"
import localforage from "localforage"

// TODO: read more about localforage and indexedDB
const fileCache = localforage.createInstance({
	name: "filecache",
})

export const fetchPlugin = (inputCode: string) => {
	return {
		name: "fetchPlugin",
		setup(build: esbuild.PluginBuild) {
			// for index.js
			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				return {
					loader: "jsx",
					contents: inputCode,
				}
			})

			// NOTE: extract common caching logic, two /.*/
			// for each execution, esbuild gonna execute and must get `a result` from build.onLoad
			// after executing, no matter what the result is.
			// That means esbuild will execute all existing build.onLoad to get the result
			// if the target one doesn't provide
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const cachedResult =
					await fileCache.getItem<esbuild.OnLoadResult>(args.path)
				// otherwise, return it immediately
				if (cachedResult) return cachedResult
			})

			// CSS extension module
			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				// PURPOSE: check to see if we have already fetched this file
				// if it is in the cache
				const cachedResult =
					await fileCache.getItem<esbuild.OnLoadResult>(args.path)
				// otherwise, return it immediately
				if (cachedResult) return cachedResult

				const { data, request } = await axios.get(args.path)
				// PURPOSE: extract path file excluding index.js
				const urlPathname = new URL("./", request.responseURL).pathname

				// NOTE: read more about regular expression
				const escaped = data
					.replace(/\n/g, "")
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'")

				// PURPOSE: verify module extension
				const contents = `
					const style = document.createElement("style")
					style.innerText = '${escaped}'
					document.head.appendChild(style)
				`

				const result: esbuild.OnLoadResult = {
					loader: "jsx",
					contents,
					resolveDir: urlPathname,
				}

				// store response in cache
				await fileCache.setItem(args.path, result)
				return result
			})

			// not index.js && is jsx extension module
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path)
				// PURPOSE: extract path file excluding index.js
				const urlPathname = new URL("./", request.responseURL).pathname

				const result: esbuild.OnLoadResult = {
					loader: "jsx",
					contents: data,
					resolveDir: urlPathname,
				}

				await fileCache.setItem(args.path, result)
				return result
			})
		},
	}
}
