import styled from "styled-components";
import { useState, useEffect } from "react";

import { useMessage } from "../../contexts/messageContext";
import { getUrls } from "../../service/shortly";

import Input from "../common/Input";
import Url from "./Url";

export default function Urls() {
	const [urls, setUrls] = useState([]);
	const [search, setSearch] = useState("");
	const { setMessage } = useMessage();

	useEffect(() => {
		const promise = getUrls();

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
			setUrls(data);
		});
	}, []);

	const urlsFiltered = urls.filter(({ url }) => url?.includes(search));

	return (
		<>
			<SearchSection>
				<Input
					type="text"
					placeholder="Buscar URL"
					onChange={(e) => setSearch(e.target.value)}
				/>
			</SearchSection>

			{urlsFiltered.map((url, index) => (
				<Url key={index} {...url} />
			))}
		</>
	);
}

const SearchSection = styled.section`
	width: 80%;
	margin: 0 auto 50px;
`;
