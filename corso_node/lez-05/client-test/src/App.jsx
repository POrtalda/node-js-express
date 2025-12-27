import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Songs from './components/Songs/Songs';
import NewSong from './components/NewSong/NewSong';
import EditSong from './components/EditSong/EditSong';

function App() {
  const [songs, setSongs] = useState([]);

  // creo effetto collaterale che caricherà i dati con la fetch GET
  // deva scattare una volta , quando il componente viene montato
  useEffect(() => {
    fetch('http://localhost:3000/songs')
      .then(res => res.json())
      .then(data => setSongs(data.data))
  }, []);

  return (
    <>
      <h1>SongsApp</h1>

      <div id='main'>
        <Songs songs={songs} />
        <NewSong />
        <EditSong songs={songs} />
      </div>
    </>
  )
}

export default App
 