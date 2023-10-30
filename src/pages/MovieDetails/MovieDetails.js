import { useEffect, useState } from "react";
import { useLocation, useParams, Outlet } from "react-router-dom";
import { apiMoviesById } from "../../components/api";
import StarRating from "../../components/StarRating/StarRating";
import toast, { Toaster } from "react-hot-toast";
import {
  DetailsContainer,
  DetailsCard,
  DetailsTextWrapper,
  Img,
  DetailsTitle,
  DetailsGenre,
  GenresWrapper,
  Genre,
  MovieDetailsText,
  TextWrapper,
  BackLinkWrapper,
  BackLink,
  BackArrow,
  CastLink,
  CastMenu,
  CastIcon,
  CastItems,
} from "./MovieDetails.styled";

export default function Details() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const backLinkHref = location.state?.from ?? "/movies";

  useEffect(() => {
    async function getMoviesById() {
      try {
        const movie = await apiMoviesById(movieId);
        setMovies(movie);
      } catch (error) {
        toast.error("Oops, something went wrong! Reload this page!");
      }
    }
    getMoviesById();
  }, [movieId, setMovies]);

  function formatNumber(number) {
    if (number % 1 === 0) {
      return Math.floor(number);
    } else {
      return number;
    }
  }

  const {
    title,
    genres,
    overview,
    release_date,
    poster_path,
    vote_average,
    id,
  } = movies;
  return (
    <DetailsContainer>
      <DetailsCard>
        <>
          <BackLinkWrapper>
            <BackArrow />
            <BackLink to={backLinkHref}>Back to movies</BackLink>
          </BackLinkWrapper>
          <Img
            src={
              poster_path
                ? `
http://image.tmdb.org/t/p/w200${poster_path}`
                : `${process.env.PUBLIC_URL}/images/noImage.webp`
            }
            alt={title}
          />
        </>
        <DetailsTextWrapper>
          <DetailsTitle>{title}</DetailsTitle>
          <TextWrapper>
            <DetailsGenre>Genres:</DetailsGenre>
            <GenresWrapper>
              {genres === undefined ? (
                ""
              ) : (
                <>
                  {genres.map(({ name }) => (
                    <Genre key={name}>{name}</Genre>
                  ))}
                </>
              )}
            </GenresWrapper>
          </TextWrapper>
          <TextWrapper>
            <DetailsGenre>Release Date:</DetailsGenre>
            <Genre>{release_date}</Genre>
          </TextWrapper>
          <StarRating
            maxRating={10}
            rating={
              vote_average !== undefined &&
              formatNumber(vote_average.toFixed(1))
            }
            value={
              vote_average !== undefined &&
              formatNumber(vote_average.toFixed(1))
            }
          />
          <TextWrapper>
            <DetailsGenre>Overview:</DetailsGenre>
            <MovieDetailsText>{overview}</MovieDetailsText>
          </TextWrapper>
          <CastMenu>
            <CastItems>
              <CastLink to={`/movies/${id}/cast`}>
                Cast
                <CastIcon />
              </CastLink>
            </CastItems>
            <CastItems>
              <CastLink to={`/movies/${id}/reviews`}>
                Reviews
                <CastIcon />
              </CastLink>
            </CastItems>
          </CastMenu>
          <Outlet />
        </DetailsTextWrapper>
      </DetailsCard>
      <Toaster position="top-right" />
    </DetailsContainer>
  );
}
