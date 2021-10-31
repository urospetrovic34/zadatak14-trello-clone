const listContainerWrapper = document.querySelector(".list-container-wrapper")
const cards = document.querySelectorAll(".card")

window.addEventListener("load",(e)=>{
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
})

cards.forEach(card=>card.addEventListener("drag",(e)=>{
    card.classList.add("card-movable")
    card.style.top = e.clientY
    card.style.right = e.clientX
}))

cards.forEach(card=>card.addEventListener("dragend",(e)=>{
    e.preventDefault()
    card.classList.remove("card-movable")
}))
