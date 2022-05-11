const quizData = [
    {
        id: 1,
        question: 'Ո՞ր անգլիական ակումբն է հաղթել թվով ամենաշատ Պրեմիեր լիգայի տիտղոսները:',
        a: 'Մանչեսթեր Յունայթեդ',
        b: 'Լիվերպուլ',
        c: 'Մանչեսթեր Սիթի',
        d: 'Արսենալ',
        correct: 'a'
    },
    {
        id: 2,
        question: 'Ո՞ր ակումբն է ճանաչվել 20-րդ դարի լավագույն ակումբ:',
        a: 'Միլան',
        b: 'Մանչեսթեր Յունայթեդ',
        c: 'Լիվերպուլ',
        d: 'Ռեալ Մադրիդ',
        correct: 'd'
    },
    {
        id: 3,
        question: 'Քանի՞ ՉԼ գավաթ է նվաճել Չելսին 21-րդ դարում:',
        a: '4',
        b: '8',
        c: '1',
        d: '2',
        correct: 'd'
    },
    {
        id: 4,
        question: 'Ո՞ր ակումբն է ամենից շատ ՉԼ տիտղոսները նվաճել:',
        a: 'Ռեալ Մադրիդ',
        b: 'Լիվերպուլ',
        c: 'Միլան',
        d: 'Բավարիա',
        correct: 'a'
    },
    {
        id: 5,
        question: 'Ո՞ր ակումբն է իրականացրել պատմության ամենաթանկ ֆուտբոլային տրանսֆերը:',
        a: 'Լիվերպուլ',
        b: 'ՊՍԺ',
        c: 'Աստոն Վիլլա',
        d: 'Ռեալ Մադրիդ',
        correct: 'b'
    },
    {
        id: 6,
        question: 'Ո՞ր ակումբը դարձավ 2017/2018 թվականների Եվրոպա լիգայի հաղթող:',
        a: 'Բարսելոնա',
        b: 'Ատլետիկո Մադրիդ',
        c: 'Սեվիլյա',
        d: 'Մանչեստր Յունայթեդ',
        correct: 'b'
    },
    {
        id: 7,
        question: 'Քանի՞ անգամ է Պարման հաղթել Serie A-ն:',
        a: '0',
        b: '1',
        c: '2',
        d: '3',
        correct: 'a'
    },
    {
        id: 8,
        question: '21-րդ դարում ո՞ր ակումբը 3 տարի անընդմեջ կարողացավ հաղթել ՉԼ-ն:',
        a: 'Ռեալ Մադրիդ',
        b: 'Բավարիա',
        c: 'Բարսելոնա',
        d: 'Լիվերպուլ',
        correct: 'a'
    },
    {
        id: 9,
        question: 'Քանի՞ անգամ է Ատլետիկո Մադրիդը հաղթել La Liga-ն:',
        a: '5',
        b: '11',
        c: '15',
        d: '20',
        correct: 'b'
    },
    {
        id: 10,
        question: 'Ո՞ր ակումբն է ՉԼ պատմության ամենաշատ գոլեր խփած ակումբը',
        a: 'Արսենալ',
        b: 'Վալենսիա',
        c: 'Բավարիա',
        d: 'Ռեալ Մադրիդ',
        correct: 'd'
    }
];

const answerEls = document.querySelectorAll(".answer");
const quiz = document.getElementById('quiz');
const atfrom = document.getElementById('atfrom');
const questionEl = document.getElementById('main-question');
const a_text = document.getElementById('fora');
const b_text = document.getElementById('forb');
const c_text = document.getElementById('forc');
const d_text = document.getElementById('ford');
const submitBtn = document.getElementById('submit');
const path = document.getElementsByTagName('path');
    
var currentQuiz = 0;
var ourResult = 0;
var questionNumber = 1;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
    
    atfrom.innerHTML = `Հարց ${questionNumber}/${quizData.length}`;
    questionNumber++;
}

function getSelected() {
    var answer = undefined;
    answerEls.forEach((answerEl) => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener('click', () => {

    const answer = getSelected();
    
      if(answer) {
        if($("#submit i").hasClass('fa-arrow-right')) {
          $("#submit i").removeClass('fa-arrow-right');
          $("#submit i").addClass('fa-circle-notch');
          $("#submit i").addClass('fa-spin');
          $(".ulQuiz").css({
            "visibility": "hidden",
            "opacity": "0"
          });
        }

          if(answer === quizData[currentQuiz].correct) {
          ourResult++;
          }
            currentQuiz++;
          setTimeout(function(){
            if(!$("#submit i").hasClass('fa-arrow-right')) {
              $("#submit i").removeClass('fa-circle-notch');
              $("#submit i").removeClass('fa-spin');
              $("#submit i").addClass('fa-arrow-right');
              $(".ulQuiz").css({
                "visibility": "visible",
                "opacity": "1"
              });
            }
          }, 300);

          if(currentQuiz < quizData.length) {
              loadQuiz();
              path[0].remove();
          } else {
              quiz.innerHTML = `<h2 style="color: #fff;padding: 130px 20px;font-size: 40px;text-align:center;letter-spacing: 3px;color: #fff;padding: 130px 20px;font-size: 40px;letter-spacing: 3px;">Դուք ճիշտ եք պատասխանել ${ourResult}/${quizData.length} հարցերին</h2> <button class="fbutton" onclick="location.reload()">Կրկին փորձել <i class="fa fa-refresh" aria-hidden="true"></i>
              </button>`;
          }

      } else {
        // setTimeout(function(){
          if($("#submit i").hasClass('fa-arrow-right')) {
            $("#submit i").addClass('fa-exclamation');
          }
        // }, 1000);
        setTimeout(function(){
            $("#submit i").removeClass('fa-exclamation');
            $("#submit i").addClass('fa-arrow-right');
        }, 1000);
        return false;
      }
});