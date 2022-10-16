import styled from "styled-components";
import { useEffect, useState } from "react";

import { useMessage } from "../../contexts/messageContext";
import { getUserData } from "../../service/shortly";

import CreateUrl from "./CreateUrl";
import UrlCard from "./UrlCard";

export default function UserSection() {
	const [update, setUpdate] = useState(false);
	const [data, setData] = useState([]);
	const { setMessage } = useMessage();

	useEffect(() => {
		const promise = getUserData();

		promise.catch(() => {
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "Sentimos muito, não foi possível carregar os dados.",
				},
			});
		});

		promise.then((response) => {
			setData(response.data.shortenedUrls);
		});
	}, [update]);

	return (
		<main>
			<CreateUrl update={update} setUpdate={setUpdate} />

			<Urls>
				{data.map((rank, index) => (
					<UrlCard
						key={index}
						{...rank}
						update={update}
						setUpdate={setUpdate}
					/>
				))}
			</Urls>
		</main>
	);
}

const Urls = styled.section`
	width: 100%;
	height: 100%;
	margin: 25px 0;
`;
