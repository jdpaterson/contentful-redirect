import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const urlHashAsObject = Object.fromEntries(
    new URLSearchParams(window.location.hash.substr(1))
  )

  const onCreateButton = async () => {
    try {
      const fetchResp = await fetch(
        '.netlify/functions/store-contentful-token/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(urlHashAsObject)
        }
      )
      const resJson = await fetchResp.json()
      console.log(resJson)
    } catch(err) {
      console.log(err)
      return err
    }
  }
  const onReadButton = async () => {
    try {
      const fetchResp = await fetch(
        `.netlify/functions/store-contentful-token/read?token=${urlHashAsObject.auth_token}`
      )
      const resJson = await fetchResp.json()
      console.log(resJson)
    } catch (err) {
      console.log(err)
      return err
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={() => onCreateButton()}
          buttonType={"primary"}
        >
          Authorize
        </button>
        <button
          onClick={() => onReadButton()}
          buttonType={"secondary"}
        >
          Read
        </button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
