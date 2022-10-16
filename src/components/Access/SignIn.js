import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../contexts/messageContext";
import { signIn } from "../../service/shortly";

import Button from "../common/Button";
import Input from "../common/Input";
import Form from "./AccessStyle";

export default function SignIn({ setIsLogged }) {
	const [disabled, setDisabled] = useState(false);
	const [form, setForm] = useState({});
	const { setMessage } = useMessage();

	const navigate = useNavigate();

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
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: response.data.message,
				},
			});

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
