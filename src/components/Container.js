import styled from "styled-components";

export const ContainerFluid = styled.div`
	background-color: ${(props) => props.theme.bgColor};
	color: ${(props) => props.theme.color};
	border: 5px solid ${(props) => props.theme.color};
	padding: 15px;
	margin-right: auto;
	margin-left: auto;
`;

export const Container = styled.div`
	background-color: ${(props) => props.theme.bgColor};
	color: ${(props) => props.theme.color};
	border: 5px solid ${(props) => props.theme.color};
	padding: 15px;
	margin-right: auto;
	margin-left: auto;
	max-width: 760px;
	@media screen and (max-width: 768px) {
		padding: 10px;
	}
`;
