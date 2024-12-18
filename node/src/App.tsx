import React from "react";
import "./App.css";
import usage_file from "./data/usage.json";
import { useState, useEffect } from "react";
import Pokemon from "./components/Pokemon";
import pokemon from "./types/pokemon";
import pokedex_file from "./data/test.json";
import Type_button from "./components/Type_Button";


function MergeSort(pokemonArray) {
  if (pokemonArray.length <= 1) {
    return pokemonArray;
  }

  // Split array into two halves
  const mid = Math.floor(pokemonArray.length / 2);
  const left = pokemonArray.slice(0, mid);
  const right = pokemonArray.slice(mid);
  // Recursively merge array ny calling the merge function
  return merge(MergeSort(left), MergeSort(right));
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  // Merges arrays in descending order
  while (i < left.length && j < right.length) {
    if (left[i].usage >= right[j].usage) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  // Adds any remaining elements into array
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}
function App() {
  // all pokemon
  const [pokedex, setPokedex] = useState<pokemon[]>([]);
  // pokemon being displayed
  const [display_pokemon, setDisplay_pokemon] = useState<pokemon[]>([]);
  // type filtering
  const [type, setType] = useState<string[]>([]);
  // time for algorithms 1 and 2
  const [t1, setT1] = useState<number>(0);
  const [t2, setT2] = useState<number>(0);
  // list of possible types
  const type_list = [
    "Normal",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Ice",
    "Fighting",
    "Poison",
    "Ground",
    "Flying",
    "Psychic",
    "Bug",
    "Rock",
    "Ghost",
    "Dragon",
    "Dark",
    "Steel",
    "Fairy",
  ];

  // on load
  useEffect(() => {
    // reset the pokedex
    setPokedex((prevState) => []);

    // update the pokedex with all pokemon
    const temp_pokedex: pokemon[] = [];

    Object.keys(pokedex_file).forEach((key) => {
      temp_pokedex.push({
        name: key,
        number: pokedex_file[key].num,
        types: pokedex_file[key].types,
        usage: usage_file[key],
      });
    });

    setPokedex((prevState) => temp_pokedex);
  }, []);

  // select the proper
  useEffect(() => {
    // reset the display_pokemon
    setDisplay_pokemon((prevState) => []);

    // 2 lists for each algorithm
    let alg_1_list = pokedex;
    let alg_2_list = pokedex;

    // merge sort
    let start = performance.now();
    alg_1_list = MergeSort(alg_1_list);
    let end = performance.now();
    setT1(end - start);

    // radix sort
        start = performance.now();
    if (alg_2_list.length > 0) { //This code checks the array of pokemon to find the largest use rate and in turn the most digits that a use rate can have
      var temp_max = alg_2_list[0];
      alg_2_list.forEach((p) => {
        if (p.usage > temp_max.usage) {
          temp_max = p; 
        }
      });

      var max = temp_max.usage.toString().length; //max is the overall maximum number of digits a usage rate can have
      var i = 0;
      var div = 10;

      while (i < max) { //This is a loop that runs d times, once for digit in the max usage
        let list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //An array correlating to digits 0 through 10 is created to store the frequency that different values at a certain place are those numbers
        alg_2_list.forEach((p) => {
          var num = Math.floor(p.usage / (10));
          list[(num % 10)]++;
        });
        for (let j = 1; j < list.length; j++) { //This code turns the individual frequency rates into a cumulative rate now referencing the last index of the original pokedex array where a value with the index
          list[j] = list[j] + list[(j - 1)];    //of list has at a given digit
        }
        let temp_mons = [];
        for (let p = alg_2_list.length - 1; p >= 0; p--) { //This code takes the new list and places values in their appropriate places back-to front, sorting them by the givin numerical place
          var num = ((Math.floor(alg_2_list[p].usage / (10))) % 10);
          list[num] = list[num] - 1;
          temp_mons[list[num]] = alg_2_list[p];
        };
        //replacement = temp_mons;
        //alg_1_list[0].name = temp_mons.length.toString();
        for (let j = 0; j < temp_mons.length; j++) {
          alg_2_list[j] = temp_mons[j];
        }
        i++;
        div = div * 10;
        //alg_1_list[0].name = list[0].toString();
      }

      alg_2_list.reverse(); //Radix sort results in ascending order, but for this project we want to display results in descending order so the final result is reversed
    }
    end = performance.now();
    setT2(end - start);

    // update display pokemon
    alg_1_list.forEach((p) => {
      let temp: boolean = true;
      // filter by type
      for (const t of type) {
        if (!p.types.includes(t)) {
          temp = false;
        }
      }
      if (temp) {
        setDisplay_pokemon((prevState) => [...prevState, p]);
      }
    });
  }, [type, pokedex]);

  // update type list based on checked boxes
  const handle_types = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    if (target.checked) {
      setType((prevState) => [...prevState, target.name]);
    } else {
      // find index of type
      const index = type.indexOf(target.name);

      // remove found index
      setType((prevState) => [
        ...prevState.slice(0, index),
        ...prevState.slice(index + 1),
      ]);
    }
  };
  return (
    <div className="App">
      <div className="App__header">
        <div className="header__title">Pokemon Showdown Showcase</div>
      </div>
      <div className="App__content">
        <div className="content__options">
          {type_list.map((t) => (
            <Type_button
              type_name={t}
              handle_types={handle_types}
            ></Type_button>
          ))}
          <br></br>
          <div className="options__time">
            Merge Sort Time : {t1.toFixed(3)} ms
            <br></br>
            Radix Sort Time : {t2.toFixed(3)} ms
          </div>
        </div>
        <div className="content__pokemonlist">
          {display_pokemon.map((mon, index) => (
            <Pokemon key={index} {...mon}></Pokemon>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
