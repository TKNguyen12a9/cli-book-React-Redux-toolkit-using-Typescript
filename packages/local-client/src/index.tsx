// this is esbuild module from node_modules
// which contains esbuild.wasm file,
// the file is put into /public dir
import ReactDOM from "react-dom"
import "bulmaswatch/superhero/bulmaswatch.min.css"
// import CodeCell from "./components/CodeCell"
// import TextEditor from "./components/TextEditor"
import { Provider } from "react-redux"
import { store } from "./state/store"
import CellsList from "components/CellsList"
import "@fortawesome/fontawesome-free/css/all.min.css"

const App = () => {
	return (
		<div>
			<Provider store={store}>
				<CellsList />
			</Provider>
		</div>
	)
}

ReactDOM.render(<App />, document.querySelector("#root"))
