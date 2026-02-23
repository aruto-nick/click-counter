const message = document.getElementById("message");
const btnMessage = document.getElementById("btnMessage");
const GOAL = 10;
const NEAR_GOAL = 5;
const messages = {
  normal: (c) => `クリック回数:${c}`,
  near: (c) => `クリック回数:${c}(もう少し!)`,
  goal: "🎉 10回達成！"
};

// 定数：状態メッセージのまとめ
const stateMessages = {
  start:"開始前です",
  progress:"挑戦中です",
  complete:"達成済みです"
};

// 定数：アプリのクリック状態を3段階で表示
const appState = document.getElementById("appState");

const countText = document.getElementById("count");
const btnCount = document.getElementById("btnCount");
const resetBtn = document.getElementById("resetBtn");

// 定数：定数STORAGE_KEYを設定することで文字列clickCountの名称変更が楽
const STORAGE_KEY = "clickCount";

const saveStatus = document.getElementById("saveStatus");


// 【変数の設定】

let count = 0;

let isAchieved = false ;
// 意味：「まだ達成していない」

// 変数：保存ステータス（表示を消すための）タイマーID
let saveStatusTimerId = null ;


// 【関数の設定】

// 関数：値の変更を担当
function incrementCount () {
  count++;
}

// 関数：カウント０を担当
function resetCount (){
  count = 0 ;
}

function isGoalReached (){
  return count >= GOAL;
}

// 関数：カウント変更後の処理2つ
function updateAfterCountChange(){
  saveCount();
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

// 関数：表示担当
function updateText (){
  if (isGoalReached ()){
    countText.textContent = messages.goal;
    countText.classList.add("achieved");
  }

  else if(count >= NEAR_GOAL){
    countText.textContent = messages.near(count);
    countText.classList.remove("achieved");
  }

  else {
    countText.textContent = messages.normal(count);
    countText.classList.remove("achieved");
  }

  const state = getAppState();

  appState.textContent = stateMessages[state];
}


// 関数：保存担当

function saveCount(){
  localStorage.setItem(STORAGE_KEY,String(count));
  saveStatus.textContent = "自動保存しました";

  // 連打しても最後の通知だけ残すために、前のタイマーを消す
  if (saveStatusTimerId !== null){
    clearTimeout(saveStatusTimerId);
  }

  // １秒後に通知を消す
  saveStatusTimerId = setTimeout ( () => {
    saveStatus.textContent = "";
    saveStatusTimerId = null;
  },1000);


}

// 関数：状態を判断
function getAppState () {
  if (count === 0){
    return "start";
  }
  else if (count < GOAL){
    return "progress";
  }
  else {
    return "complete";
  }
}

// 関数：ボタン担当

function updateButtonState(){
  if (isGoalReached ()){
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
  updateAfterCountChange();
}

// 関数：リセットをクリック時の処理

function handleResetClick (){
  resetCount();
  isAchieved = false;
  localStorage.removeItem(STORAGE_KEY);

  saveStatus.textContent = "";

  // reset時もタイマーを止める（安全策）
  if (saveStatusTimerId !== null) {
    clearTimeout(saveStatusTimerId);
    saveStatusTimerId = null;
  }

  updateAfterCountChange();
}


// 【関数の実行】

btnMessage.addEventListener("click", () => {
  message.textContent = "クリックされました！";
});

btnCount.addEventListener("click",(handleCountClick));



resetBtn.addEventListener("click",(handleResetClick));

init();