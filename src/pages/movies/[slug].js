import React from 'react'
import Image from 'next/image';

const Movie = ({ movie }) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original/';

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
          <div className="w-full sm:p-4 px-4 mb-6">
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
          {/* <div className="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
            <h2 className="title-font font-medium text-3xl text-white">4</h2>
            <p className="leading-relaxed">Products</p>
          </div> */}
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
        </div>
      </div>
    </section>
    
  )
}

// https://api.themoviedb.org/3/tv/60625?api_key=c44a04a19a44b41c1f06d5f544ae8557


// export const getServerSideProps = async (ctx) => {
//   console.log(ctx);
//   const API_KEY = process.env.API_KEY;
//   const  { slug, category} = ctx.query;

//   const request = await fetch(`https://api.themoviedb.org/3/${category}/${slug}?api_key=${API_KEY}`);
//   const movie = await request.json();

//   return {
//     props:{
//       movie
//     }
//   }
// }

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