import React from 'react';
import logo from './logo.svg';
import { useState, useEffect } from 'react';
import pokemon from '../types/pokemon'
function Pokemon({name, usage} : pokemon) {
  return (
    <div className="pokemon">
        <img src = {"pokemon/" + name.toLowerCase() + ".png"}></img>
        <div className='pokemon__name'>
            {name}
        </div>
        <div className='pokmemon__usage'>
            {usage}
        </div>
    </div>
  );
}

export default Pokemon;
