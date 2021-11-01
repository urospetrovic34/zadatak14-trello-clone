const body = document.querySelector("body")
const listContainerWrapper = document.querySelector(".list-container-wrapper")
const cards = document.querySelectorAll(".card")
const cardLists = document.querySelectorAll(".list-cards")
const mainContainer = document.querySelector(".main-container")
let x = 0
let y = 0
let draggedItem
let isActive = false

console.log(cardLists)

window.addEventListener("load",(e)=>{
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    cards.forEach(card => card.setAttribute('draggable',true))
    /*cardLists.forEach(list => list.innerHTML.length === 0 ? list.classList.add("empty-list") : null)*/
})

cards.forEach(card => card.addEventListener('mousedown',(e)=>{
}))

cards.forEach(card => card.addEventListener('drag',(e)=>{
    card.classList.add("card-movable")
}))

cards.forEach(card => card.addEventListener('dragstart',(e)=>{
    draggedItem = card
}))

cards.forEach(card => card.addEventListener('dragend',(e)=>{
    card.classList.remove("card-movable")
}))

cardLists.forEach(list => list.addEventListener('dragover',(e)=>{
    list.appendChild(draggedItem)
}))