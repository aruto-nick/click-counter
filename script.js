const message = document.getElementById("message");
const btn = document.getElementById("btnMessage");

btnMessage.addEventListener("click", () => {
  message.textContent = "クリックされました！";
});

const countText = document.getElementById("count");
const btnCount = document.getElementById("btnCount");
const restBtn = document.getElementById("resetBtn");

let count = 0;


// 関数：まとめ役

function updateDisplay(){
  updateText();
  updateButtonState();
}

// 関数：表示担当
function updateText (){
  if (count >= 10){
    countText.textContent = "🎉 10回達成！";
    countText.classList.add("achieved");
  }

  else if(count >= 5){
    countText.textContent = `クリック回数：${count}(もう少し！)`;
    countText.classList.remove("achieved");
  }

  else {
    countText.textContent = `クリック回数：${count}`;
    countText.classList.remove("achieved");
  }
}

// 関数：ボタン担当

function updateButtonState(){
  if (count >= 10){
    btnCount.disabled = true;
  }

  else{
    btnCount.disabled = false;
  }
}

btnCount.addEventListener("click",()=>{
  count++;
  updateDisplay();  
});



resetBtn.addEventListener("click",()=>{
  count = 0 ;
  btnCount.disabled = false ;
  updateDisplay();
});

updateDisplay();