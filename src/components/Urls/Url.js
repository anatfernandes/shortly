import styled from "styled-components";
import { useState, useEffect } from "react";

import { useMessage } from "../../contexts/messageContext";
import { getUrl } from "../../service/shortly";

export default function Url({ id, url }) {
	const [urls, setUrls] = useState([]);
	const { setMessage } = useMessage();

	function searchUrl () {
		const promise = getUrl(id);

		promise.catch(() => {
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "Sentimos muito, não foi possível carregar as urls. Por favor, recarregue a página.",
				},
			});
		});

		promise.then(({ data }) => {
			console.log(data)
		});
	}


	return (
		<Wrapper onClick={searchUrl}>
				<span>{url}</span>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 80%;
	height: 60px;
	background-color: var(--light-green);
	display: flex;
	align-items: center;
	justify-content: flex-start;
	    margin: 10px 0;
	border-radius: 12px;
	padding: 21px;
	font-size: 14px;
	color: var(--white);

	span {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

&:hover {
    filter: brightness(1.1);
}
`;
