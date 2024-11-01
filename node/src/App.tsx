import React from 'react';
import logo from './logo.svg';
import './App.css';
import usage_file from './data/usage.json';
import { useState, useEffect } from 'react';
import Pokemon from './components/Pokemon';
import pokemon from './types/pokemon';
import pokedex_file from './data/test.json'
import react from '@vitejs/plugin-react-swc';


function App() {
  const [test, setTest] = useState<boolean>(false);
    const [pokedex, setPokedex] = useState<pokemon[]>([]);


  useEffect(() => {

    setPokedex(prevState => (
      []
    ));

    Object.keys(pokedex_file).forEach((key) => {
      setPokedex(prevState => (
        [...prevState, { name: key,number: pokedex_file[key].num, types: pokedex_file[key].types, usage: usage_file[key] }]
      ))
    });

  }, [])


  return (
    <div className="App">
      <div className="App__pokemonlist">
        {pokedex.map((mon, index) =>
          <Pokemon key={index} {...mon}></Pokemon>
        )}
    </div>
    </div>
  );

}

export default App;
