const message = document.getElementById("message");
const btnMessage = document.getElementById("btnMessage");
const GOAL = 10;
const messages = {
  normal: (c) => `クリック回数:${c}`,
  near: (c) => `クリック回数:${c}(もう少し!)`,
  goal: "🎉 10回達成！"
};

const countText = document.getElementById("count");
const btnCount = document.getElementById("btnCount");
const resetBtn = document.getElementById("resetBtn");

const STORAGE_KEY = "clickCount";

const saveStatus = document.getElementById("saveStatus");


// 【変数の設定】

let count = 0;

let isAchieved = false ;
// 意味：「まだ達成していない」


// 【関数の設定】

// init関数

function init () {
  loadCount();
  updateDisplay();
}

function loadCount () {
  const savedCount = localStorage.getItem(STORAGE_KEY);
  console.log("保存されている値:",savedCount);

  if (savedCount !== null){
    count = Number (savedCount);
  }
}

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

// 関数：①カウント＋１　②　③画面の表示

function handleCountClick (){
  count ++;
  // console.log("保存する値:",count);

  localStorage.setItem(STORAGE_KEY,String(count));

  saveStatus.textContent = "自動保存しました";

  updateDisplay();
}

// 関数：①カウント＋１　②　③　④画面の表示

function handleResetClick (){
  count = 0;
  isAchieved = false;
  localStorage.removeItem(STORAGE_KEY);

  saveStatus.textContent = "";

  updateDisplay();
}


// 【関数の実行】

btnMessage.addEventListener("click", () => {
  message.textContent = "クリックされました！";
});

btnCount.addEventListener("click",(handleCountClick));



resetBtn.addEventListener("click",(handleResetClick));

init();