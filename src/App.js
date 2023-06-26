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

  const [showResult, setShowResult] = useState(false);
  const [resultText, setResultText] = useState("");

  const handleCloseError = () => setShowError(false);
  const handleShowError = () => setShowError(true);
  const handleShowResult = () => setShowResult(true);

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
      handleShowError();
    } else if (typeOfRhyme === "Select Type Of Rhyme") {
      setErrorText("You select a type of rhyme to generate!")
      handleShowError();
    } else {
      console.log('Word value:', word);
      console.log('numberOfWord value:', numberOfWord);
      console.log('typeOfRhyme value:', typeOfRhyme);
      onGenerate();
      handleShowResult();
    }
  };

  async function onGenerate(event) {
    try {
      const response = await fetch("./api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          baseWord: word,
          numberOfWord: numberOfWord,
          typeOfRhyme: typeOfRhyme,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResultText(data.result);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

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

          <ResultList
            className="resultList"
            showResult={showResult}
          ></ResultList>
        </div>
        <div className='adDiv'></div>
      </div>
      <ErrorModal
        show = {showError}
        handleClose = {handleCloseError}
        errorText = {errorText}
      ></ErrorModal>
    </div>
  );
}

export default App;
