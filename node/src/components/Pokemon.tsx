import pokemon from '../types/pokemon'
import "../css/Pokemon.css"
function Pokemon({ name, number, types, usage }: pokemon) {
  return (
    <div className="pokemon">
      <div className = "pokemon_image" style ={{backgroundPosition: "-"+ Math.floor(number%12) * 40+"px -" + Math.floor(number/12) * 30+"px"}}> </div>
      <div className='pokemon__name'>
        #{number}: {name}
      </div>

        
      <span ></span>
      <div className='pokmemon__usage'>
        Uses: {usage}
      </div>
      <div className='pokemon_types'>
        Types: {JSON.stringify(types)}
      </div>

    </div>
  );
}

export default Pokemon;
