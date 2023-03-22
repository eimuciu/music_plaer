function TextInput({ onChange, value, label }) {
  return (
    <>
      <label>{label}</label>
      <br></br>
      <input type="text" onChange={onChange} value={value} />
    </>
  );
}

export default TextInput;
