import styled from "styled-components";
import { useState, useEffect } from "react";

import { useMessage } from "../../contexts/messageContext";
import { getUrls } from "../../service/shortly";

import Url from "./Url";

export default function Urls() {
	const [urls, setUrls] = useState([]);
	const { setMessage } = useMessage();
console.log(urls)
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
	}, [])


	return (
			urls.map((url, index) => (<Url key={index} {...url}/>))
	);
}


