import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import './App.css';
import ErrorModal from './components/ErrorModal';
import ResultList from './components/ResultList';
import { useState } from 'react';

function App() {
  const [word, setWord] = useState("");
  const [numberOfWord, setNumberOfWord] = useState(1);
  const [typeOfRhyme, setTypeOfRhyme] = useState("Select Type Of Rhyme");

  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const handleClose = () => setShowError(false);
  const handleShow = () => setShowError(true);

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  const handleNumberOfWordChange = (event) => {
    setNumberOfWord(event.target.value);
  };

  const handleGenerate = (event) => {
    event.preventDefault();
    if (word === "") {
      setErrorText("You need to type a word to generate a rhyme words!")
      handleShow();
    } else if (typeOfRhyme === "Select Type Of Rhyme") {
      setErrorText("You select a type of rhyme to generate!")
      handleShow();
    } else {
      console.log('Word value:', word);
      console.log('numberOfWord value:', numberOfWord);
      console.log('typeOfRhyme value:', typeOfRhyme);
      setWord('');
      setNumberOfWord(1);
      setTypeOfRhyme("Select Type Of Rhyme");
    }
  };

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark" className="topBar">
        <Container>
          <Navbar.Brand>Rhyme Generator AI</Navbar.Brand>
        </Container>
      </Navbar>

      <div className='mainScreen'>
        <div className='adDiv'></div>
        <div className='mainDiv'>
          <div className='wordInput'>
            <Form.Label htmlFor="word">Word :</Form.Label>
            <Form.Control
              type="text"
              id="word"
              value={word}
              onChange={handleWordChange}
            />
            <Form.Text id="passwordHelpBlock" muted>
              Type a word to generate words that rhymes.
            </Form.Text>
          </div>
          <div className='numberOfWordContainer'>
            <Form.Label htmlFor="numberOfWordToGenerate">Number Of Words to Generate :</Form.Label>
            <Form.Control
              type="number"
              id="numberOfWordToGenerate"
              value={numberOfWord}
              onChange={handleNumberOfWordChange}
            />
          </div>
          <div className='setOfButtons'>
            <DropdownButton id="dropdown-basic-button" title={typeOfRhyme} variant='dark' className='typeOfRhymeMenu'>
              <Dropdown.Item onClick={() => { setTypeOfRhyme("Perfect Rhyme") }}>Perfect Rhyme</Dropdown.Item>
              <Dropdown.Item onClick={() => { setTypeOfRhyme("Slant Rhyme") }}>Slant Rhyme</Dropdown.Item>
              <Dropdown.Item onClick={() => { setTypeOfRhyme("Eye Rhyme") }}>Eye Rhyme</Dropdown.Item>
              <Dropdown.Item onClick={() => { setTypeOfRhyme("Masculine Rhyme") }}>Masculine Rhyme</Dropdown.Item>
              <Dropdown.Item onClick={() => { setTypeOfRhyme("Feminine Rhyme") }}>Feminine Rhyme</Dropdown.Item>
              <Dropdown.Item onClick={() => { setTypeOfRhyme("Internal Rhyme") }}>Internal Rhyme</Dropdown.Item>
              <Dropdown.Item onClick={() => { setTypeOfRhyme("Identical Rhyme") }}>Identical Rhyme</Dropdown.Item>
              <Dropdown.Item onClick={() => { setTypeOfRhyme("All in Random") }}>All in Random</Dropdown.Item>
            </DropdownButton>
            <Button variant="success" className='generateButton' onClick={handleGenerate}>Generate!</Button>
          </div>

          <ResultList className="resultList"></ResultList>
        </div>
        <div className='adDiv'></div>
      </div>
      <ErrorModal
        show = {showError}
        handleClose = {handleClose}
        errorText = {errorText}
      ></ErrorModal>
    </div>
  );
}

export default App;
