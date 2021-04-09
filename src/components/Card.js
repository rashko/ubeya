import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin: 20px 0;
  padding: 8px;
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  transition: all 300ms;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

const Image = styled.img`
  width: 80px;
  border: solid 2px #000;
`;

const Title = styled(Link)`
  font-size: 14;
  color: #333;
  text-decoration: none;
`;

const Card = ({ title, image, page, id }) => {
  return (
    <Container key={title}>
      <Title to={`/${page}/${id}`}>{title}</Title> 
      <Image src={image} />
    </Container>
  );
};
export default Card;
