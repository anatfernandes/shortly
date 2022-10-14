import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../service/shortly";

import Button from "../common/Button";
import Input from "../common/Input";
import Form from "./AccessStyle";

export default function SignIn({ isLogged, setIsLogged }) {
	const [disabled, setDisabled] = useState(false);
	const [form, setForm] = useState({});

	const navigate = useNavigate();

	if (isLogged) {
		navigate("/");
	}

	function updateForm({ name, value }) {
		setForm({
			...form,
			[name]: value,
		});
	}

	function handleForm(event) {
		event.preventDefault();

		setDisabled(true);

		const promise = signIn(form);

		promise.catch(({ response }) => {
			window.alert(response.data.message);
			setDisabled(false);
		});

		promise.then(({ data }) => {
			const storage = JSON.parse(localStorage.getItem("shortly"));

			storage.token = data.token;

			localStorage.setItem("shortly", JSON.stringify(storage));

			setIsLogged(true);

			navigate("/");
		});
	}

	return (
		<Form onSubmit={handleForm}>
			<Input
				required
				autocomplete="off"
				type="email"
				name="email"
				placeholder="E-mail"
				disabled={disabled}
				onChange={(e) =>
					updateForm({ name: e.target.name, value: e.target.value })
				}
			/>

			<Input
				required
				autocomplete="off"
				type="password"
				name="password"
				placeholder="Senha"
				disabled={disabled}
				onChange={(e) =>
					updateForm({ name: e.target.name, value: e.target.value })
				}
			/>

			<Button
				margin="49px 0 0 0"
				disabled={!(form.email && form.password) || disabled}
			>
				Entrar
			</Button>
		</Form>
	);
}
