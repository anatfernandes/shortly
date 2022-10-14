import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header/Header";

function App() {
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("shortly"))?.token;

		setIsLogged(!!token);
	}, []);

	return (
		<BrowserRouter>
			<GlobalStyle />

			<Header isLogged={isLogged} />
		</BrowserRouter>
	);
}

export default App;
