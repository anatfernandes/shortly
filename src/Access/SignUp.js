import styled from "styled-components";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import Input from "../common/Input";

export default function SignIn({ isLogged }) {
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

		console.log(form);
	}

	return (
		<Form onSubmit={handleForm}>
			<Input
				required
				autocomplete="off"
				type="text"
				name="name"
				placeholder="Nome"
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
				onChange={(e) =>
					updateForm({ name: e.target.name, value: e.target.value })
				}
			/>

			<Button
				margin="49px 0 0 0"
				disabled={
					!(form.name && form.email && form.password && form.confirmPassword)
				}
			>
				Criar conta
			</Button>
		</Form>
	);
}

const Form = styled.form`
	width: 90%;
	height: 100%;
	max-width: 770px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 350px 0 0;
`;
