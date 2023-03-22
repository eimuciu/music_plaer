import { useState, useEffect, useRef, useCallback } from 'react';
//Redux hooks
import { useDispatch, useSelector } from 'react-redux';
// Selectors
import { selectMusic, selectSongPlaying } from '../../redux/selectors';
// Actions
import {
  playTrack,
  playNextTrack,
  playPrevTrack,
} from '../../redux/musicSlice';
//MUI components
import Grid from '@mui/material/Grid';
//MUI icons
import PlayArrowIconMaterial from '@mui/icons-material/PlayArrow';
import PauseIconMaterial from '@mui/icons-material/Pause';
import SkipNextIconMaterial from '@mui/icons-material/SkipNext';
import SkipPreviousIconMaterial from '@mui/icons-material/SkipPrevious';
import ArrowCircleUpIconMaterial from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIconMaterial from '@mui/icons-material/ArrowCircleDown';
//Styled components
import styled, { keyframes, css } from 'styled-components';
//Components
import MiniMusicList from './MiniMusicList';

const usePlayerControls = (songPlaying, playNextSong) => {
  // State
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  //Refs
  const audioRef = useRef(new Audio(songPlaying.link));
  const intervalRef = useRef();
  const { duration } = audioRef.current;

  // Player controls
  const startTimer = useCallback(() => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        playNextSong();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  }, [playNextSong]);

  const startPlayer = useCallback(() => {
    audioRef.current.play();
    setIsPlaying(true);
    startTimer();
  }, [startTimer]);

  const onScrub = (e) => {
    // Clear any timers already running
    const value = e.target.value;
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    }
    startTimer();
  };

  // Hooks
  useEffect(() => {
    if (songPlaying.link && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = new Audio(songPlaying.link);
      setTrackProgress(audioRef.current.currentTime);
      startPlayer();
    }
  }, [songPlaying.link, startPlayer]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return {
    setIsPlaying,
    onScrub,
    onScrubEnd,
    duration,
    trackProgress,
    isPlaying,
    audioRef,
  };
};

const MusicPlayer = () => {
  // selectors
  const musicList = useSelector((state) => selectMusic(state));
  const songPlaying = useSelector((state) => selectSongPlaying(state));

  // Hooks
  const dispatch = useDispatch();

  //State
  const [expanded, setExpanded] = useState(false);

  // redux store actions
  const playNextSong = useCallback(() => {
    dispatch(playNextTrack());
  }, [dispatch]);

  const playPrevSong = () => {
    dispatch(playPrevTrack());
  };

  const playSong = (song) => {
    dispatch(playTrack(song));
  };

  // Player custom hook
  const {
    onScrub,
    onScrubEnd,
    setIsPlaying,
    trackProgress,
    duration,
    isPlaying,
    audioRef,
  } = usePlayerControls(songPlaying, playNextSong);

  return (
    <>
      <MainWrapper display={Boolean(songPlaying.link)} expanded={expanded}>
        {expanded && (
          <>
            <MiniMusicList music={musicList} playSong={playSong} />
            <ExpandedMusicContainer>
              <div>
                <img
                  src={songPlaying.cover}
                  alt="song"
                  style={{
                    width: '300px',
                    height: '300px',
                    borderRadius: '100%',
                  }}
                />
              </div>
              <p style={{ color: 'white' }}>{songPlaying.name}</p>
            </ExpandedMusicContainer>
          </>
        )}

        <AudioWrapper
          expanded={expanded}
          container
          justifyContent="center"
          alignItems="center"
        >
          <ControlsContainer item md={3}>
            <SkipPreviousIcon onClick={playPrevSong} />
            {isPlaying ? (
              <PauseIcon
                onClick={() => {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }}
              />
            ) : (
              <PlayArrowIcon
                onClick={() => {
                  audioRef.current.play();
                  setIsPlaying(true);
                }}
              />
            )}

            <SkipNextIcon onClick={playNextSong} />
          </ControlsContainer>
          <ProgressContainer item md={6} xs={6}>
            <Grid container alignContent="center">
              <ProgressBar
                type="range"
                value={trackProgress}
                step="1"
                min="0"
                max={duration ? duration : `${duration}`}
                onChange={onScrub}
                onMouseUp={onScrubEnd}
                onKeyUp={onScrubEnd}
              />
            </Grid>
          </ProgressContainer>
          <OptionsContainer item md={3}>
            {expanded ? (
              <ArrowCircleDownIcon onClick={() => setExpanded(!expanded)} />
            ) : (
              <ArrowCircleUpIcon onClick={() => setExpanded(!expanded)} />
            )}
          </OptionsContainer>
        </AudioWrapper>
      </MainWrapper>
    </>
  );
};

const expandAnimation = keyframes`
from {
  height: 50px;
}
to {
  height: 100%;
  
}
`;

const expandStyling = css`
  animation: ${expandAnimation} 0.2s linear;
  padding-top: 50px;
`;

const ExpandedMusicContainer = styled.div`
  ${() => expandStyling}
`;

const MainWrapper = styled(Grid)`
  display: ${(props) => (props.display ? 'block' : 'none')};
  width: 100%;
  position: fixed;
  bottom: 0px;
  justify-content: center;
  text-align: center;
  background-color: black;
  z-index: 1;
  height: ${(props) => (props.expanded ? '100%' : '50px')};
  /* ${(props) =>
    props.expanded
      ? 'display: flex; padding: 20px; flex-direction: column'
      : null}; */
  ${(props) => (props.expanded ? expandStyling : null)}
`;

const AudioWrapper = styled(Grid)`
  margin: 0 auto;
  background-color: black;
  height: 50px;
`;

const ControlsContainer = styled(Grid)``;
const ProgressContainer = styled(Grid)``;
const OptionsContainer = styled(Grid)``;
const ProgressBar = styled.input`
  width: 100%;
  height: 2px;
  &:hover {
    cursor: pointer;
  }
`;

const IconStyling = css`
  color: white;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const PauseIcon = styled(PauseIconMaterial)`
  ${IconStyling}
`;

const PlayArrowIcon = styled(PlayArrowIconMaterial)`
  ${IconStyling}
`;
const SkipNextIcon = styled(SkipNextIconMaterial)`
  ${IconStyling}
`;
const SkipPreviousIcon = styled(SkipPreviousIconMaterial)`
  ${IconStyling}
`;
const ArrowCircleUpIcon = styled(ArrowCircleUpIconMaterial)`
  ${IconStyling}
`;
const ArrowCircleDownIcon = styled(ArrowCircleDownIconMaterial)`
  ${IconStyling}
`;

export default MusicPlayer;
