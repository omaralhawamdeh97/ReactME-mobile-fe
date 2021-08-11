import styled from "styled-components/native";

export const LoginButton = styled.TouchableOpacity`
  align-self: stretch;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.backgroundColor};
  margin-top: 30px;
  border-radius: 10px;
  width: 88%;
  align-self: center;
`;

export const LoginText = styled.Text`
  color: ${(props) => props.color};
`;
