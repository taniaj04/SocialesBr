const questions = [
    { hint: "Este país es conocido por la Torre Eiffel y la Revolución de 1789.", answer: "Francia" },
    { hint: "Es la cuna de las pirámides y el río Nilo.", answer: "Egipto" },
    { hint: "Este país lideró la Revolución Industrial en el siglo XVIII.", answer: "Reino Unido" },
    { hint: "Este país es conocido como la 'bota' de Europa.", answer: "Italia" },
    { hint: "Es el país más grande del mundo por extensión.", answer: "Rusia" }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 120;
let timer;
let incorrectAnswers = [];

function playStartSound() {
    const startSound = new Audio('inicio.mp3'); 
    startSound.play();
    startSound.onended = startGame; 
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function startGame() {
    shuffleQuestions();
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('restart-btn').style.display = 'block'; 
    document.getElementById('exit-btn').style.display = 'block'; 
    showQuestion();
    startTimer();
}

function showQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById('hint').textContent = questions[currentQuestion].hint;
        updateProgress();
    } else {
        endGame();
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.trim();
    const resultContainer = document.getElementById('results');

    if (userAnswer === "") {
        resultContainer.innerHTML = `<p style="color: red;">Por favor, ingresa una respuesta antes de continuar.</p>`;
        return;
    }

    const correctAnswer = questions[currentQuestion].answer;
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
    } else {
        incorrectAnswers.push({ hint: questions[currentQuestion].hint, correctAnswer });
    }

    currentQuestion++;
    resetTimer();
    document.getElementById('answer').value = '';
    showQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById('time').textContent = timeLeft;
        } else {
            incorrectAnswers.push({
                hint: questions[currentQuestion].hint,
                correctAnswer: questions[currentQuestion].answer
            });
            currentQuestion++;
            resetTimer();
            showQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 120;
    startTimer();
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function endGame() {
    clearInterval(timer);
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('exit-btn').style.display = 'none';

    const resultContainer = document.getElementById('results');
    resultContainer.innerHTML = `<h3>Tu puntaje es: ${score}/${questions.length}</h3>`;
    
    if (incorrectAnswers.length > 0) {
        let incorrectHTML = "<h4>Respuestas incorrectas:</h4><ul>";
        incorrectAnswers.forEach((item) => {
            incorrectHTML += `<li>${item.hint} - Respuesta correcta: <b>${item.correctAnswer}</b></li>`;
        });
        incorrectHTML += "</ul>";
        resultContainer.innerHTML += incorrectHTML;
    } else {
        resultContainer.innerHTML += "<p>¡Felicidades! Respondiste todo correctamente.</p>";
    }

    document.getElementById('results').style.display = 'block';
}

function restartPage() {
    const restartSound = new Audio('reiniciar.mp3'); 
    restartSound.play(); 
    setTimeout(() => {
        location.reload(); 
    }, 500); 
}

function exitGame() {
    const exitSound = new Audio('sonido.mp3'); 
    exitSound.play(); 
    exitSound.onended = function() { 
        if (confirm("¿Seguro que quieres salir?")) {
            window.location.href = "index.html"; 
        }
    };
}

