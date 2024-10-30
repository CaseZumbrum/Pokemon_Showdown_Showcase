import React from 'react';
import logo from './logo.svg';
import './App.css';
import usage_file from './data/usage.json';
import { useState, useEffect } from 'react';
import Pokemon from './components/Pokemon';


function App() {
  const [usage, setUsage]  = useState<{[id: string] : number}>({});

  useEffect(()=>{
    setUsage(usage_file);
  },[])
  return (
    <div className="App">
      {Object.keys(usage).map((key, index)=>
        <Pokemon key={index} name={key} usage={usage[key]}></Pokemon>
      )}

    </div>
  );
}

export default App;
