let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");/* renderiza o desenho como 2d */
let box = 32;
let snake = [];
snake[0]={
    x: 8 * box,
    y: 8 * box
}

let direction= "right";

/* criando a comidan em local aleatorio no tabuleiro */
let food={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
/* math.floor tira a parte flutuante do Math.random */



function criarBG(){
    context.fillStyle = ("lightgreen");
    context.fillRect(0, 0, 16 * box ,16 * box); /* o retangulo onde acontece o jogo, com 4 parametros, (x,y) */
}

function criarCobrinha(){
 for(i=0; i < snake.length ;i++){/*  */
    context.fillStyle = "green";
    context.fillRect(snake[i].x, snake[i].y, box, box);

}
}

function drawFood(){
    context.fillStyle="red";
    context.fillRect(food.x, food.y, box, box);
}

/* sencibilidade no botão  */
document.addEventListener("keydown",update);/* ato de precionar a tecla e vai atualizar */

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left"; /* fazendo a proibição para ela não poder ir na direção inversa */
    if(event.keyCode == 38 && direction != "down") direction = "up"; 
    if(event.keyCode == 39 && direction != "left") direction = "right"; 
    if(event.keyCode == 40 && direction != "up") direction = "down"; 
}


function iniciarJogo(){

    /* fazendo a cobrinha aparecer do outro lado */
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0  && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0  && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i< snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over :( Aperte F5 e tente novamente');
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    /* agora fazendo com que se a snake se mover um quadrado para a direita ela vai diminuir um quadrado da esquerda */
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop();/* função para tirar o ultimo elemento do array */
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box
    }

    

    


    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

/*  da continuidade ao jogo a cada 100milisegundo pra ele não travar */
let jogo = setInterval(iniciarJogo, 100);




