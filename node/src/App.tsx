import React from 'react';
import logo from './logo.svg';
import './App.css';
import usage_file from './data/usage.json';
import { useState, useEffect } from 'react';
import Pokemon from './components/Pokemon';
import pokemon from './types/pokemon';
import pokedex_file from './data/test.json'
import Type_button from './components/Type_Button';
import react from '@vitejs/plugin-react-swc';
import { Performance } from 'perf_hooks';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';


function App() {
  const [pokedex, setPokedex] = useState<pokemon[]>([]);
  const [display_pokemon, setDisplay_pokemon] = useState<pokemon[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [t1, setT1] = useState<number>(0);
  const [t2, setT2] = useState<number>(0);
  const type_list = ["Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"]

  useEffect(() => {

    setPokedex(prevState => (
      []
    ));

    const temp_pokedex: pokemon[] = [];

    Object.keys(pokedex_file).forEach((key) => {
      temp_pokedex.push({ name: key, number: pokedex_file[key].num, types: pokedex_file[key].types, usage: usage_file[key] })
    });

    setPokedex(prevState => (
      temp_pokedex
    ));
  }, [])


  // select the proper 
  useEffect(() => {

    setDisplay_pokemon(prevState => (
      []
    ));


    const alg_1_list = pokedex;
    const alg_2_list = pokedex;

    let start = performance.now();
    //alg_1_list = ALGNUMBER1(alg_1_list);
    let end = performance.now();
    setT1(end - start);

    start = performance.now();
    //alg_2_list = ALGNUMBER2(alg_2_list);
    end = performance.now();
    setT2(end - start);


    alg_1_list.forEach((p) => {
      let temp: boolean = true;
      for (const t of type) {
        if (!p.types.includes(t)) {
          temp = false;
        }
      }
      if (temp) {
        setDisplay_pokemon(prevState => ([...prevState, p]));
      }
    });
  }, [type, pokedex]);

  const handle_types = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    if (e.target.checked) {
      setType(prevState => [...prevState, (e.target.name)])
    }
    else {

      const index = type.indexOf(e.target.name);
      console.log(index)
      setType(prevState => [...prevState.slice(0, index), ...prevState.slice(index + 1)])
    }
  }
  return (
    <div className="App">
      <div className="App__header">
        <div className="header__title">
          Pokemon Showdown Showcase

        </div>
      </div>
      <div className='App__content'>
        <div className='content__options'>
          {type_list.map((t) =>
            <Type_button type_name={t} handle_types={handle_types}></Type_button>
          )}
          <br></br>
          <div className='options__time'>
            Alg1 Time : {t1}
            <br></br>
            Alg2 Time : {t2}
          </div>
        </div>
        <div className="content__pokemonlist">
          {display_pokemon.map((mon, index) =>
            <Pokemon key={index} {...mon}></Pokemon>
          )}
        </div>
      </div>

    </div>
  );

}

export default App;
