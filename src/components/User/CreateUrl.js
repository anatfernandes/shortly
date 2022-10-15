import styled from "styled-components";
import { useState } from "react";

import { postUrl } from "../../service/shortly";

import Button from "../common/Button";
import Input from "../common/Input";

export default function CreateUrl({ update, setUpdate }) {
	const [disabled, setDisabled] = useState(false);
	const [form, setForm] = useState({});

	function handleForm(event) {
		event.preventDefault();

		setDisabled(true);

		const promise = postUrl(form);

		promise.catch(({ response }) => {
			window.alert(response.data.message);
			setDisabled(false);
		});

		promise.then(() => {
			setDisabled(false);
			setUpdate(!update);
		});
	}

	return (
		<Form onSubmit={handleForm}>
			<Input
				required
				autocomplete="off"
				type="url"
				name="url"
				placeholder="Links que cabem no bolso"
				disabled={disabled}
				onChange={(e) => setForm({ url: e.target.value })}
			/>

			<Button margin="0 0 0 70px" disabled={!form.url || disabled}>
				Encurtar link
			</Button>
		</Form>
	);
}

const Form = styled.form`
	width: 100%;
	display: flex;
	align-items: center;
`;
