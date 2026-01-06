const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    const taskValue = inputBox.value.trim();
    
    if (taskValue === '') {
        // More professional than a browser alert
        inputBox.placeholder = "Please enter a task!";
        inputBox.classList.add("shake");
        setTimeout(() => inputBox.classList.remove("shake"), 500);
        return;
    } 

    let li = document.createElement("li");
    li.innerHTML = taskValue;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    li.appendChild(span);
    
    inputBox.value = '';
    inputBox.placeholder = "What needs to be done?";
    saveData();
}

// Support for "Enter" key
inputBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

listContainer.addEventListener("click", function(e) {
    // Check if clicked on LI or the icon inside the LI
    let targetLi = e.target.closest("li");
    let targetSpan = e.target.closest("span");

    if (targetSpan) {
        targetSpan.parentElement.remove();
        saveData();
    } else if (targetLi) {
        targetLi.classList.toggle("checked");
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listContainer.innerHTML = savedData;
    }
}

showTask();