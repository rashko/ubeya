import React, { useRef } from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "react-query";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { getFeed } from "../api/api";
import Card from "./Card";

const List = styled.div`
  height: 90vh;
  width: 300px;
  overflow-y: scroll;
  padding: 20px;
`;

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
              <Card
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
