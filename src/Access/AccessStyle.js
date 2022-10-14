import styled from "styled-components";

export default function Form({ children, ...otherProps }) {
	return <Wrapper {...otherProps}>{children}</Wrapper>;
}

const Wrapper = styled.form`
	width: 90%;
	height: 100%;
	max-width: 770px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin: 350px 0 0;
`;
