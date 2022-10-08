// ! Elements
const input = document.getElementById("item_input");
const submit = document.getElementById("submit");
const clear = document.getElementById("clear");
const grocery_items = document.querySelector(".grocery_items");

// ! Event Listeners
submit.addEventListener("click", addItem);
grocery_items.addEventListener("click", deleteItem);
clear.addEventListener("click", clearItems);
addEventListener("DOMContentLoaded", updateDOM);

// ! Functions

// Function to add a new item
function addItem() {
  // item div
  const item = document.createElement("div");
  item.classList.add("item");

  // grocery title
  const grocery_title = document.createElement("span");
  grocery_title.classList.add("item_title");
  grocery_title.innerHTML = input.value;
  item.appendChild(grocery_title);

  // Call function save items
  saveItems(input.value);

  // delete button
  const deleteIcon = document.createElement("button");
  deleteIcon.classList.add("btnDelete");
  deleteIcon.innerHTML = "Delete";
  item.appendChild(deleteIcon);

  // Append the item to the grocery items list
  grocery_items.appendChild(item);
  input.value = "";
}

// Function to delete an item
function deleteItem(e) {
  const item = e.target;
  if (item.classList[0] === "btnDelete") {
    const list = item.parentNode;
    list.classList.add("removeItem");

    removeItem(list);
    list.addEventListener("transitionend", () => {
      list.remove();
    });
  }
}

// Function to clear the list and remove all the items from the list
function clearItems() {
  grocery_items.innerHTML = "";
  localStorage.clear();
}

// Function to save the items to the localstorage
function saveItems(item) {
  let items;
  if (localStorage.getItem("item") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("item"));
  }
  items.push(item);
  localStorage.setItem("item", JSON.stringify(items));
}

// Function to update the DOM when saving the items
function updateDOM() {
  let items;
  if (localStorage.getItem("item") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("item"));
  }

  items.forEach((element) => {
    // item div
    const item = document.createElement("div");
    item.classList.add("item");

    // grocery title
    const grocery_title = document.createElement("span");
    grocery_title.classList.add("item_title");
    grocery_title.innerHTML = element;
    item.appendChild(grocery_title);

    // delete button
    const deleteIcon = document.createElement("button");
    deleteIcon.classList.add("btnDelete");
    deleteIcon.innerHTML = "Delete";
    item.appendChild(deleteIcon);

    // Append the item to the grocery items list
    grocery_items.appendChild(item);
  });
}

// Function to delete the notes from the DOM and localstorage
function removeItem(item) {
  let items;
  if (localStorage.getItem("item") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("item"));
  }

  const itemIndex = item.children[0].innerHTML;
  items.splice(items.indexOf(itemIndex), 1);
  localStorage.setItem("item", JSON.stringify(items));
}

// Call the add item function when enter key is pressed
document.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    addItem();
  }
});
