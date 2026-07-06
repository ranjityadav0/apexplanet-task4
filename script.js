// ==============================
// DARK MODE
// ==============================

const darkBtn = document.getElementById("darkMode");

darkBtn.addEventListener("click", () => {

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

darkBtn.innerHTML="☀️";

}else{

darkBtn.innerHTML="🌙";

}

});


// ==============================
// PRODUCT DATA
// ==============================

let products=[

{

id:1,

name:"Laptop",

category:"Electronics",

price:55000,

rating:4.8,

image:"images/laptop.jpg"

},

{

id:2,

name:"Mobile",

category:"Electronics",

price:18000,

rating:4.6,

image:"images/mobile.jpg"

},

{

id:3,

name:"Headphones",

category:"Electronics",

price:2500,

rating:4.5,

image:"images/headphone.jpg"

},

{

id:4,

name:"Smart Watch",

category:"Electronics",

price:3500,

rating:4.4,

image:"images/smartwatch.jpg"

},

{

id:5,

name:"T-Shirt",

category:"Fashion",

price:899,

rating:4.3,

image:"images/tshirt.jpg"

},

{

id:6,

name:"Jeans",

category:"Fashion",

price:1499,

rating:4.7,

image:"images/jeans.jpg"

},

{

id:7,

name:"JavaScript Book",

category:"Books",

price:699,

rating:4.9,

image:"images/javascript-book.jpg"

},

{

id:8,

name:"HTML & CSS Book",

category:"Books",

price:599,

rating:4.8,

image:"images/html-css-book.jpg"

}

];


// ==============================
// PRODUCT DISPLAY
// ==============================

const productContainer=document.getElementById("productContainer");

function displayProducts(items){

productContainer.innerHTML="";

items.forEach(product=>{

productContainer.innerHTML+=`

<div class="product">

<img src="${product.image}">

<div class="product-info">

<h3>${product.name}</h3>

<p>${product.category}</p>

<p class="price">

₹${product.price}

</p>

<p class="rating">

⭐ ${product.rating}

</p>

<button

class="add-cart"

onclick="addToCart(${product.id})">

Add To Cart

</button>

</div>

</div>

`;

});

}

displayProducts(products);


// ==============================
// SEARCH PRODUCT
// ==============================

const search=document.getElementById("searchProduct");

search.addEventListener("keyup",()=>{

let keyword=search.value.toLowerCase();

let result=products.filter(product=>{

return product.name.toLowerCase().includes(keyword);

});

displayProducts(result);

});


// ==============================
// CATEGORY FILTER
// ==============================

const category=document.getElementById("category");

category.addEventListener("change",filterProducts);


// ==============================
// PRICE SORT
// ==============================

const sort=document.getElementById("sort");

sort.addEventListener("change",filterProducts);

function filterProducts(){

let data=[...products];

if(category.value!="all"){

data=data.filter(product=>{

return product.category==category.value;

});

}

if(sort.value=="low"){

data.sort((a,b)=>a.price-b.price);

}

if(sort.value=="high"){

data.sort((a,b)=>b.price-a.price);

}

displayProducts(data);

}
// ==============================
// SHOPPING CART
// ==============================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const total = document.getElementById("total");

// Add To Cart

function addToCart(id){

let product = products.find(item => item.id === id);

let exist = cart.find(item => item.id === id);

if(exist){

exist.quantity++;

}else{

cart.push({

...product,

quantity:1

});

}

saveCart();

displayCart();

}

// Save Cart

function saveCart(){

localStorage.setItem("cart", JSON.stringify(cart));

}

// Display Cart

function displayCart(){

cartItems.innerHTML = "";

let totalPrice = 0;

let count = 0;

cart.forEach(item => {

totalPrice += item.price * item.quantity;

count += item.quantity;

cartItems.innerHTML += `

<div class="cart-item">

<img src="${item.image}" alt="${item.name}">

<div>

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<p>Qty : ${item.quantity}</p>

</div>

<div>

<button onclick="increaseQty(${item.id})">+</button>

<button onclick="decreaseQty(${item.id})">-</button>

<button onclick="removeCart(${item.id})">Remove</button>

</div>

</div>

`;

});

cartCount.innerHTML = count;

total.innerHTML = totalPrice;

}

// Increase Quantity

function increaseQty(id){

cart.forEach(item=>{

if(item.id===id){

item.quantity++;

}

});

saveCart();

displayCart();

}

// Decrease Quantity

function decreaseQty(id){

cart.forEach(item=>{

if(item.id===id){

item.quantity--;

}

});

cart = cart.filter(item=>item.quantity>0);

saveCart();

displayCart();

}

// Remove Product

function removeCart(id){

cart = cart.filter(item=>item.id!==id);

saveCart();

displayCart();

}

// First Load

displayCart();
// ==============================
// TODO LIST
// ==============================

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const searchTask = document.getElementById("searchTask");
const taskList = document.getElementById("taskList");
const clearTask = document.getElementById("clearTask");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save Tasks

function saveTasks(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

// Display Tasks

function displayTasks(){

taskList.innerHTML="";

let keyword=searchTask.value.toLowerCase();

tasks.forEach((task,index)=>{

if(task.text.toLowerCase().includes(keyword)){

taskList.innerHTML+=`

<li>

<span style="${task.done ? 'text-decoration:line-through;color:gray;' : ''}">

${task.text}

</span>

<div>

<button onclick="completeTask(${index})">

✔

</button>

<button onclick="editTask(${index})">

✏

</button>

<button onclick="deleteTask(${index})">

🗑

</button>

</div>

</li>

`;

}

});

}

// Add Task

addTask.addEventListener("click",()=>{

let value=taskInput.value.trim();

if(value===""){

alert("Enter Task");

return;

}

tasks.push({

text:value,

done:false

});

saveTasks();

displayTasks();

taskInput.value="";

});

// Complete Task

function completeTask(index){

tasks[index].done=!tasks[index].done;

saveTasks();

displayTasks();

}

// Delete Task

function deleteTask(index){

tasks.splice(index,1);

saveTasks();

displayTasks();

}

// Edit Task

function editTask(index){

let update=prompt("Edit Task",tasks[index].text);

if(update){

tasks[index].text=update;

saveTasks();

displayTasks();

}

}

// Search Task

searchTask.addEventListener("keyup",displayTasks);

// Clear All

clearTask.addEventListener("click",()=>{

if(confirm("Delete All Tasks?")){

tasks=[];

saveTasks();

displayTasks();

}

});

displayTasks();


// ==============================
// CONTACT FORM
// ==============================

const form=document.getElementById("contactForm");

form.addEventListener("submit",function(e){

e.preventDefault();

alert("Thank You! Your message has been sent.");

form.reset();

});


// ==============================
// SCROLL ANIMATION
// ==============================

window.addEventListener("scroll",()=>{

let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

let position=card.getBoundingClientRect().top;

let screen=window.innerHeight;

if(position<screen-100){

card.style.opacity="1";

card.style.transform="translateY(0)";

}

});

});


// ==============================
// CARD ANIMATION
// ==============================

document.querySelectorAll(".card").forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition=".8s";

});