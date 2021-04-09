import React, { useRef } from "react";
import styled from "styled-components";
import { useQueryClient, useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { getFeed } from "./api";

const List = styled.div`
  height: 50vh;
  overflow-y: auto;
  width: 200px;
`;
const Card = styled.div`
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 8px;
  background-color: #ccc;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100px;
  margin-top: 10px;
`;

const Title = styled(Link)`
  font-size: 18px;
`;

const CardComponent = ({ title, image, page, id }) => {
  return (
    <Card key={title}>
      <Title to={`/${page}/${id}`}>{title}</Title> <Image src={image} />
    </Card>
  );
};
const Feed = () => {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery("feed", getFeed, {
    getNextPageParam: (lastPage, pages) => {
      const totalPages = Math.ceil(lastPage.totalResults / 20);
      const nextPage = pages.length + 1;
      return nextPage < totalPages ? nextPage : false;
    },
    staleTime: 5000,
    cacheTime: 10,
  });

  const loadMoreButtonRef = useRef();
  const listRef = useRef();

  useIntersectionObserver({
    root: listRef,
    target: loadMoreButtonRef,
    onIntersect: fetchNextPage,
  });

  return (
    <div>
      <List ref={listRef}>
        {data?.pages?.map((page, i) => (
          <React.Fragment key={i}>
            {page.articles.map((article) => (
              <CardComponent
                key={article.id}
                title={article.title}
                image={article.urlToImage}
                id={article.id}
                page={i}
              />
            ))}
          </React.Fragment>
        ))}
        <button
          onClick={() => fetchNextPage()}
          ref={loadMoreButtonRef}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </button>
      </List>
    </div>
  );
};

export default Feed;
