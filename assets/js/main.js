const listContainerWrapper = document.querySelector(".list-container-wrapper")
const cards = document.querySelectorAll(".card")
let x = 0
let y = 0
let draggedItem

window.addEventListener("load",(e)=>{
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    cards.forEach(card => card.setAttribute('draggable',true))
})

cards.forEach(card=>card.addEventListener("dragstart",(e)=>{
    draggedItem = e.target
    let img = new Image()
    img.url = "../pixel.png"
    e.dataTransfer.setDragImage(img, 0, 0);
}),false)

window.addEventListener("mousemove",(e)=>{
})

cards.forEach(card=>card.addEventListener("drag",(e)=>{
    console.log(e)
    e.preventDefault()
    card.style.top = e.y + "px"
    card.style.left = e.x  + "px"
    console.log(card.style.top)
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

cards.forEach(card=>card.addEventListener("drop",(e)=>{
    e.preventDefault()
    card.style.background = "white"
    draggedItem.parentNode.removeChild(draggedItem)
    card.parentNode.appendChild(draggedItem)
}),false)