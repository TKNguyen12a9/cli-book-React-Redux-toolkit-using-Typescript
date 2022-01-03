import * as esbuild from "esbuild-wasm"

export const unpkgPathPlugin = () => {
	return {
		name: "unpkg-path-plugin",
		setup(build: esbuild.PluginBuild) {
			// PURPOSE handle root entry file of index.js
			// refactor for index.js path
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return { path: "index.js", namespace: "a" }
			})

			// PURPOSE handle relative paths in a module
			// refactor for ./ or ../ path
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				return {
					namespace: "a",
					path: new URL(
						args.path,
						"https://unpkg.com" + args.resolveDir + "/"
					).href,
				}
			})

			// PURPOSE handle main file of a module,
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return {
					namespace: "a",
					path: `https://unpkg.com/${args.path}`,
				}
			})
		},
	}
}
