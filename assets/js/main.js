const body = document.querySelector("body")
const listContainerWrapper = document.querySelector(".list-container-wrapper")
const cards = document.getElementsByClassName("card")
const cardLists = document.querySelectorAll(".list-cards")
const mainMover = document.querySelector(".main-mover")
const mainContainer = document.querySelector(".main-container")
const lists = document.querySelectorAll(".list")
const addListButton = document.querySelector(".add-list-button")
const addCardButton = document.querySelectorAll(".list-add-card-button")
const addCardFinalButton = document.querySelectorAll(".add-card-final-button")
let x = 0
let y = 0
let scrollLeft
let startX
let draggedItem
let isActive = false
let onMove = false
let cloneCard
let cloneCardContainer

console.log(cardLists)

window.addEventListener("load",(e)=>{
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    Array.from(cards).forEach(card => card.setAttribute('draggable',true))
    mainMover.style.width = mainContainer.scrollWidth + "px"
})

Array.from(cards).forEach(card => card.addEventListener('drag',(e)=>{
    card.classList.add("card-movable")
    cloneCardContainer.style.top = 57 + "px"
    cloneCardContainer.style.left = 57 + "px"
}))

Array.from(cards).forEach(card => card.addEventListener('dragstart',(e)=>{
    draggedItem = card
    cloneCard = card.cloneNode(true)
    cloneCard.className = "cloned-card-image"
    cloneCard.style.position = "absolute"
    cloneCard.style.opacity = 1
    y = e.clientY - cloneCard.getBoundingClientRect().top + "px"
    x = e.clientX - cloneCard.getBoundingClientRect().left + "px"
    cloneCard.style.width = "180px"
    cloneCardContainer = document.createElement("div")
    cloneCardContainer.className = "clone-card-container"
    cloneCardContainer.appendChild(cloneCard)
    body.appendChild(cloneCardContainer)
    let img = new Image()
    e.dataTransfer.setDragImage(img,5550,5550)
    e.dataTransfer.effectAllowed = "copyMove"
},false))

Array.from(cards).forEach(card => card.addEventListener('dragend',(e)=>{
    body.removeChild(cloneCardContainer)
    card.classList.remove("card-movable")
}))

Array.from(cards).forEach(card => card.addEventListener('dragover',(e)=>{
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

addCardButton.forEach(addButton => addButton.addEventListener("click",(e)=>{
    addButton.closest(".list-footer").classList.add("hidden")
    addButton.closest(".list").querySelector(".add-card-textarea-container").classList.add("visible")
}))

addCardFinalButton.forEach(addFinalButton => addFinalButton.addEventListener("click",(e)=>{
    if(addFinalButton.closest(".add-card-textarea-container").querySelector(".add-card-textarea").value.length!==0){
    const newCard = document.createElement('div')
    newCard.innerHTML = `
    <div class="card">
      <p class="card-name">${addFinalButton.closest(".add-card-textarea-container").querySelector(".add-card-textarea").value}</p>
      <div class="card-more-info">
        <button>
          <i class="fas fa-align-justify"></i>
        </button>
        <button>
          <i class="fas fa-check"></i>
        </button>
        <button>
          <i class="fas fa-paperclip"></i>
        </button>
      </div>
    </div>`
    addFinalButton.closest(".list").querySelector(".list-cards").appendChild(newCard)
    addFinalButton.closest(".list").querySelector(".list-footer").classList.remove("hidden")
    addFinalButton.closest(".list").querySelector(".add-card-textarea-container").classList.remove("visible")
    }

    console.log(cards)
}))