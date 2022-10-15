import styled from "styled-components";

import { useState, useEffect } from "react";
import { useMessage } from "../../contexts/messageContext";

export default function Alert() {
	const [config, setConfig] = useState({ opacity: 0, left: "-260px" });
	const { message, setMessage } = useMessage();

	useEffect(() => {
		if (message.type !== "alert") return;

		setTimeout(() => {
			setConfig({ opacity: 1, left: "15px" });
		}, 100);
		setTimeout(() => {
			setConfig({ opacity: 0, left: "-260px" });
		}, 4000);

		setTimeout(() => {
			setMessage({ type: "" });
		}, 4500);
	}, [message?.message?.text]);

	if (message.type !== "alert") return;

	const { text, type } = message.message;

	let color = "var(--black)";

	switch (type) {
		case "error":
			color = "lightcoral";
			break;
		case "success":
			color = "var(--light-green)";
			break;
		case "warning":
			color = "rgb(239 199 58)";
			break;

		default:
			break;
	}

	return (
		<Wrapper opacity={config.opacity} left={config.left} color={color}>
			{text}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: fit-content;
	max-width: 250px;
	background-color: ${(props) => props.color};
	position: fixed;
	bottom: 15px;
	left: ${(props) => props.left};
	opacity: ${(props) => props.opacity};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border-radius: 7px 7px 7px 0;
	box-shadow: -1px 2px 6px 0 rgb(0, 0, 0, 0.3);
	font-size: 16px;
	color: var(--white);
	text-align: center;
	transition: all 0.2s linear;
	z-index: 3;
`;
