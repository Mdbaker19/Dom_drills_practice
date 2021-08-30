// outside the IIFE as you need to be able to call it when you are told to
// change the url to this file path
const go = () => {
    window.location.href = "answer.html";
}
(() => {

    const output = document.getElementById("cardBody");
    const doc = $("body");
    const answerBtn = $("#test");
    let answerChoices = [];
    let ranAnswer;
    let counter = 0;
    answerBtn[0].hidden = true;

    // clear the answer choices if this is the second time around,
    // render the operators, numbers and target value
    document.getElementById("start").addEventListener("click", () => {
        answerChoices = [];
        renderOps();
        goalNumber();
        renderNumbers();
    });

    answerBtn.on("click", () => {
        let answer = answerChoices[1] === " + " ? // is the operator a "+" sign?
            +answerChoices[0] + +answerChoices[2] : // yes => the answer is the [0] + the [2]
            +answerChoices[0] - +answerChoices[2]; // otherwise it is the 2 - each other
        if(answer === +ranAnswer) {
            counter++;
            $("#rightWrong").text("Right!")
        } else {
            $("#rightWrong").text("Wrong!")
        }
        if(counter === 2) {
            console.log("run go() to move on");
            $("#rightWrong").text("Check console to move on");
        }
        // render the numbers again, separate function as it is used a lot
        // update counter, answer choices arr, target value, clear your prev choices and show the operators again
        renderNumbers();
        $("#count").text(counter);
        answerChoices = [];
        goalNumber();
        $("#choices").text("");
        activate();
    });

    // this event listener is written a bit different
    // for each of the cards, get the value of the specific number clicked
    doc.on("click", ".numCard", (e) => {
        let id = +e.currentTarget.children[0].innerText;
        if(e.currentTarget.classList.contains("clicked")) return;
        // do not let this 'click' count if it is not your first / third choice
        if(answerChoices.length === 1 || answerChoices.length > 2) return;

        // add the values into your running answer arr (the one used later and above)
        // update the text value, hide the button you clicked
        answerChoices.push(id);
        $("#choices").text(stringify(answerChoices));
        disable(e);
        // show the button to answer if this is the third value you picked
        if(answerChoices.length === 3) answerBtn[0].hidden = false;
    });

    // same style of event listener as this is a dynamically rendered component
    doc.on("click", ".op", (e) => {
        let op = e.currentTarget.id === "minus" ? " - " : " + ";
        // only add this if it is the 2 button clicked
        if(answerChoices.length === 1) {
            answerChoices.push(op);
        } else return;
        // update the text and hide the op choice
        $("#choices").text(stringify(answerChoices));
        disable(e);
    });

    // renders a set or random numbers
    function renderNumbers(){
        let html = "";
        for(let i = 0; i < 18; i++) {
            let ran1 = ~~(Math.random() * 10);
            html += render(ran1, i);
        }
        output.innerHTML = "";
        output.insertAdjacentHTML("afterbegin", html);
    }
    function render(num1, id) {
        return `<div id=${id} class="numCard">
                    <h1>${num1}</h1>
                </div>`
    }

    // random goal num and update the html with it
    function goalNumber(){
        ranAnswer = ~~(Math.random() * 15);
        $("#ran").text("Create: " + ranAnswer.toString());
    }

    // create the ops
    function renderOps() {
        $("#ops").html(`<h1 id="opH1">
                                <button class="op" id="plus">+</button>
                                <button class="op" id="minus">-</button> 
                             </h1>`);
    }

    // pretty useless function but, practice with extracting code into functions
    function stringify(arr) {
        return arr.join("");
    }
    // disable whatever html ele is passed in
    function disable(value){
        value.currentTarget.hidden = true;
    }
    // show the operators again, looping through both as either could be hidden
    function activate(){
        Array.from($(".op")).forEach(ele => {
            ele.hidden = false;
        });
    }
})();