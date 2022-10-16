import styled from "styled-components";
import { useLocation, useNavigate, Link } from "react-router-dom";

import { useMessage } from "../../contexts/messageContext";

import { logout } from "../../service/shortly";

import logo from "../assets/logo.svg";

export default function Header({ isLogged, setIsLogged }) {
	const { setMessage } = useMessage();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const username = JSON.parse(localStorage.getItem("shortly"))?.user;

	function logoutFunction() {
		const storage = localStorage.getItem("shortly");

		if (storage) {
			const promise = logout();

			promise.catch(() => {
				setMessage({
					type: "alert",
					message: {
						type: "error",
						text: "Sentimos muito, não foi possível deslogar. Por favor, tente novamente",
					},
				});
			});

			promise.then(() => {
				const user = JSON.parse(localStorage.getItem("shortly"))?.user;

				localStorage.setItem("shortly", JSON.stringify({ user }));

				setIsLogged(false);

				navigate("/");
			});
		}
	}

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

							<span onClick={logoutFunction}>
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

			<Link to="/">
				<img src={logo} alt="shortly" />
			</Link>
		</Wrapper>
	);
}

const Wrapper = styled.header`
	width: 100%;
	height: auto;
	padding-bottom: 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--white);
	font-size: 14px;
	color: var(--gray);
	z-index: 2;

	img {
		width: 310px;
		margin: 100px 0 0;
	}

	a {
		color: var(--gray);
	}
`;

const Menu = styled.section`
	width: 100%;
	height: 100px;
	padding: 60px 60px 0;
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	margin: 0 auto;
	background-color: var(--white);
	z-index: 2;

	span {
		margin: 0 10px;
	}
`;
