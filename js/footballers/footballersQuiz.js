const quizData = [
    {
        id: 1,
        question: 'Ո՞վ էր 1970 թվականի Աշխարհի առաջնության լավագույն ռմբարկուն:',
        a: 'Գերդ Մյուլլեր',
        b: 'Ժաիրզինյո',
        c: 'Թեոֆիլո Կուբիլյաս',
        d: 'Պելե',
        correct: 'a'
    },
    {
        id: 2,
        question: 'Ո՞ր ֆուտբոլիստն է ՉԼ պատմության լավագույն ռմբարկուն:',
        a: 'Կիլլիան Մբապպե',
        b: 'Լեո Մեսսի',
        c: 'Կարիմ Բենզեմա',
        d: 'Կրիշտիանու Ռոնալդու',
        correct: 'd'
    },
    {
        id: 3,
        question: 'Ո՞ր ֆուտբոլիստի տրանսֆերն է պատմության մեջ ամենաթանկը:',
        a: 'Կիլլիան Մբապպե',
        b: 'Նեյմար Ժունիոր',
        c: 'Կրիշտիանու Ռոնալդու',
        d: 'Ուսման Դեմբելե',
        correct: 'b'
    },
    {
        id: 4,
        question: 'Ո՞ր ֆուտբոլիստն է ՉԼ պատմության լավագույն ասսիստենտը:',
        a: 'Լեո Մեսսի',
        b: 'Կրիշտիանու Ռոնալդու',
        c: 'Կարիմ Բենզեմա',
        d: 'Ռոնալդո',
        correct: 'b'
    },
    {
        id: 5,
        question: 'Ո՞ր ֆուտբոլիստն է 2018 թվականի ԱԱ եզրափակչի հաղթական գոլի հեղինակը:',
        a: 'Լեո Մեսսի',
        b: 'Մարիո Գյոտցե',
        c: 'Անխել Դի Մարիա',
        d: 'Պաուլո Դիբալա',
        correct: 'b'
    },
    {
        id: 6,
        question: 'Ո՞վ է ֆուտբոլի պատմության լավագույն ռմբարկուն:',
        a: 'Պելե',
        b: 'Գերդ Մյուլլեր',
        c: 'Կրիշտիանու Ռոնալդու',
        d: 'Լեո Մեսսի',
        correct: 'c'
    },
    {
        id: 7,
        question: '2005թ. ՉԼ եզրափակչի դրամատիկ խաղում Միլան-Լիվերպուլ (3:3) որ ակումբին հաջողվեց հաղթել:',
        a: 'Միլան',
        b: 'Լիվերպուլ',
        c: 'Խաղն ավարտվեց ոչ ոքի',
        d: 'Խաղը չկայացավ',
        correct: 'b'
    },
    {
        id: 8,
        question: '2014թ. ՉԼ եզրափակչում 92:48-ին, ո՞ր ֆուտբոլիստը` իր գոլով, փրկեց իր թիմին:',
        a: 'Լուկա Մոդրիչ',
        b: 'Իկեր Կասիլյաս',
        c: 'Սերխիո Ռամոս',
        d: 'Թոնի Կրոս',
        correct: 'c'
    },
    {
        id: 9,
        question: 'Մեկ տարում խփված ամենաշատ գոլերի ռեկորդը պատկանում է՝',
        a: 'Գերդ Մյուլլեր',
        b: 'Լեո Մեսսի',
        c: 'Պելե',
        d: 'Կրիշտիանու Ռոնալդու',
        correct: 'b'
    },
    {
        id: 10,
        question: 'Ո՞վ է պատմության մեջ տուգանայիններից ամենաշատ գոլ խփած ֆուտբոլիստը:',
        a: 'Կրիշտիանու Ռոնալդու',
        b: 'Ռոնալդինյո',
        c: 'Անդրեա Պիռլո',
        d: 'Ժունինյո Պերնամբուկանո',
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