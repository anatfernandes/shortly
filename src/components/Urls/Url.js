import styled from "styled-components";
import { useState } from "react";

import { useMessage } from "../../contexts/messageContext";
import { getUrl, openUrl } from "../../service/shortly";

export default function Url({ id, url }) {
	const [fullUrl, setFullUrl] = useState({});
	const { setMessage } = useMessage();

	function searchUrl() {
		const promise = getUrl(id);

		promise.catch(() => {
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "Sentimos muito, não foi possível buscar a url.",
				},
			});
		});

		promise.then(({ data }) => {
			setFullUrl(data);
		});
	}

	function openUrlFunction() {
		const promise = openUrl(fullUrl.shortUrl);

		promise.catch(() => {
			window.open(fullUrl.url);
		});

		promise.then(() => {
			window.open(fullUrl.url);
		});
	}

	return (
		<Wrapper
			onClick={
				fullUrl.shortUrl
					? function () {
							return;
					  }
					: searchUrl
			}
		>
			{fullUrl.shortUrl ? (
				<>
					<span>
						<i>URL:</i> {fullUrl.url}
					</span>

					<ShortUrl onClick={openUrlFunction}>
						<i>URL encurtada:</i> {fullUrl.shortUrl}
					</ShortUrl>
				</>
			) : (
				<span>{url}</span>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 80%;
	height: auto;
	background-color: var(--light-green);
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	margin: 10px 0;
	border-radius: 12px;
	padding: 21px;
	font-size: 14px;
	line-height: 18px;
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

const ShortUrl = styled.span`
	&& {
		width: fit-content;
		cursor: pointer;
	}
`;
