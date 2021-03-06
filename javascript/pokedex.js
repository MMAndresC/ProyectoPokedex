const MAPPED_POKEMON = [];
const TYPES = [];
let BEFORE_SELECTED = '';
 


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
    //aux.sprite = data.sprites.front_default;
    aux.sprite = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    aux.img = data.sprites.other.dream_world.front_default;
    aux.types =[];
    aux.types = data.types.map(type => type.type.name );
    getAllTypes(aux.types);
    aux.abilities = data.abilities.map(abilities => abilities.ability.name);
    aux.weight = data.weight;
    aux.height = data.height;
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

const sortByName = (item,itemAfter) =>{
    if (item.name < itemAfter.name){ //Cogido el ejemplo de Mdn
        return -1;
        }
        if (item.name > itemAfter.name) {
          return 1;
        }
        // names must be equal
        return 0;
}


const sortBySelected = (listPokemon) =>{
    const selector$$ = document.querySelector('select');
    if(selector$$.value == 'name'){
        listPokemon.sort(sortByName);
    }else{
        listPokemon.sort((item, afterItem) => Number(item[selector$$.value]) - Number(afterItem[selector$$.value]));        
    }
}

const addEventSelector = () =>{
    selector$$ = document.querySelector('select');
    selector$$.addEventListener('change',event =>{
        clearSelections();
        clearInput();
        drawPokedex(MAPPED_POKEMON);
    })
}

const createBasicCard = (li$$,pokemon) =>{
    li$$.innerHTML = `
    <header>
        <span>#${pokemon.id}</span>
        <h2>${pokemon.name.toUpperCase()}</h2> 
    </header>
    <div class="pokedex-card--image-container">
        <img src=${pokemon.img} alt=${pokemon.name} class="pokedex-card--image"/>
    </div>
    `;
    for(type of pokemon.types){
        const p$$ = document.createElement('p');
        p$$.className = type;
        p$$.innerText = `${type}`;
        li$$.appendChild(p$$);
    }
    li$$.className = 'pokedex-card';
}

const createDetailsCard =(containerLi$$,pokemon)=>{  
    containerLi$$.addEventListener('click', event =>{
        if( containerLi$$.className == 'pokedex-card'){
            containerLi$$.innerText = '';
            containerLi$$.className = 'pokedex-card-details';
            containerLi$$.innerHTML = `
                <div class ="pokedex-card-details-header">
                    <div class="details-header__img"> <img src= ${pokemon.sprite} /></div>
                    <div class="details-header__info">
                        <span>
                            <p class="details-header__id">#${pokemon.id}</p>
                        </span>
                        <span>
                            <h3>Name:</h3>
                            <p>${pokemon.name}</p>
                        </span>
                        <span>
                            <h3>Height:</h3>
                            <p>${pokemon.height}"</p>
                        </span>
                        <span>
                            <h3>Weight:</h3>
                            <p>${pokemon.weight}lbs</p>
                        </span>
                    </div>
                </div>   
            `;
      
            const divAbilities$$= document.createElement('div');
            divAbilities$$.className = "container-abilities";
            const div =document.createElement('div');
            let h3$$ = document.createElement('h3');
            div.appendChild(h3$$);
            h3$$.innerText = "Types:";
            for(type of pokemon.types){
                const p$$ = document.createElement('p');
                p$$.innerText = type;
                div.appendChild(p$$);
            }
            divAbilities$$.appendChild(div);
            const div2 = document.createElement('div');
            h3$$ = document.createElement('h3');
            h3$$.innerText = "Abilities:";
            div2.appendChild(h3$$);
            for(ability of pokemon.abilities){
                const p$$ = document.createElement('p');
                p$$.innerText = ability;
                div2.appendChild(p$$);
            }
            divAbilities$$.appendChild(div2);
            containerLi$$.appendChild(divAbilities$$);
        }else{
            createBasicCard(containerLi$$,pokemon);
        }
    }) 
}


const drawPokedex = (listPokemon) => { 
    let listSortedPokemon = listPokemon;
    if(listSortedPokemon){
        sortBySelected(listSortedPokemon);
    }
    const olPokemon$$ = document.querySelector('ol');
    olPokemon$$.innerHTML = '';
    for(pokemon of listSortedPokemon) {
        const li$$ = document.createElement('li'); 
        createBasicCard(li$$,pokemon);
        createDetailsCard(li$$,pokemon);
        olPokemon$$.appendChild(li$$);
    }
}

const filterPokemonByType = (criteria) =>{
    const filteredByType = [];
    clearInput();
    clearSelect();
    MAPPED_POKEMON.forEach(pokemon =>{
        if(pokemon.types.includes(criteria)){
            filteredByType.push(pokemon);
        }
    })
    return filteredByType;
}

//Deselecciona el checkbox de type
const clearSelections = () =>{ 
    if(BEFORE_SELECTED){ //Deselecciona el checkbox anteriormente seleccionado
        const checkbox = document.querySelector(`[name=${BEFORE_SELECTED}]`);
        checkbox.style.filter = `brightness(1)`;
        checkbox.checked = false;
        BEFORE_SELECTED = '';
    } 
}

const addEventCheckbox = (checkbox) => {
    checkbox.addEventListener('click',event =>{
        if(checkbox.checked){
            clearSelections();
            BEFORE_SELECTED = checkbox.name;
            checkbox.style.filter = `brightness(0.4)`;
            drawPokedex(filterPokemonByType(checkbox.name));
        }else{
            BEFORE_SELECTED = '';
            checkbox.style.filter = `brightness(1)`;
            drawPokedex(MAPPED_POKEMON); 
        }
    })
}

const drawOptionTypes = () => {
    const div$$ = document.querySelector('.option-types');
    for (const type of TYPES){
        const checkbox$$ = document.createElement('input');
        checkbox$$.setAttribute('type','checkbox');
        checkbox$$.setAttribute('name',`${type}`);
        checkbox$$.style['background-image'] = `url("../images/svgTypes/icon_type_${type}.svg")`;
        checkbox$$.className = 'option-types-checkbox';
        div$$.appendChild(checkbox$$);
        addEventCheckbox(checkbox$$);
    }
}

//Pone el value del input de busqueda a vacio
const clearInput = () =>{
    const inputSearch$$ = document.querySelector(`[type=search]`);
    inputSearch$$.value = '';
}

//Coloca la opcion de Id por defecto en el select
const clearSelect = () =>{
    const select$$ = document.querySelector('select');
    select$$.value = 'id';
}

const inputSearch = () => {
    const searchInput$$ = document.querySelector('[type=search]');
    searchInput$$.addEventListener('input',event => {
        drawPokedex(filterPokemonByNameId(searchInput$$.value));
        clearSelections();
        clearSelect();
    })     
}




const initPokedex = async() => {
    const urlApi = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151'; //ACORDARME DE CAMBIAR EL N?? DE POKEMON A 151
   

    const listAllPokemons = await getDataPokemonFromApi(urlApi);
    for (const result of listAllPokemons.results) {
        const dataTotal = await getDataPokemonFromApi(result.url);
        extractData(dataTotal);
    }
    drawPokedex(MAPPED_POKEMON);
    drawOptionTypes();
    inputSearch();
    addEventSelector();
}



initPokedex();