const listContainerWrapper = document.querySelector(".list-container-wrapper")
const cards = document.querySelectorAll(".card")
const cardLists = document.querySelectorAll(".list-cards")
let x = 0
let y = 0
let draggedItem

console.log(cardLists)

window.addEventListener("load",(e)=>{
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    cards.forEach(card => card.setAttribute('draggable',true))
    cardLists.forEach(list => list.innerHTML.length === 0 ? list.style.height = "100px" : null)
})

cards.forEach(card=>card.addEventListener("dragstart",(e)=>{
    draggedItem = e.target
    let img = new Image()
    img.url = "../pixel.png"
    e.dataTransfer.setDragImage(img, 0, 0);
}),false)

window.addEventListener("mousedown",(e)=>{
    x = e.clientX
    y = e.clientY
})

cards.forEach(card=>card.addEventListener("drag",(e)=>{
    e.preventDefault()
    let posY = y - e.clientY
    let posX = x - e.clientX
    y = e.clientY
    x = e.clientX
    card.style.top = (card.offsetTop - posY) + "px"
    card.style.left = (card.offsetLeft - posX)  + "px"
    card.classList.add("card-movable")
}),false)

cards.forEach(card=>card.addEventListener("dragend",(e)=>{
    e.preventDefault()
    card.classList.remove("card-movable")
}),false)

cards.forEach(card=>card.addEventListener("dragover",(e)=>{
    e.preventDefault()
}),false)

cards.forEach(card=>card.addEventListener("dragenter",(e)=>{
    if(!card.classList.contains("card-movable")){
        card.style.background = "purple"
    }
}),false)

cards.forEach(card=>card.addEventListener("dragleave",(e)=>{
    if(!card.classList.contains("card-movable")){
        card.style.background = "white"
    }
}),false)

cardLists.forEach(list=>list.addEventListener("dragenter",(e)=>{
    e.preventDefault()
    list.style.background = "blue"
}),false)

cardLists.forEach(list=>list.addEventListener("drop",(e)=>{
    e.preventDefault()
    list.style.background = "red"
    draggedItem.parentNode.removeChild(draggedItem)
    list.appendChild(draggedItem)
}),false)