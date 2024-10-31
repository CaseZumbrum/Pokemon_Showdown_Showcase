import pokemon from '../types/pokemon'
function Pokemon({ name, types, usage }: pokemon) {
  return (
    <div className="pokemon">
      <img src={"pokemon/" + name.toLowerCase() + ".png"}></img>
      <div className='pokemon__name'>
        {name}
      </div>
      <div className='pokmemon__usage'>
        {usage}
      </div>
      <div className='pokemon_types'>
        {JSON.stringify(types)}
      </div>
    </div>
  );
}

export default Pokemon;
