const POKEMON = ['blank','ekans','rattata','diglett','spearow','pidgey','geodude', 'blank'];
const HIDING = [];
let POKEBALLS = 5;




const randomPlacement = () => {
    const positionMew = Math.floor(Math.random() * (10));
    let index;
    for (let i = 0; i < 11; i++){
        if(i !== positionMew){
            index = Math.floor(Math.random() * (7));
            HIDING.push(POKEMON[index]);
        }else{
            HIDING.push('mew');
        }    
    }
}

const uncover = () =>{
    const container$$ = document.querySelectorAll('section div');
    let position;
    container$$.forEach(div =>{
        position = div.className.slice(8);
        if(HIDING[position]){
            HIDING[position] == 'blank' 
                ? div.style['background-image']= `url("./images/catch/${HIDING[position]}.png")`
                : div.style['background-image']= `url("./images/catch/${HIDING[position]}.svg")`;
            HIDING[position] = 0; 
        }
    })
}

const endgame = () =>{
    uncover();
    const div$$ = document.querySelector('.endgame');
    const img$$ = document.querySelector('.character-container-img img');
    const button$$ = document.createElement('button');
    POKEBALLS 
        ? button$$.innerHTML = `Winner Try Again?`
        : button$$.innerHTML = `Loooser Try Again?`

    button$$.addEventListener('click', event =>{
        window.location.reload();
    });
    if(!POKEBALLS){
        img$$.setAttribute('src','./images/catch/defeat.jpg');
    }else{
        img$$.setAttribute('src','./images/catch/victory.webp');
    }
    button$$.className = 'button-endgame';
    div$$.appendChild(button$$);
    POKEBALLS = 5;
}

const subtractPokeball = () =>{
    const pokeballDisabled$$ = document.querySelector('span.on');
    pokeballDisabled$$.style.filter = `brightness(0.4)`
    pokeballDisabled$$.classList.remove('on');
}


const addEventCatch = () =>{
    const div$$ = document.querySelectorAll('section div');
    div$$.forEach(div =>{
        div.addEventListener('click',event =>{
            let throwPokeball = div.className.slice(8);
            if (HIDING[throwPokeball]){ //Para que no haga nada si dan click en uno descubierto
                if(HIDING[throwPokeball] == 'mew'){ 
                    div.style['background-image']= `url("./images/catch/mew.svg")`;
                    subtractPokeball();
                    endgame();
                }else{
                    HIDING[throwPokeball] == 'blank'
                        ? div.style['background-image']= `url("./images/catch/${HIDING[throwPokeball]}.png")`
                        : div.style['background-image']= `url("./images/catch/${HIDING[throwPokeball]}.svg")`;
                    HIDING[throwPokeball] = 0;
                    div.classList.add('done'); 
                    subtractPokeball();
                    POKEBALLS--;
                    if(POKEBALLS === 0){
                        endgame();
                    }
                }
            }
            
        })
    })
}

const initCatch = () => {
    randomPlacement();
    addEventCatch();
}

initCatch();