import React, { useEffect, useState } from 'react'
import Image from 'next/image';

const Movie = ({ movie }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original/';
  const currentDate = new Date();
  const releaseDate = new Date(movie?.release_date);
  const [countDownRelease, setCountDownRelease] = useState({ days: '', hours: '', minutes: '', seconds: '' });
  
  useEffect(() => {
    const { days, hours, minutes, seconds } = countdown(movie?.release_date);

    const interval = setInterval(() => setCountDownRelease({days, hours, minutes, seconds }), 1000);

    return () => clearInterval(interval);
   
  }, [movie?.release_date, countDownRelease])

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap align-middle">
        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
          <div className="w-full sm:p-4 px-4 mb-6 mt-0">
            <h1 className="title-font font-medium text-3xl mb-2 text-white">{movie?.original_name || movie?.original_title}</h1>
            <div className="leading-relaxed">
              {movie?.overview}
            </div>
          </div>
          <div className="p-4 text-center">
            <h2 className="title-font font-medium text-3xl text-white">{movie?.popularity}</h2>
            <p className="leading-relaxed">Popularity</p>
          </div>
          <div className="p-4 text-center">
            <h2 className="title-font font-medium text-3xl text-white">{movie?.vote_average}</h2>
            <p className="leading-relaxed">Vote average</p>
          </div>
          <div className="p-4 text-center">
            <h2 className="title-font font-medium text-3xl text-white">{movie?.vote_count}</h2>
            <p className="leading-relaxed">Vote count</p>
          </div>
        </div>
        <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
          <Image 
            className="object-cover object-center w-full h-full"
            src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}` || `${baseUrl}${movie?.poster_path}`}
            alt="stats"
            width={1920}
            height={1080}
            objectFit="contain"
          />

          { releaseDate > currentDate && (
            <div className="container px-5 mx-auto flex flex-wrap flex-col text-center">
              <div className="header">
                <h1 className="text-4xl text-white mt-3">Release in</h1>
              </div>            
              <div className="container px-5 mx-auto flex flex-wrap text-center justify-center">
                <div className="p-4 text-center">
                  <h2 className="title-font font-medium text-3xl text-white">{(countDownRelease.days).padStart(2,0)}</h2>
                  <p className="leading-relaxed">Days</p>
                </div>
                <div className="p-4 text-center">
                  <h2 className="title-font font-medium text-3xl text-white">{(countDownRelease.hours).padStart(2,0)}</h2>
                  <p className="leading-relaxed">Hours</p>
                </div>
                <div className="p-4 text-center">
                  <h2 className="title-font font-medium text-3xl text-white">{(countDownRelease.minutes).padStart(2,0)}</h2>
                  <p className="leading-relaxed">Minutes</p>
                </div>
                <div className="p-4 text-center">
                  <h2 className="title-font font-medium text-3xl text-white">{(countDownRelease.seconds).padStart(2,0)}</h2>
                  <p className="leading-relaxed">Seconds</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
    
  )
}

const countdown = (movieDate) => {
    const releaseDate = new Date(movieDate);
    const currentDate = new Date();

    const totalSeconds = (releaseDate - currentDate) / 1000;
    
    const days = (Math.floor(totalSeconds / 3600 / 24)) + '';
    const hours = (Math.floor(totalSeconds / 3600) % 24) + '';
    const minutes = (Math.floor(totalSeconds / 60) % 60) + '';
    const seconds = (Math.floor(totalSeconds) % 60) + '';

   return { days, hours, minutes, seconds };
}

export const getStaticPaths = async () => {
  return {
    paths:[],
    fallback: 'blocking'
  }
}

export const getStaticProps = async (ctx) => {
  const API_KEY = process.env.API_KEY;
  const { slug } = ctx.params;

  const querySlug = slug.split('&')[0];
  const queryCategory = slug.split('=')[1];


  const request = await fetch(`https://api.themoviedb.org/3/${queryCategory || 'movie'}/${querySlug}?api_key=${API_KEY}`);
  const movie = await request.json();

  return {
    props:{
      movie
    },
    revalidate: 60 * 60 * 24 // 24 Hours
  }
}

export default Movie;