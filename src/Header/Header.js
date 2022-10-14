import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

import logo from "../assets/logo.svg";

export default function Header({ isLogged }) {
	const { pathname } = useLocation();
	const username = JSON.parse(localStorage.getItem("shortly"))?.user;

	return (
		<Wrapper>
			<Menu>
				{isLogged && username ? (
					<>
						<span>
							<em>Seja bem vindo(a), {username}!</em>
						</span>

						<div>
							<span>
								<Link to="/">Home</Link>
							</span>
							<span>
								<Link to="/ranking">Ranking</Link>
							</span>
							<span>
								<Link>
									<i>Sair</i>
								</Link>
							</span>
						</div>
					</>
				) : (
					<>
						<div></div>
						<div>
							{pathname === "/sign-up" ? (
								<>
									<span>
										<Link to="/sign-in">Entrar</Link>
									</span>
									<span>
										<Link to="/sign-up">
											<em>Cadastrar-se</em>
										</Link>
									</span>
								</>
							) : (
								<>
									<span>
										<Link to="/sign-in">
											<em>Entrar</em>
										</Link>
									</span>
									<span>
										<Link to="/sign-up">Cadastrar-se</Link>
									</span>
								</>
							)}
						</div>
					</>
				)}
			</Menu>

			<img src={logo} alt="shortly" />
		</Wrapper>
	);
}

const Wrapper = styled.header`
	width: 100%;
	height: auto;
	padding-bottom: 20px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--white);
	font-size: 14px;
	color: var(--gray);

	img {
		width: 310px;
	}

	a {
		color: var(--gray);
	}
`;

const Menu = styled.section`
	width: 80%;
	height: 100px;
	padding-top: 60px;
	display: flex;
	justify-content: space-between;

	span {
		margin: 0 10px;
	}
`;
