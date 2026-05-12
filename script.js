const firebaseConfig = {

  apiKey: "AIzaSyD2ZvVaN_ZWrTKvQdWGpdLyt0jb1FHnVp4",

  authDomain: "cardgame-ed26e.firebaseapp.com",

  projectId: "cardgame-ed26e",

  storageBucket: "cardgame-ed26e.firebasestorage.app",

  messagingSenderId: "830034089374",

  appId: "1:830034089374:web:7c00cf947426a813f8b28f"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

let selectedChoice = "";



async function startGame() {

  const name =
    document.getElementById("name").value.trim();

  const studentId =
    document.getElementById("studentId").value.trim();

  const choice =
    document.getElementById("choice").value;



  if (!name || !studentId || !choice) {

    alert("이름, 학번, 선택을 모두 입력해줘!");

    return;

  }



  // 중복 참여 검사
  const snapshot =
    await db.collection("rpsGame")

    .where(
      "studentId",
      "==",
      studentId
    )

    .get();



  if (!snapshot.empty) {

    alert("이미 참여한 학생이야!");

    return;

  }



  selectedChoice = choice;



  document.getElementById("start-screen")
    .style.display = "none";



  document.getElementById("game-screen")
    .style.display = "block";

}



async function playGame() {

  const choices =
    ["가위", "바위", "보"];



  let computer = "";



  // 무승부 안 나오게 반복
  do {

    computer =
      choices[
        Math.floor(
          Math.random() * 3
        )
      ];

  } while (computer === selectedChoice);



  const display =
    document.getElementById(
      "computer-choice"
    );



  if (computer === "가위") {

    display.textContent = "✌️";

  } else if (computer === "바위") {

    display.textContent = "✊";

  } else {

    display.textContent = "✋";

  }



  let result = "";
  let score = 0;



  // 승리 조건
  if (

    (selectedChoice === "가위" && computer === "보") ||

    (selectedChoice === "바위" && computer === "가위") ||

    (selectedChoice === "보" && computer === "바위")

  ) {

    result = "승리! 2점 🎉";

    score = 2;

  } else {

    result = "패배! 0점 😢";

  }



  document.getElementById("result-text")
    .textContent = result;



  const name =
    document.getElementById("name").value;

  const studentId =
    document.getElementById("studentId").value;



  // Firebase 저장
  await db.collection("rpsGame").add({

    name: name,

    studentId: studentId,

    userChoice: selectedChoice,

    computerChoice: computer,

    result: result,

    score: score,

    time: new Date()

  });



  // 게임 끝나면 버튼 숨기기
  document.querySelector(
    "#game-screen button"
  ).style.display = "none";

}
