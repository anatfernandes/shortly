import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Header/Header";
import SignUp from "../Access/SignUp";

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

			<Routes>
				<Route path="/sign-up" element={<SignUp isLogged={isLogged} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
