import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import styled from "styled-components";

const Container = styled.div`
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  color: #333;
  font-size: 1.2em;
  flex: 1;
  padding-right: 20px;
`;

const Image = styled.img`
  width: 90%;
`;

const Button = styled(Link)`
  background-color: #ddd;
  color: #333;
  padding: 5px 8px;
  border-radius: 8px;
  font-size: 0.8em;
  text-decoration: none;
`;

const Content = styled.div`

`

const Article = () => {
  const { page, id } = useParams();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("feed");
  const article = data.pages[page].articles.find((a) => a.id === id);
  return (
    <Container>
      <Header>
        <Title>{article.title}</Title>
        <Button to="/">Back</Button>
      </Header>
      <Image src={article.urlToImage} />
      <Content>
          {article.description}
      </Content>
    </Container>
  );
};

export default Article;
