import React from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "react-query";

const Article = () => {
  const { page, id } = useParams();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData("feed");
  const article = data.pages[page].articles.find((a) => a.id === id);
  return <div>Article {id}</div>;
};

export default Article;
