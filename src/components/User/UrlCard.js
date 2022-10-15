import styled from "styled-components";
import { deleteUrl } from "../../service/shortly";

import trashImg from "../assets/trash.svg";

export default function UrlCard({
	update,
	setUpdate,
	id,
	shortUrl,
	url,
	visitCount,
}) {
	function deleteUrlFunction() {
		const promise = deleteUrl(id);

		promise.catch(() => {
			window.alert("Sentimos muito, não foi possível excluir a url.");
		});

		promise.then(() => {
			setUpdate(!update);
		});
	}

	return (
		<Wrapper>
			<Info>
				<span>{url}</span>
				<Short>{shortUrl}</Short>
				<Quantity>{`Quantidade de visitantes: ${visitCount}`}</Quantity>
			</Info>

			<Delete>
				<img src={trashImg} alt="excluir url" onClick={deleteUrlFunction} />
			</Delete>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	border-radius: 12px 0 0 12px;
	margin: 21px 0;
	overflow: hidden;
`;

const Delete = styled.div`
	width: 130px;
	height: 60px;
	background-color: var(--white);
	border: 1px solid rgba(120, 177, 89, 0.25);
	border-radius: 0 12px 12px 0;
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		height: 22px;
		cursor: pointer;
	}
`;

const Info = styled.div`
	width: 100%;
	height: 60px;
	background-color: var(--light-green);
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 21px;
	font-size: 14px;
	color: var(--white);
	span {
		width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`;

const Short = styled.span`
	&& {
		width: fit-content;
	}
`;

const Quantity = styled.span`
	&& {
		width: 250px;
	}
`;
