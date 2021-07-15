import Image from 'next/image';
import { ThumbUpIcon } from '@heroicons/react/solid';
import { forwardRef } from 'react';
import Link from 'next/link';

// eslint-disable-next-line react/display-name
const Thumbnail = forwardRef(({ result}, ref) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original/';
  return (
      <div ref={ref} className="p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50">
          <Link href={`/movies/${result?.id}&category=${result.media_type || 'movie'}`}>
            <a>
              <Image 
                layout="responsive"
                src={`${baseUrl}${result.backdrop_path || result.poster_path}` || `${baseUrl}${result.poster_path}`}
                height={720}
                width={1080}
                alt="thumbnail"
              />
              <div className="p-2">
                <p className="truncate max-w-md">{result.overview}</p>
                <h2 className="mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold">{result.title || result.original_name}</h2>
                <p className="flex items-center opacity-0 group-hover:opacity-100">
                  { result.media_type && `${result.media_type} - `}{" "}
                  { result.release_date || result.first_air_date } - {" "}
                  <ThumbUpIcon className="h-5 mx-2" /> {result.vote_count}
                </p>
              </div>
            </a>
          </Link>
      </div>
  )
})

export default Thumbnail;
