(function() {
    //constants and cached
    let shuffled, questionIdx;
    let total = 0;
    const subjectsContainer = document.getElementById("subjects-container");
    const questionsContainer = document.getElementById("questions-container");
    const questionEl = document.getElementById("question");
    const allSubjects = document.getElementById("all-subjects");
    const questionsNumber = document.getElementById("numbers");
    const answers = document.getElementById("answers");

    const nextBtn = document.getElementById("next");
    const restartBtn = document.getElementById("restart");
    const msgDiv = document.getElementById("winning-message");
    const msg = document.getElementById("msg");

    //event listeners
    allSubjects.addEventListener("click", init);
    nextBtn.addEventListener("click", () => {
        questionIdx++;
        questionsNumber.innerText = `${questionIdx + 1}/10`;
        callNext();
    });
    restartBtn.addEventListener("click", () => {
        questionsContainer.classList.add("hide");
        subjectsContainer.classList.remove("hide");
        msgDiv.classList.add("hide");
        init();
    });

    //functions

    function init(evt) {
        const selectedBtn = evt.target;
        if (selectedBtn === document.getElementById("html")) {
            shuffled = htmlQuestions.sort(() => Math.random() - 0.5);
        } else if (selectedBtn === document.getElementById("css")) {
            shuffled = cssQuestions.sort(() => Math.random() - 0.5);
        } else {
            shuffled = jsQuestions.sort(() => Math.random() - 0.5);
        }
        questionIdx = 0;
        questionsNumber.innerText = "1/10";
        subjectsContainer.classList.add("hide");
        questionsContainer.classList.remove("hide");
        callNext();
    }

    function callNext() {
        cleargame();
        showQuestion(shuffled[questionIdx]);
    }

    function showQuestion(question) {
        questionEl.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerText = answer.text;
            button.classList.add("btn");
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", chosenAnswer);
            answers.appendChild(button);
        });
    }

    function cleargame() {
        nextBtn.classList.add("hide");
        while (answers.firstChild) {
            answers.removeChild(answers.firstChild);
        }
    }

    function chosenAnswer(evt) {
        let selectedAnswer = evt.target;
        let correct = selectedAnswer.dataset.correct;
        if (correct) {
            total++;
        }
        [...answers.children].forEach(button => {
            setColor(button, button.dataset.correct);
        });
        if (shuffled.length > questionIdx + 1) {
            nextBtn.classList.remove("hide");
        } else {
            console.log("inside");
            yourPoints();
        }
    }

    function setColor(element, correct) {
        clearClass(element);
        if (correct) {
            element.classList.add("correct");
        } else {
            element.classList.add("wrong");
        }
    }

    function clearClass(element) {
        element.classList.remove("correct");
        element.classList.remove("wrong");
    }

    function yourPoints() {
        console.log("points");
        msg.innerText = `You got ${total} correct answers!`;
        msgDiv.classList.remove("hide");
    }

    const htmlQuestions = [
        {
            question: "Which one is an empty element?",
            answers: [
                { text: "<h1>My Title</h1>", correct: false },
                { text: "<br>", correct: true },
                { text: "<p></p>", correct: false },
                { text: '<img src="" alt="">', correct: false }
            ]
        },
        {
            question: "How do you insert a comment?",
            answers: [
                { text: "// my comment", correct: false },
                { text: "<* y comment *>", correct: false },
                { text: "/* my comment */", correct: false },
                { text: "<!-- my comment -->", correct: true }
            ]
        },
        {
            question: "Which one is the largest heading?",
            answers: [
                { text: "<h1>", correct: true },
                { text: "<header>", correct: false },
                { text: "<h0>", correct: false },
                { text: "<title>", correct: false }
            ]
        },
        {
            question:
                "Which one is the correct tag for making a dropdown list?",
            answers: [
                { text: "<dropdown>", correct: false },
                { text: '<input type="list">', correct: false },
                { text: "<select>", correct: true },
                { text: '<input type="dropdown">', correct: false }
            ]
        },
        {
            question:
                "Which one is the correct element for playing audio files?",
            answers: [
                { text: "<mp3>", correct: false },
                { text: "<audio>", correct: true },
                { text: "<sound>", correct: false },
                { text: "<wav>", correct: false }
            ]
        },
        {
            question:
                "Which one is the correct element for playing video files?",
            answers: [
                { text: "<video>", correct: true },
                { text: "<mov>", correct: false },
                { text: "<movie>", correct: false },
                { text: "<media>", correct: false }
            ]
        },
        {
            question: "Which tag is an inline element?",
            answers: [
                { text: "<figcaption>", correct: false },
                { text: "<form>", correct: false },
                { text: "<blockquote>", correct: false },
                { text: "<img>", correct: true }
            ]
        },
        {
            question: "Which tag is an block element?",
            answers: [
                { text: "<label>", correct: false },
                { text: "<textarea>", correct: false },
                { text: "<fieldset>", correct: true },
                { text: "<time>", correct: false }
            ]
        },
        {
            question: "How do you mark an important(bold) text in HTML?",
            answers: [
                { text: "<i>", correct: false },
                { text: "<strong>", correct: true },
                { text: "<important>", correct: false },
                { text: "<super>", correct: false }
            ]
        },
        {
            question: "How do you add a preformatted text in HTML?",
            answers: [
                { text: "<preformat>", correct: false },
                { text: "<format>", correct: false },
                { text: "<preformatted>", correct: false },
                { text: "<pre>", correct: true }
            ]
        }
    ];

    const cssQuestions = [
        {
            question: "What does CSS stands for?",
            answers: [
                { text: "Cataract Style Sheets", correct: false },
                { text: "Cascading Style Sheets", correct: true },
                { text: "Cataract Sheets Styles", correct: false },
                { text: "Cascading Sheets Styles", correct: false }
            ]
        },
        {
            question: "Which one is the universal selector?",
            answers: [
                { text: "main", correct: false },
                { text: "body", correct: false },
                { text: "*", correct: true },
                { text: "header", correct: false }
            ]
        },
        {
            question:
                "If you want to use a radial-gradient for your background color, which property would you put it on?",
            answers: [
                { text: "background-colors", correct: false },
                { text: "background-image", correct: true },
                { text: "background-color", correct: false },
                { text: "background-gradient", correct: false }
            ]
        },
        {
            question:
                "If you want to change the size of a text, which property would you choose?",
            answers: [
                { text: "text-height", correct: false },
                { text: "font-size", correct: true },
                { text: "font-weight", correct: false },
                { text: "text-size", correct: false }
            ]
        },
        {
            question:
                "If you want the margin to have top: 10px, bottom: 20px, left: 5px and right: 9px, how would you right it using the shorthand?",
            answers: [
                { text: "margin: 20px 9px 10px 5px;", correct: false },
                { text: "margin: 10px 9px 20px 5px;", correct: true },
                { text: "margin: 10px 5px 20px 9px;", correct: false },
                { text: "margin: 10px 20px 5px 9px;", correct: false }
            ]
        },
        {
            question: "How do you select an element with class name of 'mine",
            answers: [
                { text: "*mine", correct: false },
                { text: "#mine", correct: false },
                { text: "mine", correct: false },
                { text: ".mine", correct: true }
            ]
        },
        {
            question: "Which one is the general sibling selector?",
            answers: [
                { text: "~", correct: true },
                { text: "*", correct: false },
                { text: ">", correct: false },
                { text: "+", correct: false }
            ]
        },
        {
            question: "Which one is the child selector?",
            answers: [
                { text: "~", correct: false },
                { text: "<", correct: false },
                { text: ">", correct: true },
                { text: "+", correct: false }
            ]
        },
        {
            question: "Which one is more specific?",
            answers: [
                { text: "tag", correct: false },
                { text: "inline style", correct: true },
                { text: "class", correct: false },
                { text: "id", correct: false }
            ]
        },
        {
            question: "What are the items of the CSS Box Model?",
            answers: [
                { text: "border, padding and content", correct: false },
                { text: "margin, border and padding", correct: false },
                { text: "padding, margin and content", correct: false },
                { text: "border, padding, margin and content", correct: true }
            ]
        }
    ];

    const jsQuestions = [
        {
            question: "What would be the result of 3 + 6 + '2'?",
            answers: [
                { text: "11", correct: false },
                { text: "92", correct: true },
                { text: "362", correct: false },
                { text: "38", correct: false }
            ]
        },
        {
            question: "Which of the below is a function expression?",
            answers: [
                { text: "let myFunc = (num) {...}", correct: true },
                { text: "let function myFunc(num) = {...}", correct: false },
                { text: "function myFunc(num) {...}", correct: false },
                { text: "let myFunc = (num) => {...}", correct: false }
            ]
        },
        {
            question:
                "If you want to select all elements that match a given class name, which one you would choose?",
            answers: [
                { text: "getElementByClassName()", correct: false },
                { text: "querySelectorAll()", correct: true },
                { text: "getAllElements()", correct: false },
                { text: "querySelector()", correct: false }
            ]
        },
        {
            question: "How can I get the nearest rounded up integer for 7.8?",
            answers: [
                { text: "Math.random(7.8)", correct: false },
                { text: "Math.ceil(7.8)", correct: true },
                { text: "Math.max(7.8)", correct: false },
                { text: "Math.pow(7.8)", correct: false }
            ]
        },
        {
            question:
                "Which array method will return a new array with the same length as the source array?",
            answers: [
                { text: "sourceArray.reduce(cb)", correct: false },
                { text: "sourceArray.map(cb)", correct: true },
                { text: "sourceArray.every(cb)", correct: false },
                { text: "sourceArray.filter(cb)", correct: false }
            ]
        },
        {
            question:
                "Which option would you choose to delete the second element of an array called cars?",
            answers: [
                { text: "delete cars[1]", correct: true },
                { text: "del cars[2]", correct: false },
                { text: "delete cars[2]", correct: false },
                { text: "del cars[1]", correct: false }
            ]
        },
        {
            question:
                "myArr = [[1], [2], [3, [4, {'my num': 8}]]]. Choose the one that gives me: 8. ",
            answers: [
                { text: "myArr[3][1][1]['my num']", correct: false },
                { text: "myArr[2][1][1]['my num']", correct: true },
                { text: "myArr[2][1][2]['my num']", correct: false },
                { text: "myArr[3][2][1]['my num']", correct: false }
            ]
        },
        {
            question:
                "let myArr = [34, 23, 5, 68]. How can I sort this array ascending?",
            answers: [
                { text: "myArr.sort((a,b) => b - a)", correct: false },
                {
                    text: "myArr.sort((a,b) => arr[a] - arr[b])",
                    correct: false
                },
                { text: "myArr.sort((a,b) => a + b)", correct: false },
                { text: "myArr.sort((a,b) => a - b)", correct: true }
            ]
        },
        {
            question: "Which one is a falsy value in JS?",
            answers: [
                { text: "function(){} (empty function)", correct: false },
                { text: "'false'", correct: false },
                { text: "' ' (empty string)", correct: true },
                { text: "[ ] (empty array)'", correct: false }
            ]
        },
        {
            question:
                "myVar =  'HELLO'; How can I find the 3rd letter in the variable?",
            answers: [
                { text: "myVar[2]", correct: true },
                { text: "myVar.charCodeAt(2)", correct: false },
                { text: "myVar[3]", correct: false },
                { text: "myVar.find(3)", correct: false }
            ]
        }
    ];
})();
