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

const headerColor = localStorage.getItem("headerColor");
const description = localStorage.getItem("description");

let cardModalWrapper = document.querySelector(".card-modal-wrapper");

let modalHeader = document.querySelector("#modal-header");
let btnClose = document.querySelector("#btn-close"); // Close modal
modalHeader.classList.add(headerColor);

let modalMenu = document.querySelector("#modal-menu");
let modalCards = document.querySelectorAll(".modal-card");
let modalLeft = document.querySelector(".modal-left");
let colorChoices = document.querySelectorAll(".color-choice");
let saveBgColor = null;

let textarea = document.querySelector("#description"); // textareas attr
let textareaWrap = document.querySelector("#textarea-wrap"); // It's container which include textarea tag and button save/close
let textDescription = document.querySelector("#description-text"); // Container for p tag and button edit
let descriptionWrapper = document.querySelector("#description-wrapper");
let save = document.querySelector("#save");
let edit = document.querySelector("#edit");
let desc = document.querySelector("#desc");

if (description) {
	textareaWrap.classList.add("d-none");
	textDescription.classList.remove("d-none");
	desc.textContent = description;
}

let attachPicture = document.querySelector("#attachPicture");
let isExistAttachment = false;

let titleChecklist = document.querySelector("#title-checklist");
let checklistItmes = document.querySelectorAll(".checklist-item");

modalCards.forEach((modalCard) => modalCard.addEventListener("click", openCardMenu));
colorChoices.forEach((colorChoice) => colorChoice.addEventListener("click", changeHeaderStyle));
btnClose.addEventListener("click", toggleModal);

textarea.addEventListener("click", showButtons);
textarea.addEventListener("keypress", addDescription);

save.addEventListener("click", addDescription);
edit.addEventListener("click", editDescription);

attachPicture.addEventListener("change", addAtachment);

titleChecklist.addEventListener("keypress", addChecklistTitle);

function openCardMenu() {
	return this.firstElementChild.classList.toggle("d-none"); //.remove()
}
function changeHeaderStyle(e) {
	if (this === colorChoices[3]) {
		modalHeader.classList.remove(headerColor);
		modalHeader.classList.remove(saveBgColor);
		localStorage.removeItem("headerColor");
	} else if (e.target.classList[2] !== saveBgColor) {
		modalHeader.classList.remove(headerColor);
		modalHeader.classList.remove(saveBgColor);
		saveBgColor = e.target.classList[2];
		localStorage.setItem("headerColor", e.target.classList[2]);
		modalHeader.classList.add(e.target.classList[2]); //Background color class
	}
}
function showButtons() {
	let modalDescriptionBtn = document.querySelector(".modal-description-btns");
	modalDescriptionBtn.classList.toggle("d-none");
	textarea.classList.toggle("textarea1");
}
function addDescription(e) {
	if (e.type === "click") {
		if (textarea.value !== "") {
			textareaWrap.classList.toggle("d-none");

			textDescription.classList.toggle("d-none");
			desc.textContent = textarea.value;
			return localStorage.setItem("description", textarea.value);
		} else {
			showButtons();
			return localStorage.removeItem("description");
		}
	} else if (e.key === "Enter") {
		textareaWrap.classList.toggle("d-none");

		textDescription.classList.toggle("d-none");
		desc.textContent = textarea.value;
		return localStorage.setItem("description", textarea.value);
	}
}
function editDescription() {
	textareaWrap.classList.toggle("d-none");
	textDescription.classList.toggle("d-none");
	textarea.value = description;
}
function addAtachment() {
	console.log(this.files[0].type);
	if (this.files[0].type !== "image/png" && this.files[0].type !== "image/jpg" && this.files[0].type !== "image/gif" && this.files[0].type !== "image/jpeg") {
		alert("This format is not valid!");
		return;
	}
	const reader = new FileReader();

	let uploaded_image = "";

	reader.addEventListener("load", () => {
		uploaded_image = reader.result;
		let img = document.createElement("img");
		img.src = uploaded_image;
		img.width = "150";
		if (!isExistAttachment) {
			let modalAttachment = document.createElement("div");
			modalAttachment.id = "modal-attachment";
			modalAttachment.classList.add("d-flex", "flex-column");

			let h1 = document.createElement("h1");
			let h1Content = document.createTextNode("Attachment");
			h1.appendChild(h1Content);
			modalAttachment.appendChild(h1);

			modalAttachment.appendChild(img);
			modalLeft.appendChild(modalAttachment);
			isExistAttachment = true;
		} else {
			let attach = document.querySelector("#modal-attachment");
			attach.appendChild(img);
		}
	});
	reader.readAsDataURL(this.files[0]);
}
function addChecklistTitle(e) {
	let val = this.value;
	if (e.key === "Enter") {
		let checkListDiv = document.createElement("div");
		checkListDiv.classList.add("checklist");

		let h1 = document.createElement("h1");
		let h1Content = document.createTextNode(val);
		h1.appendChild(h1Content);

		let input = document.createElement("input");
		input.type = "text";
		input.placeholder = "Add item";
		input.classList.add("checklist-item");

		checkListDiv.appendChild(h1);
		checkListDiv.appendChild(input);
		modalLeft.appendChild(checkListDiv);
	}
}
function toggleModal() {
	return cardModalWrapper.classList.add("d-none");
}