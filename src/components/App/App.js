import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { MessageProvider } from "../../contexts/messageContext";
import { Alert, Confirm } from "../Messages";

import Header from "../Header/Header";
import SignUp from "../Access/SignUp";
import SignIn from "../Access/SignIn";
import Ranking from "../Ranking/Ranking";
import UserSection from "../User/UserSection";

function App() {
	const [isLogged, setIsLogged] = useState(
		!!JSON.parse(localStorage.getItem("shortly"))?.token
	);

	return (
		<BrowserRouter>
			<GlobalStyle />

			<MessageProvider>
				<Header isLogged={isLogged} setIsLogged={setIsLogged} />

				<Alert />
				<Confirm />

				<Routes>
					<Route
						path="/sign-up"
						element={
							isLogged ? (
								"Saia da sua conta para acessar essa página :)"
							) : (
								<SignUp isLogged={isLogged} />
							)
						}
					/>

					<Route
						path="/sign-in"
						element={
							isLogged ? (
								"Saia da sua conta para acessar essa página :)"
							) : (
								<SignIn isLogged={isLogged} setIsLogged={setIsLogged} />
							)
						}
					/>

					<Route
						path="/"
						element={
							isLogged ? <UserSection /> : <Ranking isLogged={isLogged} />
						}
					/>

					<Route
						path="/ranking"
						element={
							isLogged ? (
								<Ranking isLogged={isLogged} />
							) : (
								"Faça login para acessar essa página :)"
							)
						}
					/>
				</Routes>
			</MessageProvider>
		</BrowserRouter>
	);
}

export default App;
