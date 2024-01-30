// HTML要素を取得するためのヘルパー関数
function createElement(type, text) {
  const element = document.createElement(type);
  element.textContent = text;
  return element;
}

// シャッフル関数
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// オブジェクトを解析してHTMLに挿入する関数
function displayMountainInfo(data) {
  const container = document.getElementById("mountainInfo");
  container.innerHTML = ""; // コンテナをクリア

  data.forEach((questionText) => {
    // 波括弧で囲まれた部分で分割
    const parts = questionText.split(/(\{[^}]+\})/);

    parts.forEach((part) => {
      if (part.startsWith("{") && part.endsWith("}")) {
        // 波括弧で囲まれた部分をspan要素に追加
        const mountainName = part.slice(1, -1);
        const span = createElement("span", mountainName);
        span.style.display = "none"; // span要素を非表示にする
        container.appendChild(span);

        // 波括弧で囲まれた部分の直後にボタンを表示
        const button = createElement("button", "????????");
        // ボタンにクリックイベントを追加
        button.addEventListener("click", () => {
          // span要素を表示し、ボタンを非表示にする
          span.style.display = "inline";
          button.style.display = "none";
        });
        container.appendChild(button);
      } else {
        // 波括弧で囲まれていない部分を追加
        container.appendChild(createElement("span", part));
      }
    });

    // 改行する
    container.appendChild(document.createElement("br"));
    container.appendChild(document.createElement("br"));
  });
}

// ページの読み込みが完了したらデータを表示
window.onload = function () {
  // ファイルのパス（相対パスや絶対パスを適切に設定）
  const csvFilePath = "questions.csv";

  // CSVファイルを読み込む
  fetch(csvFilePath)
    .then((response) => response.text())
    .then((csvData) => {
      // 改行で分割して配列に変換
      const questionsArray = csvData.split("\n").filter(Boolean);
      // シャッフル
      shuffleArray(questionsArray);
      // データを表示
      displayMountainInfo(questionsArray);
    })
    .catch((error) => console.error("Error fetching CSV file:", error));
};
