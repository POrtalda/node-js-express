import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Songs from './components/Songs/Songs';
import NewSong from './components/NewSong/NewSong';
import EditSong from './components/EditSong/EditSong';

function App() {
  const [songs, setSongs] = useState([
    { id: 1, title: 'Song 1', artist: 'Artist 1' },
    { id: 2, title: 'Song 2', artist: 'Artist 2' },
    { id: 3, title: 'Song 3', artist: 'Artist 3' }
  ]);

  

  return (
    <>
      <h1>SongsApp</h1>

      <div id='main'>
        <Songs songs={songs} />
        <NewSong />
        <EditSong />
      </div>
    </>
  )
}

export default App
 