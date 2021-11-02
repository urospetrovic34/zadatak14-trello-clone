const body = document.querySelector("body")
const listContainerWrapper = document.querySelector(".list-container-wrapper")
const cards = document.querySelectorAll(".card")
const cardLists = document.querySelectorAll(".list-cards")
const mainMover = document.querySelector(".main-mover")
const mainContainer = document.querySelector(".main-container")
const lists = document.querySelectorAll(".list")
const addListButton = document.querySelector(".add-list-button")
let x = 0
let y = 0
let scrollLeft
let startX
let draggedItem
let isActive = false
let onMove = false
let cloneCard

console.log(cardLists)

window.addEventListener("load",(e)=>{
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    cards.forEach(card => card.setAttribute('draggable',true))
    mainMover.style.width = mainContainer.scrollWidth + "px"
})

cards.forEach(card => card.addEventListener('drag',(e)=>{
    card.classList.add("card-movable")
    /*cloneCard.style.top = e.pageY - y + "px"
    cloneCard.style.left = e.pageX - x + "px"*/
}))

cards.forEach(card => card.addEventListener('dragstart',(e)=>{
    draggedItem = card
   /* cloneCard = card.cloneNode(true)
    cloneCard.className = "cloned-card-image"
    cloneCard.style.position = "absolute"
    cloneCard.style.opacity = 1
    y = e.clientY - cloneCard.getBoundingClientRect().top + "px"
    x = e.clientX - cloneCard.getBoundingClientRect().left + "px"
    body.appendChild(cloneCard)*/
    /*let img = new Image()
    e.dataTransfer.setDragImage(img,5550,5550)*/
    e.dataTransfer.effectAllowed = "copyMove"
},false))

cards.forEach(card => card.addEventListener('dragend',(e)=>{
    /*body.removeChild(cloneCard)*/
    card.classList.remove("card-movable")
}))

cards.forEach(card => card.addEventListener('dragover',(e)=>{
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    if(!card.nextElementSibling){
        card.parentNode.appendChild(draggedItem)
    }
    else{
        card.parentNode.insertBefore(draggedItem,card)
    }
}))

cardLists.forEach(list => list.addEventListener('dragover',(e)=>{
    e.preventDefault()
    e.dataTransfer.dropEffect = "copy"
    if(list.textContent.trim() === ""){
        list.appendChild(draggedItem)
    }
}))

mainMover.addEventListener("mousedown",(e)=>{
    onMove = true
    startX = e.pageX - mainContainer.offsetLeft
    scrollLeft = mainContainer.scrollLeft
})

mainMover.addEventListener("mouseleave",(e)=>{
    onMove = false
})

mainMover.addEventListener("mouseup",(e)=>{
    onMove = false
})

mainMover.addEventListener("mousemove",(e)=>{
    e.preventDefault()
    if(onMove){
        const x = e.pageX - mainContainer.offsetLeft
        const move = x - startX
        mainContainer.scrollLeft = scrollLeft - move
    }
})

addListButton.addEventListener("click",(e)=>{
    console.log("asd")
})