import styled from 'styled-components';

function FileInput({ onChange, text }) {
  return (
    <>
      <input
        style={{ display: 'none' }}
        id="files"
        type="file"
        onChange={onChange}
      />
      <Label for="files">{text}</Label>
    </>
  );
}

const Label = styled.label`
  cursor: pointer;
`;

export default FileInput;
