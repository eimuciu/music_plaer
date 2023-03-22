import React, { useState } from 'react';
import styled, { css } from 'styled-components';
// Components
import FileInput from './components/atoms/FileInput';
import TextInput from './components/atoms/TextInput';
import Button from './components/atoms/Button';

function FileUpload({ uploadNewSong }) {
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [songImageUrl, setSongImageUrl] = useState('');

  const fileInputHandler = (event) => {
    const file = event.target.files[0];
    if (file.type !== 'audio/mpeg') {
      alert('Select audio file');
      setSelectedFile();
      setIsFilePicked(false);
      return;
    }
    setSelectedFile(file);
    setIsFilePicked(true);
  };

  const handleSubmission = () => {
    if (!selectedFile) {
      alert('Select a file first!');
      return;
    }
    if (!songImageUrl) {
      alert('Song image Url is needed!');
      return;
    }
    uploadNewSong({ song: selectedFile, image: songImageUrl });
    setSelectedFile();
    setIsFilePicked(false);
    setSongImageUrl('');
  };

  const imageInputHandler = (e) => {
    setSongImageUrl(e.target.value);
  };

  return (
    <>
      <Wrapper>
        <Container>
          <Button onClick={handleSubmission}>Add Song</Button>
        </Container>
        <Container>
          <FileInput text="+" onChange={fileInputHandler} />
        </Container>
      </Wrapper>
      <Container>{isFilePicked && <p>{selectedFile.name}</p>}</Container>
      <Container>
        {isFilePicked && (
          <TextInput
            onChange={imageInputHandler}
            value={songImageUrl}
            label="Add song image URL"
          />
        )}
      </Container>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 20px 0px 20px;
`;

const spacing = css`
  padding: 0px 10px;
  text-align: center;
`;

const Container = styled.div`
  ${spacing}
`;

export default FileUpload;
