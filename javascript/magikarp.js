let POINTS = 0;
let FISH = [];
let REPETITIONS = 0;


const catchIt = () =>{
    const div$$ = document.querySelectorAll('div.fish');
    for (div of div$$){
        div.addEventListener('click',event =>{
            let position;
            console.log('evento');
            clearInterval(chosePosition);
            POINTS++;
            p$$ = document.querySelector('p.points');
            p$$.innerText = POINTS;
            position = div.id.slice(8);
            console.log('position');
            FISH[position]='off';
            div.classList.remove('animated');
        })
    }
}

const chosePosition = async() =>{
    REPETITIONS ++;
    if (REPETITIONS <= 30){
        let index = Math.floor(Math.random() * (6));
        console.log('indice',index);
        while(FISH[index] == 'on'){
            index = FISH.indexOf('off');
        }
        FISH[index] = 'on';
        const div$$ = document.querySelector(`#position${index}`);
        console.log('indice', index,div$$);
        div$$.classList.add('animated');
    }else{
        clearInterval(interval);
        console.log('cierra');
    } 
}



const initMagikarp = () =>{
    for(let i = 0; i < 7; i++){
        FISH.push('off'); //inicializar la array que controla los fish animados
    }
    catchIt();
    chosePosition();//esto lo tiene que hacer el click del boton de inicio
    let interval = setInterval(chosePosition,1500);
}

initMagikarp();