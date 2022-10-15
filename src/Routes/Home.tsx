import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 200px 60px 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 58px;
`;

const Overview = styled.p`
  width: 50%;
`;

export default function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowplaying"], getMovies);
  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>로딩...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[6].backdrop_path || "")}>
            <Title>{data?.results[6].title}</Title>
            <Overview>{data?.results[6].overview}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
}
