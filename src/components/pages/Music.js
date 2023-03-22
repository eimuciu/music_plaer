import React, { useState } from 'react';
//Redux hooks
import { useSelector, useDispatch } from 'react-redux';
//MUI components
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
//Firestore
import { uploadSong } from '../../firebase/firebase';
//Music actions
import { addSong, playTrack } from '../../redux/musicSlice';
//Components
import Loader from '../atoms/Loader';
import SongCard from '../SongCard';
import FileUpload from '../../FileUpload';
//Styled components
import styled from 'styled-components';
// Selectors
import { selectMusic } from '../../redux/selectors';

function H2({ text }) {
  const styles = { textAlign: 'center' };
  return (
    <Typography variant="h2" style={styles}>
      {text}
    </Typography>
  );
}

const Music = () => {
  const dispatch = useDispatch();
  const music = useSelector((state) => selectMusic(state));
  const [isLoading, setIsLoading] = useState(false);

  const playSong = (song) => {
    dispatch(playTrack(song));
  };

  const uploadNewSong = (songToUpload) => {
    setIsLoading(true);
    uploadSong(songToUpload).then((data) => {
      dispatch(addSong(data));
      setIsLoading(false);
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <H2 text="Music player" />
      <FileUpload uploadNewSong={uploadNewSong} />
      <GridContainer>
        <SongCard music={music} playMusic={playSong} />
      </GridContainer>
    </>
  );
};

const GridContainer = styled(Grid).attrs(() => ({
  container: true,
  justifyContent: 'center',
  rowSpacing: 2,
  columnSpacing: 2,
}))`
  padding: 50px 20px;
`;

export default Music;
