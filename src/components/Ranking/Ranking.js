import styled from "styled-components";
import { useEffect, useState } from "react";

import { getRanking } from "../../service/shortly";

import trophyImg from "../assets/trophy.svg";

export default function Ranking({ isLogged }) {
	const [ranking, setRanking] = useState([]);

	useEffect(() => {
		const promise = getRanking();

		promise.catch(() => {
			window.alert(
				"Sentimos muito, não foi possível buscar o ranking. Por favor, recarregue a página."
			);
		});

		promise.then(({ data }) => {
			setRanking(data);
		});
	}, []);

	return (
		<Main>
			<Title>
				<img src={trophyImg} alt="ranking" />

				<h1>Ranking</h1>
			</Title>

			<Background>
				{ranking.map((rank, index) => (
					<li key={index}>
						<b>{`${index + 1} - ${rank.name}`} </b>{" "}
						{` - ${rank.linksCount} links - ${rank.visitCount} visualizações`}
					</li>
				))}
			</Background>

			{isLogged ? "" : <span>Crie sua conta para usar nosso serviço!</span>}
		</Main>
	);
}

const Main = styled.main`
	& > span {
		font-size: 32px;
		font-weight: 700;
		margin: 0 10px 50px 0;
	}
`;

const Title = styled.div`
	display: flex;

	img {
		height: 35px;
		margin: 0 10px 0 0;
	}

	h1 {
		font-size: 32px;
		font-weight: 700;
	}
`;

const Background = styled.ul`
	width: 100%;
	height: 100%;
	padding: 30px;
	background-color: var(--white);
	border-radius: 12px 12px 5px 5px;
	border: 1px solid rgba(120, 177, 89, 0.25);
	box-shadow: 0 4px 24px 0 rgb(120 177 89 / 25%);
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin: 60px 0 80px;
	font-size: 20px;

	li {
		padding: 5px 0;
	}
`;
