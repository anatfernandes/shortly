import styled from "styled-components";

function Button({ children, ...otherProps }) {
	return <Wrapper {...otherProps}>{children}</Wrapper>;
}

export default Button;

const Wrapper = styled.button`
	width: 182px;
	height: 60px;
	border-radius: 12px;
	border: none;
	background-color: var(--dark-green);
	margin: ${(props) => (props.margin ? props.margin : "0")};
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	font-weight: 700;
	color: var(--white);
	cursor: pointer;

	&:hover {
		filter: brightness(0.9);
	}

	&:active {
		filter: brightness(0.8);
		transform: translateY(1px);
	}

	&:disabled {
		filter: brightness(0.7);
		transform: translateY(0);
		cursor: initial;
	}
`;
