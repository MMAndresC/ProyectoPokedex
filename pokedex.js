const MAPPED_POKEMON = [];
const TYPES = [
    "All",
    "Normal",
    "Fighting",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Steel",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    "Fairy",
    "Unknown",
    "Shadow",
  ];
  


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

const filterPokemonBy = (search,listPokemons) =>{
    search = search.toLowerCase();
    let filteredPokemonList = listPokemons.filter(pokemon => pokemon.name.includes(search));  
    //filteredPokemonList = listPokemons.filter(pokemon => pokemon.id === search);
    if(filteredPokemonList.length ===  0){
        filteredPokemonList = listPokemons.filter(pokemon => pokemon.id === Number(search));
    }
    return filteredPokemonList;
}

const drawPokedex = (listPokemons) => { 
    const olPokemon$$ = document.querySelector('ol');
    olPokemon$$.innerHTML = '';
    for(pokemon of listPokemons) {
        const li$$ = document.createElement('li'); //MIRAR COMO SE PONE LA PRIMERA LETRA DE UNA STRING EN MAYUSCULAS MEJOR QUE PONERLO TODO
        li$$.innerHTML = `
            <h2>${pokemon.name.toUpperCase()}</h2> 
            <div class="pokedex-card--image-container">
                <img src=${pokemon.img} alt=${pokemon.name} class="pokedex-card--image"/>
            </div>
        `;
        li$$.className = 'pokedex-card';
        olPokemon$$.appendChild(li$$);
    }
}

const drawOptionTypes = () => {
    const section = document.querySelector('.option-types');
    for (const type of TYPES){
        section.innerHTML += `
        <input type="checkbox" name=types class="option-types-checkbox"/>${type}`
    }
}

const inputSearch = () => {
    const searchInput = document.querySelector('[type=search]');
    searchInput.addEventListener('input',event => {
        drawPokedex(filterPokemonBy(searchInput.value,MAPPED_POKEMON));
    })

}

const drawSectionFilters = () => {
    drawOptionTypes();
    inputSearch();
}



const initPokedex = async() => {
    const urlApi = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20'; //ACORDARME DE CAMBIAR EL Nº DE POKEMON A 151
   

    const listAllPokemons = await getDataPokemonFromApi(urlApi);
    for (const result of listAllPokemons.results) {
        const dataTotal = await getDataPokemonFromApi(result.url);
        extractData(dataTotal);
    }
  
    drawPokedex(MAPPED_POKEMON);
    drawSectionFilters();
    
}



initPokedex();