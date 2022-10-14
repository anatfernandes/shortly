import styled from "styled-components";

export default function Form({ children, ...otherProps }) {
	return <Wrapper {...otherProps}>{children}</Wrapper>;
}

const Wrapper = styled.form`
	width: 90%;
	height: 80%;
	max-width: 770px;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 400px 0 0;
`;
