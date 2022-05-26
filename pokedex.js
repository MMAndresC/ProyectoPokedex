const MAPPED_POKEMON = [];

const getDataPokemonFromApi = (url) => {
    return fetch (url)
        .then (response => response.json())
        .then (DataApiPokemon => DataApiPokemon)
        .catch (error => console.log('No se ha podido recuperar los datos de la API', url, error));
}



const extractData = (data) =>{
    const aux = {};
    aux.name = data.name;
    aux.id = data.id;
    aux.sprite = data.sprites.front_default;
    aux.img = data.sprites.other.dream_world.front_default;
    aux.types =[];
    aux.types = data.types.map(type => type.type.name );
    aux.abilities = data.abilities.map(abilities => abilities.ability.name);
    MAPPED_POKEMON.push(aux);
} 

const filterPokemonByType = (nameType) =>{
    const filteredPokemonList = pokemonList.filter(pokemon => pokemon.types.include(nameType));
    return filteredPokemonList;
}

const drawPokedex = () => { 
    const olPokemon$$ = document.querySelector('ol');
    olPokemon$$.innerHTML = '';
    MAPPED_POKEMON.forEach(pokemon => {
        const li$$ = document.createElement('li');
        li$$.innerHTML = `
            <h2>${pokemon.name}</h2>
            <div>
                <img src=${pokemon.img} alt=${pokemon.name} />
            </div>
        `;
        li$$.className = 'pokedex-card';
        olPokemon$$.appendChild(li$$);
    })
}



const initPokedex = async() => {
    const urlApi = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20';
   

    const listAllPokemons = await getDataPokemonFromApi(urlApi);
    for (const result of listAllPokemons.results) {
        const dataTotal = await getDataPokemonFromApi(result.url);
        extractData(dataTotal);
    }
  
    drawPokedex();
    
    
}



initPokedex();