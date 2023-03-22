import { useState } from 'react';
//Styled components
import styled, { css } from 'styled-components';
//MUI icons
import ArrowCircleLeftIconMaterial from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIconMaterial from '@mui/icons-material/ArrowCircleRight';

const shownMusic = (searchedTerm, musicArray) => {
  const listOfMusic = musicArray.filter(
    (item) =>
      item.name.toLowerCase().includes(searchedTerm.toLowerCase()) && item,
  );
  if (searchedTerm) {
    return listOfMusic;
  } else {
    return musicArray;
  }
};

const MiniMusicList = ({ music, playSong }) => {
  const [showList, setShowList] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState('');

  const onShowList = () => {
    setShowList(!showList);
  };

  const onSearchSong = (e) => {
    setSearchedTerm(e.target.value);
  };

  return (
    <MainWrapper>
      {showList ? (
        <ArrowCircleRightIcon onClick={onShowList} />
      ) : (
        <ArrowCircleLeftIcon onClick={onShowList} />
      )}

      <ListContainer showList={showList}>
        <input
          style={{ padding: '5px', width: '50%' }}
          type="text"
          placeholder="search..."
          onChange={onSearchSong}
        />
        {shownMusic(searchedTerm, music).map((item) => (
          <Item key={item.name} onClick={() => playSong(item)}>
            {item.name}
          </Item>
        ))}
      </ListContainer>
    </MainWrapper>
  );
};

const IconStyling = css`
  color: white;
  align-self: flex-end;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const ArrowCircleLeftIcon = styled(ArrowCircleLeftIconMaterial)`
  ${IconStyling}
`;

const ArrowCircleRightIcon = styled(ArrowCircleRightIconMaterial)`
  ${IconStyling}
`;

const MainWrapper = styled.div`
  position: absolute;
  right: 50px;
  top: 10%;
  max-width: 75%;
  z-index: 2;
  display: flex;
  flex-direction: column;
`;

const ListContainer = styled.div`
  display: ${(props) => (props.showList ? 'block' : 'none')};
  color: white;
  height: 450px;
  overflow-y: scroll;
  background-color: black;
  padding: 5px;
`;

const Item = styled.p`
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

export default MiniMusicList;
