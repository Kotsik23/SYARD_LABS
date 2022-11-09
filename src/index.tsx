import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from "./theme"
import { Provider } from "react-redux"
import { store } from "./store"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<ChakraProvider resetCSS theme={theme}>
				<App />
			</ChakraProvider>
		</Provider>
	</BrowserRouter>
)
