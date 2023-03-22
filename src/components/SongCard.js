import Grid from '@mui/material/Grid';
// Styled components
import styled from 'styled-components';

const SongCard = ({ music, playMusic }) => {
  return (
    <>
      {music.map((item) => (
        <GridItem>
          <SimpleContainer
            key={item.link}
            cover={item.cover}
            onClick={() => playMusic(item)}
          >
            <ImgContainer>
              <img src={item.cover} alt="song cover" />
            </ImgContainer>
            <Paragraph>{item.name}</Paragraph>
          </SimpleContainer>
        </GridItem>
      ))}
    </>
  );
};

const GridItem = styled(Grid).attrs((props) => ({
  item: true,
  xs: 5,
  sm: 3,
  md: 2,
}))``;

const SimpleContainer = styled.div`
  text-align: center;
  cursor: pointer;
  height: 200px;
  box-shadow: 5px 4px 12px lightgrey;
`;

const ImgContainer = styled.div`
  height: 75%;
  width: 100%;
  &:hover {
    opacity: 0.7;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Paragraph = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  text-overflow: ellipsis;
`;

export default SongCard;
