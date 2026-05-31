import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Videos from '../components/Videos'

import { fetchFromAPI } from '../utils/fetchData'

const SearchFeed = () => {
  const { searchTerm } = useParams()

  const [videos, setVideos] = useState([])

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
      .then((data) => setVideos(data.items))
  }, [searchTerm])

  return (
    <div>
      <Navbar />

      <h1 className='text-3xl font-bold px-6 mt-6'>
        Search Results For: {searchTerm}
      </h1>

      <Videos videos={videos} />
    </div>
  )
}

export default SearchFeed