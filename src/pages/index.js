// import Head from 'next/head';
// import Header from '../components/Header';
// import Nav from '../components/Nav';
import Results from '../components/Results';
import requests from '../utils/request';

export default function Home({ results }) {
  return (
    <div>
      <Results results={results} />
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const { genre } = ctx.query;

  const request = await fetch(`https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchUpcoming.url}`);
  const results = await request.json();

  return {
    props:{
      results
    }
  }
}
