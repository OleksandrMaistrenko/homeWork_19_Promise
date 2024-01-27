const buttons = document.getElementsByTagName("button");

const promisses = [];
const unPairButtons = [];
const pairButtons = [];

for (let i = 0; i < buttons.length; i++) {
  promisses.push(
    new Promise((resolve) => {
      buttons[i].addEventListener("click", showShadowForButton);
      resolve(i);
    })
  );
}

Promise.all(promisses).then((result) => {
  result.forEach((el) => {
    if (el % 2 === 0) {
      pairButtons.push(el);
    } else {
      unPairButtons.push(el);
    }
  });
});

function showResult(value) {
  const ul = document.getElementById("result");
  let li = document.createElement("li");
  li.innerHTML = value;
  ul.appendChild(li);
}

function showShadowForButton() {
  this.classList.add("shadow");
  if (+this.innerText % 2 === 0) {
    pairButtons.pop();
    notifyAllPairPressed();
  } else {
    unPairButtons.pop();
    notifyAllUnPairPressed();
  }
  notifyAllPressed();
  this.removeEventListener("click", showShadowForButton);
}

function notifyAllPairPressed() {
  if (pairButtons.length === 0) {
    showResult(`All pair buttons are pressed`);
  }
}
function notifyAllUnPairPressed() {
  if (unPairButtons.length === 0) {
    showResult(`All unpair buttons are pressed`);
  }
}
function notifyAllPressed() {
  if (unPairButtons.length === 0 && pairButtons.length === 0) {
    showResult(`All buttons are pressed`);
  }
}
