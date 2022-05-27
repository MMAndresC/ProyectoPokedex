const MAPPED_POKEMON = [];
let CHECKED_TYPES = [];
const TYPES = [];
 
  


const getDataPokemonFromApi = (url) => {
    return fetch (url)
        .then (response => response.json())
        .then (DataApiPokemon => DataApiPokemon)
        .catch (error => console.log('No se ha podido recuperar los datos de la API', url, error));
}

const getAllTypes = (pokemonTypes) =>{
    pokemonTypes.forEach(type =>{
        if(!TYPES.includes(type)){
            TYPES.push(type);
        }
    })   
}

const extractData = (data) =>{
    const aux = {};
    aux.name = data.name;
    aux.id = data.id;
    aux.sprite = data.sprites.front_default;
    aux.img = data.sprites.other.dream_world.front_default;
    aux.types =[];
    aux.types = data.types.map(type => type.type.name );
    getAllTypes(aux.types);
    aux.abilities = data.abilities.map(abilities => abilities.ability.name);
    MAPPED_POKEMON.push(aux);
} 

const filterPokemonByNameId = (search) =>{
    search = search.toLowerCase();
    let filteredPokemonList = MAPPED_POKEMON.filter(pokemon => pokemon.name.includes(search));  
    if(filteredPokemonList.length ===  0){
        filteredPokemonList = MAPPED_POKEMON.filter(pokemon => pokemon.id === Number(search));
    }
    return filteredPokemonList;
}

const drawPokedex = (listPokemon) => { 
    const olPokemon$$ = document.querySelector('ol');
    olPokemon$$.innerHTML = '';
    for(pokemon of listPokemon) {
        const li$$ = document.createElement('li'); 
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

const filterPokemonByType = (criteria) =>{
    const filteredByType = [];
    MAPPED_POKEMON.forEach(pokemon =>{
        if(pokemon.types.includes(criteria)){
            filteredByType.push(pokemon);
        }
    })
    return filteredByType;
}

const addEventCheckbox = (checkbox) => {
    checkbox.addEventListener('click',event =>{
        if(checkbox.checked){
            checkbox.style.filter = `brightness(0.4)`;
            drawPokedex(filterPokemonByType(checkbox.name));
                
          
           

        }else{
            checkbox.style.filter = `brightness(1)`;
            
        }
    })
}

const drawOptionTypes = () => {
    const div = document.querySelector('.option-types');
    for (const type of TYPES){
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type','checkbox');
        checkbox.setAttribute('name',`${type}`);
        checkbox.style['background-image'] = `url("../images/svgTypes/icon_type_${type}.svg")`;
        checkbox.className = 'option-types-checkbox';
        div.appendChild(checkbox);
        addEventCheckbox(checkbox);
    }
}

const inputSearch = () => {
    const searchInput = document.querySelector('[type=search]');
    searchInput.addEventListener('input',event => {
        drawPokedex(filterPokemonByNameId(searchInput.value));
    })
}

const drawSectionFilters = () => {
    drawOptionTypes();
    inputSearch();
}



const initPokedex = async() => {
    const urlApi = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151'; //ACORDARME DE CAMBIAR EL Nº DE POKEMON A 151
   

    const listAllPokemons = await getDataPokemonFromApi(urlApi);
    for (const result of listAllPokemons.results) {
        const dataTotal = await getDataPokemonFromApi(result.url);
        extractData(dataTotal);
    }
  
    drawPokedex(MAPPED_POKEMON);
    drawSectionFilters();

}



initPokedex();