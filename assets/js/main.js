const listContainerWrapper = document.querySelector(".list-container-wrapper")
const cards = document.querySelectorAll(".card")
const cardLists = document.querySelectorAll(".list-cards")
const mainContainer = document.querySelector(".main-container")
let x = 0
let y = 0
let draggedItem

console.log(cardLists)

window.addEventListener("load",(e)=>{
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    cards.forEach(card => card.setAttribute('draggable',true))
    /*cardLists.forEach(list => list.innerHTML.length === 0 ? list.classList.add("empty-list") : null)*/
})

cards.forEach(card=>card.addEventListener("dragstart",(e)=>{
    draggedItem = e.target
    let img = new Image()
    img.url = "../pixel.png"
    e.dataTransfer.setData('text/plain',e.target.id)
    e.dataTransfer.setDragImage(img, 0, 0);
}),false)

cards.forEach(card=>card.addEventListener("mousedown",(e)=>{
    x = e.clientX
    y = e.clientY
}),false)

cards.forEach(card=>card.addEventListener("mousemove",(e)=>{
}),false)

cards.forEach(card=>card.addEventListener("drag",(e)=>{
    e.preventDefault()
    card.classList.add("card-movable")
    let posY = y - e.clientY
    let posX = x - e.clientX
    y = e.clientY
    x = e.clientX
    /*card.style.top = (card.offsetTop - posY) + "px"
    card.style.left = (card.offsetLeft - posX)  + "px"*/
    /*ODREKAO GA SE U NOVINAMA*/
    /*card.parentNode.removeChild(draggedItem)*/
}),false)

cards.forEach(card=>card.addEventListener("dragend",(e)=>{
    e.preventDefault()
    card.classList.remove("card-movable")
}),false)

cardLists.forEach(list=>list.addEventListener("dragover",(e)=>{
    e.preventDefault()
    list.appendChild(draggedItem)
}),false)

cardLists.forEach(list=>list.addEventListener("drop",(e)=>{
    e.preventDefault()
    /*list.classList.remove("empty-list")*/
}),false)