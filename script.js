// Quiz App - JavaScript Principal
class QuizApp {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedQuestions = [];
        this.maxQuestions = 10;
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadDemoQuestions();
    }
    
    initializeElements() {
        // Pantallas
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');
        this.loadingOverlay = document.getElementById('loading-overlay');
        
        // Elementos de inicio
        this.fileInput = document.getElementById('excel-file');
        this.fileInfo = document.getElementById('file-info');
        this.fileName = document.getElementById('file-name');
        this.questionsCount = document.getElementById('questions-count');
        this.startQuizBtn = document.getElementById('start-quiz-btn');
        this.useDemoBtn = document.getElementById('use-demo-btn');
        
        // Elementos del quiz
        this.progressFill = document.getElementById('progress-fill');
        this.progressText = document.getElementById('progress-text');
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.nextBtn = document.getElementById('next-btn');
        
        // Elementos de resultados
        this.correctAnswersEl = document.getElementById('correct-answers');
        this.totalQuestionsEl = document.getElementById('total-questions');
        this.percentageEl = document.getElementById('percentage');
        this.resultsMessage = document.getElementById('results-message');
        this.restartBtn = document.getElementById('restart-btn');
        this.newFileBtn = document.getElementById('new-file-btn');
    }
    
    attachEventListeners() {
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        this.startQuizBtn.addEventListener('click', () => this.startQuiz());
        this.useDemoBtn.addEventListener('click', () => this.useDemoQuestions());
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.newFileBtn.addEventListener('click', () => this.loadNewFile());
    }
    
    loadDemoQuestions() {
        this.demoQuestions = [
            {
                pregunta: "¿Cuál es la capital de Francia?",
                respuestaVerdadera: "París",
                respuestaFalsa1: "Londres",
                respuestaFalsa2: "Roma",
                respuestaFalsa3: "Berlín"
            },
            {
                pregunta: "¿Cuál es el planeta más cercano al Sol?",
                respuestaVerdadera: "Mercurio",
                respuestaFalsa1: "Venus",
                respuestaFalsa2: "Marte",
                respuestaFalsa3: "Júpiter"
            },
            {
                pregunta: "¿Cuántos continentes hay en el mundo?",
                respuestaVerdadera: "7",
                respuestaFalsa1: "5",
                respuestaFalsa2: "6",
                respuestaFalsa3: "8"
            },
            {
                pregunta: "¿Quién escribió Cien años de soledad?",
                respuestaVerdadera: "Gabriel García Márquez",
                respuestaFalsa1: "Mario Vargas Llosa",
                respuestaFalsa2: "Pablo Neruda",
                respuestaFalsa3: "Isabel Allende"
            },
            {
                pregunta: "¿En qué país se encuentra Machu Picchu?",
                respuestaVerdadera: "Perú",
                respuestaFalsa1: "México",
                respuestaFalsa2: "Bolivia",
                respuestaFalsa3: "Colombia"
            },
            {
                pregunta: "¿Cuál es el océano más grande del mundo?",
                respuestaVerdadera: "Pacífico",
                respuestaFalsa1: "Atlántico",
                respuestaFalsa2: "Índico",
                respuestaFalsa3: "Ártico"
            },
            {
                pregunta: "¿En qué año llegó el hombre a la Luna?",
                respuestaVerdadera: "1969",
                respuestaFalsa1: "1968",
                respuestaFalsa2: "1970",
                respuestaFalsa3: "1971"
            },
            {
                pregunta: "¿Cuál es el elemento químico más abundante en el universo?",
                respuestaVerdadera: "Hidrógeno",
                respuestaFalsa1: "Oxígeno",
                respuestaFalsa2: "Carbono",
                respuestaFalsa3: "Helio"
            },
            {
                pregunta: "¿Quién pintó La Mona Lisa?",
                respuestaVerdadera: "Leonardo da Vinci",
                respuestaFalsa1: "Miguel Ángel",
                respuestaFalsa2: "Rafael",
                respuestaFalsa3: "Donatello"
            },
            {
                pregunta: "¿Cuál es la montaña más alta del mundo?",
                respuestaVerdadera: "Monte Everest",
                respuestaFalsa1: "K2",
                respuestaFalsa2: "Kangchenjunga",
                respuestaFalsa3: "Lhotse"
            },
            {
                pregunta: "¿En qué continente se encuentra Egipto?",
                respuestaVerdadera: "África",
                respuestaFalsa1: "Asia",
                respuestaFalsa2: "Europa",
                respuestaFalsa3: "América"
            },
            {
                pregunta: "¿Cuál es la velocidad de la luz?",
                respuestaVerdadera: "300,000 km/s",
                respuestaFalsa1: "150,000 km/s",
                respuestaFalsa2: "450,000 km/s",
                respuestaFalsa3: "200,000 km/s"
            }
        ];
    }
    
    async handleFileUpload(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        this.showLoading(true);
        
        try {
            const questions = await this.readExcelFile(file);
            if (questions && questions.length > 0) {
                this.questions = questions;
                this.showFileInfo(file.name, questions.length);
                this.startQuizBtn.disabled = false;
                this.showNotification('Archivo cargado correctamente', 'success');
            } else {
                throw new Error('No se encontraron preguntas válidas en el archivo');
            }
        } catch (error) {
            console.error('Error al leer el archivo:', error);
            this.showNotification('Error al leer el archivo. Verifica el formato.', 'error');
            this.fileInput.value = '';
        } finally {
            this.showLoading(false);
        }
    }
    
    async readExcelFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    
                    const questions = this.parseExcelData(jsonData);
                    resolve(questions);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('Error al leer el archivo'));
            reader.readAsArrayBuffer(file);
        });
    }
    
    parseExcelData(data) {
        const questions = [];
        
        // Saltar la primera fila (encabezados)
        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            
            // Verificar que la fila tenga al menos 5 columnas
            if (row && row.length >= 5 && row[0] && row[1]) {
                questions.push({
                    pregunta: String(row[0]).trim(),
                    respuestaVerdadera: String(row[1]).trim(),
                    respuestaFalsa1: String(row[2] || '').trim(),
                    respuestaFalsa2: String(row[3] || '').trim(),
                    respuestaFalsa3: String(row[4] || '').trim()
                });
            }
        }
        
        return questions;
    }
    
    showFileInfo(fileName, questionCount) {
        this.fileName.textContent = fileName;
        this.questionsCount.textContent = `${questionCount} preguntas encontradas`;
        this.fileInfo.style.display = 'block';
    }
    
    useDemoQuestions() {
        this.questions = [...this.demoQuestions];
        this.showFileInfo('Preguntas de ejemplo', this.questions.length);
        this.startQuizBtn.disabled = false;
        this.showNotification('Usando preguntas de ejemplo', 'success');
    }
    
    startQuiz() {
        if (this.questions.length === 0) {
            this.showNotification('No hay preguntas disponibles', 'error');
            return;
        }
        
        this.selectRandomQuestions();
        this.currentQuestionIndex = 0;
        this.score = 0;
        
        this.showScreen('quiz');
        this.displayQuestion();
    }
    
    selectRandomQuestions() {
        const shuffled = [...this.questions].sort(() => 0.5 - Math.random());
        this.selectedQuestions = shuffled.slice(0, Math.min(this.maxQuestions, this.questions.length));
    }
    
    displayQuestion() {
        const question = this.selectedQuestions[this.currentQuestionIndex];
        if (!question) return;
        
        // Actualizar progreso
        const progress = ((this.currentQuestionIndex + 1) / this.selectedQuestions.length) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.progressText.textContent = `${this.currentQuestionIndex + 1} / ${this.selectedQuestions.length}`;
        
        // Mostrar pregunta
        this.questionText.textContent = question.pregunta;
        
        // Crear opciones aleatorias
        const options = [
            { text: question.respuestaVerdadera, isCorrect: true },
            { text: question.respuestaFalsa1, isCorrect: false },
            { text: question.respuestaFalsa2, isCorrect: false },
            { text: question.respuestaFalsa3, isCorrect: false }
        ].filter(option => option.text.length > 0);
        
        // Mezclar opciones
        const shuffledOptions = options.sort(() => 0.5 - Math.random());
        
        // Limpiar contenedor de opciones
        this.optionsContainer.innerHTML = '';
        
        // Crear elementos de opciones
        shuffledOptions.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.className = 'option';
            optionElement.textContent = option.text;
            optionElement.dataset.correct = option.isCorrect;
            
            optionElement.addEventListener('click', () => this.selectOption(optionElement));
            
            this.optionsContainer.appendChild(optionElement);
        });
        
        // Ocultar botón siguiente
        this.nextBtn.style.display = 'none';
    }
    
    selectOption(selectedElement) {
        // Deshabilitar todas las opciones
        const allOptions = this.optionsContainer.querySelectorAll('.option');
        allOptions.forEach(option => {
            option.classList.add('disabled');
            option.style.pointerEvents = 'none';
        });
        
        // Marcar opción seleccionada
        selectedElement.classList.add('selected');
        
        // Mostrar respuestas correctas e incorrectas
        allOptions.forEach(option => {
            if (option.dataset.correct === 'true') {
                option.classList.add('correct');
            } else {
                option.classList.add('incorrect');
            }
        });
        
        // Actualizar puntuación
        if (selectedElement.dataset.correct === 'true') {
            this.score++;
            this.showNotification('¡Correcto!', 'success');
        } else {
            this.showNotification('Incorrecto', 'error');
        }
        
        // Mostrar botón siguiente
        setTimeout(() => {
            this.nextBtn.style.display = 'block';
        }, 1000);
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        
        if (this.currentQuestionIndex < this.selectedQuestions.length) {
            this.displayQuestion();
        } else {
            this.showResults();
        }
    }
    
    showResults() {
        const totalQuestions = this.selectedQuestions.length;
        const percentage = Math.round((this.score / totalQuestions) * 100);
        
        // Actualizar elementos de resultados
        this.correctAnswersEl.textContent = this.score;
        this.totalQuestionsEl.textContent = totalQuestions;
        this.percentageEl.textContent = `${percentage}%`;
        
        // Mensaje basado en el rendimiento
        let message = '';
        let messageClass = '';
        
        if (percentage >= 80) {
            message = '¡Excelente trabajo! Tienes un conocimiento sobresaliente.';
            messageClass = 'excellent';
        } else if (percentage >= 60) {
            message = '¡Buen trabajo! Tienes un conocimiento sólido.';
            messageClass = 'good';
        } else {
            message = 'Sigue practicando. Hay margen para mejorar.';
            messageClass = 'needs-improvement';
        }
        
        this.resultsMessage.textContent = message;
        this.resultsMessage.className = `results-message ${messageClass}`;
        
        this.showScreen('results');
    }
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.startQuiz();
    }
    
    loadNewFile() {
        this.questions = [];
        this.selectedQuestions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        
        this.fileInput.value = '';
        this.fileInfo.style.display = 'none';
        this.startQuizBtn.disabled = true;
        
        this.showScreen('start');
    }
    
    showScreen(screenName) {
        // Ocultar todas las pantallas
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Mostrar pantalla seleccionada
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }
    
    showLoading(show) {
        this.loadingOverlay.style.display = show ? 'flex' : 'none';
    }
    
    showNotification(message, type = 'info') {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1001',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        // Color según el tipo
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#48bb78';
                break;
            case 'error':
                notification.style.backgroundColor = '#f56565';
                break;
            default:
                notification.style.backgroundColor = '#667eea';
        }
        
        // Añadir al DOM
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registro falló: ', registrationError);
            });
    });
}