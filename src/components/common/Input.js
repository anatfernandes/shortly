import styled from "styled-components";

function Input({ ...otherProps }) {
	return <Wrapper {...otherProps}></Wrapper>;
}

export default Input;

const Wrapper = styled.input`
	width: ${(props) => (props.width ? props.width : "100%")};
	max-width: 769px;
	height: 60px;
	border-radius: 12px;
	border: none;
	box-shadow: 0 4px 24px 0 rgb(120 177 89 / 25%);
	padding: 0 20px;
	margin: 12px 0;
	font-size: 18px;
	color: var(--gray);

	&::placeholder {
		font-size: 14px;
	}

	&:-webkit-autofill {
		font-family: "Raleway", sans-serif;
		font-size: 14px;
		-webkit-text-fill-color: var(--gray);
		-webkit-box-shadow: 0 0 0 30px var(--white) inset;
	}
`;
