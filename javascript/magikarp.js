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
    document.querySelector(`#position${index}`).classList.remove('animated'); 
    window.requestAnimationFrame(function(time) {
      window.requestAnimationFrame(function(time) {
        document.querySelector(`#position${index}`).classList.add('animated');
      });
    });
  }

const chosePosition = (interval) =>{
    REPETITIONS ++;
    if (REPETITIONS <= 30){
        let index = Math.floor(Math.random() * (TOTALFISH));
        if(index == BEFORE){ //Pongo 6 porque son los div que tengo, seria mejor meterlo en una const 
            index ===TOTALFISH ? index-- : index++; 
        }
        BEFORE = index;
        const div$$ = document.querySelector(`#position${index}`);
        play(index);
    }else{
        clearInterval(interval);
        //AQUI TERMINA EL JUEGO
    } 
}



const initMagikarp = async() =>{
    catchIt();
    await chosePosition();//esto lo tiene que hacer el click del boton de inicio
    const interval = setInterval(async function(){
        await chosePosition(interval);
    },2000); 
}

initMagikarp();