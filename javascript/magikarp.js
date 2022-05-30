let POINTS = 0;
let REPETITIONS = 0;
let BEFORE = -1; //indice de la animacion que se esta ejecuatando anterior a la nueva
const TOTALFISH = 6;


const catchIt = () =>{
    const div$$ = document.querySelectorAll('div.fish');
    for (div of div$$){
        div.addEventListener('click',event =>{
            let position;
            POINTS++;
            p$$ = document.querySelector('p.points');
            p$$.innerText = POINTS;
            position = div.id.slice(8);
            div.classList.remove('animated');
        })
    }
}

function play(index) { //Consultado en MDN
    console.log(index);
    if (document.querySelector(`#position${index}`).classList.contains('animated')){
        document.querySelector(`#position${index}`).classList.remove('animated'); 
    }
    window.requestAnimationFrame(function(time) {
      window.requestAnimationFrame(function(time) {
        document.querySelector(`#position${index}`).classList.add('animated');
      });
    });
  }

const chosePosition = (interval) =>{
    REPETITIONS ++;
    if (REPETITIONS <= 15){ //Poner el juego a 30 segundos
        let index = Math.floor(Math.random() * (TOTALFISH));
        if(index == BEFORE){ //Pongo 6 porque son los div que tengo, seria mejor meterlo en una const 
            index ===TOTALFISH ? index-- : index === 5 ? index-- : index++ ; 
        }
        BEFORE = index;
        const div$$ = document.querySelector(`#position${index}`);
        play(index);
    }else{
        clearInterval(interval);
        const h2 = document.createElement('h2');
        h2.innerText = `Time's out`;
        h2.className = 'endgame';
        document.body.appendChild(h2);
        const button = document.querySelector('button.begin');
        button.disabled = false;
    } 
}

const startGame = async() =>{
    POINTS=0;
    await chosePosition();//esto lo tiene que hacer el click del boton de inicio
    const interval = setInterval(async function(){
        await chosePosition(interval);
    },1000);
}

const buttonStart = () =>{
    const button$$ = document.querySelector('button.begin');
    button$$.addEventListener('click',event =>{
        if(REPETITIONS !== 0){
            REPETITIONS = 0; //reiniciar juego
            const h2 = document.querySelector('h2.endgame');
            h2.remove();
            const scoreboard = document.querySelector('p.points');
            scoreboard.innerText = 0;
        }
        button$$.disabled = true;
        startGame();
    })
}

const init = async() =>{
    catchIt();
    buttonStart();
    
}

init();