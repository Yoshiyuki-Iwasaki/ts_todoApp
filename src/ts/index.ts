const addTask: any = document.querySelector(".add");
const list: any = document.querySelector(".todos");
const search: any = document.querySelector(".search input");

const createTodoList = (task: string) => {
  // HTML テンプレートを生成
  const html = `
    <li class="pageSec__inner__block__list__item">
        <span class="pageSec__inner__block__list__item__text">${task}</span>
        <i class="pageSec__inner__block__list__item__delete delete">x</i>
    </li>
    `;

  list.innerHTML += html;
  saveTaskToLocalStorage(task, html);
};

(function () {
  // 初期化処理
  // ローカルストレージに格納されている値を取得し、リストを生成する
  for (var key in localStorage) {
    var html = localStorage.getItem(key);
    if (html) {
      list.innerHTML += localStorage.getItem(key);
    }
  }
})();

const saveTaskToLocalStorage = (task: string, html: string) => {
  // null は、localStorage に保存しない
  if (html) {
    // localStorage は、0 から始まる
    localStorage.setItem(task, html);
    return;
  }
  return;
};

const deleteTaskFromLocalStorage = (task: string) => {
  localStorage.removeItem(task);
  return;
};

// Add機能
addTask.addEventListener("submit", (e: any) => {
  // デフォルトのイベントを無効
  e.preventDefault();

  // タスクに入力した値を空白を除外して格納
  const task = addTask.add.value.trim();
  if (task.length) {
    // Todo List の HTML を作成
    createTodoList(task);
    // タスクに入力した文字をクリア
    addTask.reset();
  }
});

// Remove機能
list.addEventListener("click", (e: any) => {
  if (e.target.classList.contains("delete")) {
    var result = window.confirm("本当に削除しますか。");
    if (result) {
      e.target.parentElement.remove();

      const task = e.target.parentElement.textContent.trim();
      deleteTaskFromLocalStorage(task);
    }
  }
});

// フィルタリング機能
const filterTasks = (term: any) => {
  Array.from(list.children)
    // フィルタ条件
    .filter((todo: any) => !todo.textContent.toLowerCase().includes(term))
    .forEach((todo: any) => todo.classList.add("filtered"));

  Array.from(list.children)
    .filter((todo: any) => todo.textContent.toLowerCase().includes(term))
    .forEach((todo: any) => todo.classList.remove("filtered"));
};

search.addEventListener("keyup", () => {
  // 空白削除かつ、小文字に変換(大文字・小文字の区別をなくす)
  const term = search.value.trim().toLowerCase();
  filterTasks(term);
});
