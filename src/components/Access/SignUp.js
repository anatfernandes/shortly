import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useMessage } from "../../contexts/messageContext";
import { signUp } from "../../service/shortly";

import Button from "../common/Button";
import Input from "../common/Input";
import Form from "./AccessStyle";

export default function SignUp({ isLogged }) {
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

		if (form.password !== form.confirmPassword || form.password.length < 4) {
			setMessage({
				type: "alert",
				message: {
					type: "warning",
					text: "As senhas devem ser iguais e possuir mais de 3 dígitos.",
				},
			});

			setDisabled(false);
		} else {
			const promise = signUp(form);

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

			promise.then(() => {
				localStorage.setItem("shortly", JSON.stringify({ user: form.name }));
				navigate("/sign-in");
			});
		}
	}

	return (
		<Form onSubmit={handleForm}>
			<Input
				required
				autocomplete="off"
				type="text"
				name="name"
				placeholder="Nome"
				disabled={disabled}
				onChange={(e) =>
					updateForm({ name: e.target.name, value: e.target.value })
				}
			/>

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

			<Input
				required
				autocomplete="off"
				type="password"
				name="confirmPassword"
				placeholder="Confirme a senha"
				disabled={disabled}
				onChange={(e) =>
					updateForm({ name: e.target.name, value: e.target.value })
				}
			/>

			<Button
				margin="49px 0 0 0"
				disabled={
					!(form.name && form.email && form.password && form.confirmPassword) ||
					disabled
				}
			>
				Criar conta
			</Button>
		</Form>
	);
}
