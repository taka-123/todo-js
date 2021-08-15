import "./styles.css";

const onClickAdd = () => {
  // テキストボックスの値を取得し、初期化する
  const inputText = document.querySelector("#add-text").value;
  document.querySelector("#add-text").value = "";

  createIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除
const deleteFromIncompleteList = (target) => {
  document.querySelector("#incomplete-list").removeChild(target);
};

// 未完了リストに追加する関数
const createIncompleteList = (text) => {
  // li生成
  const li = document.createElement("li");

  // div生成
  const div = document.createElement("div");
  div.className = "list-row";

  // p生成
  const p = document.createElement("p");
  p.innerText = text;

  // button(完了)タグ生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの祖先タグ(li)を未完了リストから削除
    deleteFromIncompleteList(completeButton.closest("li"));

    // 完了リストに追加する要素
    const addTarget = completeButton.closest("li");

    // TODO内容テキストを取得
    const text = addTarget.querySelector("p").innerText;

    // divタグの中を初期化
    const div = addTarget.querySelector(".list-row");
    div.textContent = null;

    // p生成
    const p = document.createElement("p");
    p.innerText = text;

    // butto生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの祖先タグ(li)を完了リストから削除
      const deleteTarget = backButton.closest("li");
      document.querySelector("#complete-list").removeChild(deleteTarget);

      // テキスト取得
      const text = deleteTarget.querySelector("p").innerText;
      createIncompleteList(text);
    });

    // liタグの子要素に各要素を設定
    div.appendChild(p);
    div.appendChild(backButton);
    addTarget.appendChild(div);

    // 未完了リストに追加
    const incompleteList = document.querySelector("#complete-list");
    incompleteList.appendChild(addTarget);
  });

  // button(削除)タグ生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの祖先タグ(li)を未完了リストから削除
    deleteFromIncompleteList(deleteButton.closest("li"));
  });

  // liタグの子要素に各要素を設定
  li.appendChild(div);
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  const incompleteList = document.querySelector("#incomplete-list");
  incompleteList.appendChild(li);
};

document
  .querySelector("#add-button")
  .addEventListener("click", () => onClickAdd());
