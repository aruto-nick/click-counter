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

// 目的：定数STORAGE_KEYを設定することで文字列clickCountの名称変更が楽
const STORAGE_KEY = "clickCount";

const saveStatus = document.getElementById("saveStatus");


// 【変数の設定】

let count = 0;

let isAchieved = false ;
// 意味：「まだ達成していない」


// 【関数の設定】

// 関数：値の変更を担当
function incrementCount () {
  count++;
}

// 関数：カウント０を担当
function resetCount (){
  count = 0 ;
}

// 関数：カウント変更後の処理2つ
function onCountChanged(){
  savedCount();
  updateDisplay();
}


//関数：保存回数の復元＆表示

function init () {
  loadCount();
  updateDisplay();
}

// 関数の目的：前回保存した回数を今のアプリに復元する
// ①メモ帳に前回の回数があるか確認　②保存データあレバ、回数を出す

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

// 関数：保存担当

function savedCount(){
  localStorage.setItem(STORAGE_KEY,String(count));
  saveStatus.textContent = "自動保存しました";
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

// 関数：カウントをクリック時の処理

function handleCountClick (){
  incrementCount();
  onCountChanged();
}

// 関数：リセットをクリック時の処理

function handleResetClick (){
  resetCount();
  isAchieved = false;
  localStorage.removeItem(STORAGE_KEY);

  saveStatus.textContent = "";

  onCountChanged();
}


// 【関数の実行】

btnMessage.addEventListener("click", () => {
  message.textContent = "クリックされました！";
});

btnCount.addEventListener("click",(handleCountClick));



resetBtn.addEventListener("click",(handleResetClick));

init();