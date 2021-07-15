import Thumbnail from './Thumbnail'
import FlipMove from 'react-flip-move'

const Results = ({ results: { results } }) => {

  return (
    <FlipMove className="px-5 my-10 sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:flex flex-wrap justify-center">
      {results.map((res) => (
        <Thumbnail key={res.id} result={res}/>
      ))}
      
    </FlipMove>
  )
}

export default Results
