import { useEffect } from 'react';
import './App.css';
// Components
import Music from './components/pages/Music';
import MusicPlayer from './components/organisms/MusicPlayer';
// Music store
import { loadMusic } from './redux/musicSlice';
//Redux hooks
import { useDispatch } from 'react-redux';
//Firestore
import { getMusicUrls } from './firebase/firebase';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    getMusicUrls().then((data) => dispatch(loadMusic(data)));
  }, []);

  return (
    <>
      <MusicPlayer />
      <Music />
    </>
  );
}

export default App;
