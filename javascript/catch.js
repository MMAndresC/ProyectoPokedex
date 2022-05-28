const POKEMON = ['blank','ekans','rattata','diglett','spearow','pidgey','geodude', 'blank'];
const HIDING = [];



const randomPlacement = () => {
    const positionMew = Math.floor(Math.random() * (12 - 1)) + 1;
    let index;
    for (let i = 1; i < 12; i++){
        if(i !== positionMew){
            index = Math.floor(Math.random() * (8));
            HIDING.push(POKEMON[index]);
        }else{
            HIDING.push('mew');
        }    
    }
}

const addEventCatch = () =>{
    const div$$ = document.querySelectorAll('section div');
    console.log(div$$);
    for(div of div$$){
        div.addEventListener('click',event =>{
            console.log(div);
            let throwPokeball = div.className.slice(8);
            console.log(throwPokeball);
            console.log(HIDING);
            if (HIDING[throwPokeball] !== 'done'){
                if(HIDING[throwPokeball] == 'mew'){
                    console.log('Has ganado');
                }else{
                    HIDING[throwPokeball] = 'done';
                    //cambiar imagen
                }
            }
        })
    }
}

const initCatch = () => {
    randomPlacement();
    addEventCatch();

}

initCatch();