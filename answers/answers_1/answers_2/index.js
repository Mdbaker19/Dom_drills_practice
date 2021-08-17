const go = () => {
    window.location.href = "answers/answers_1/answers_2/answer.html";
}
(() => {
    const output = document.getElementById("cardBody");
    const doc = $("body");
    let answerChoices = [];
    let ranAnswer;
    let counter = 0;
    document.getElementById("start").addEventListener("click", () => {
        answerChoices = [];
        renderOps();
        goalNumber();
        let html = "";
        for(let i = 0; i < 18; i++) {
            let ran1 = ~~(Math.random() * 10);
            html += render(ran1, i);
        }
        output.innerHTML = "";
        output.insertAdjacentHTML("afterbegin", html);
    });
    $("#test").on("click", () => {
        let answer = answerChoices[1] === " + " ? +answerChoices[0] + +answerChoices[2] : +answerChoices[0] - +answerChoices[2];
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
        $("#count").text(counter);
        answerChoices = [];
        goalNumber();
        $("#choices").text("");
    });
    function goalNumber(){
        ranAnswer = ~~(Math.random() * 15);
        $("#ran").text("Create: " + ranAnswer.toString());
    }
    function render(num1, id) {
        return `<div id=${id} class="numCard">
                    <h1>${num1}</h1>
                </div>`
    }
    doc.on("click", ".numCard", (e) => {
        let id = +e.currentTarget.children[0].innerText;
        answerChoices.push(id);
        if(answerChoices.length === 3) {
            $("#choices").text(stringify(answerChoices));
        }
    });
    doc.on("click", ".op", (e) => {
        let op = e.currentTarget.id === "minus" ? " - " : " + ";
        if(answerChoices.length === 1) {
            answerChoices.push(op);
        }
    });
    function renderOps() {
        $("#ops").html(`<h1 id="opH1"><button class="op" id="plus">+</button><button class="op" id="minus">-</button> </h1>`)
    }

    function stringify(arr) {
        return arr.join("");
    }
})();