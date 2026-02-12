const message = document.getElementById("message");
const btn = document.getElementById("btnMessage");
const GOAL = 10;
const messages = {
  normal: (c) => `クリック回数:${c}`,
  near: (c) => `クリック回数:${c}(もう少し!)`,
  goal: "🎉 10回達成！"
};

const countText = document.getElementById("count");
const btnCount = document.getElementById("btnCount");
const restBtn = document.getElementById("resetBtn");

// 【変数の設定】

let count = 0;

let isAchieved = false ;
// 意味：「まだ達成していない」


// 【関数の設定】

// 関数：まとめ役

function updateDisplay(){
  updateText();
  updateButtonState();
}

// 関数：表示担当
function updateText (){
  if (count >= GOAL){
    countText.textContent = messages.goal;
    countText.classList.add("achieved");
  }

  else if(count >= 5){
    countText.textContent = messages.near(count);
    countText.classList.remove("achieved");
  }

  else {
    countText.textContent = messages.normal(count);
    countText.classList.remove("achieved");
  }
}

// 関数：ボタン担当

function updateButtonState(){
  if (count >= GOAL){
    btnCount.disabled = true;

    if (! isAchieved){
      alert ("目標達成です！おめでとうございます！");
      isAchieved = true ;
    }

  }

  else{
    btnCount.disabled = false;
  }
}


// 【関数の実行】

btnMessage.addEventListener("click", () => {
  message.textContent = "クリックされました！";
});

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