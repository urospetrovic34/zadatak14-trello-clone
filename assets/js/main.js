const body = document.querySelector("body")
const listContainerWrapper = document.querySelector(".list-container-wrapper")
const cards = document.querySelectorAll(".card")
const cardLists = document.querySelectorAll(".list-cards")
const listContainers = document.querySelectorAll(".list-container")
const listHeaders = document.querySelectorAll(".list-header")
const mainMover = document.querySelector(".main-mover")
const mainContainer = document.querySelector(".main-container")
const lists = document.querySelectorAll(".list")
const addListButton = document.querySelector(".add-list-button")
const addCardButton = document.querySelectorAll(".list-add-card-button")
const addCardFinalButton = document.querySelectorAll(".add-card-final-button")
const cancelCardButton = document.querySelectorAll(".cancel-add-button")
const cancelListButton = document.querySelector(".cancel-add-list-button")
const addListFinalButton = document.querySelector(".add-list-final-button")
const addListContainer = document.querySelector(".add-list-container")
let x = 0
let y = 0
let x1 = 0
let y1 = 0
let scrollLeft
let startX
let draggedItem
let draggedList
let isActive = false
let onMove = false
let clonedItem
let clonedItemContainer

console.log(cardLists)

window.addEventListener("load",(e)=>{
    listContainerWrapper.innerHTML = localStorage.getItem("cardLists")
    cards.forEach(card => card.setAttribute('draggable',true))
    listHeaders.forEach(header => header.setAttribute('draggable',true))
    mainMover.style.width = mainContainer.scrollWidth + "px"




    listContainerWrapper.querySelectorAll(".card").forEach(card => card.addEventListener("drag",(e)=>{
        dragItem(card,e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    
    listContainerWrapper.querySelectorAll(".list-header").forEach(header => header.addEventListener("drag",(e)=>{
        dragListContainer(header.closest(".list-container"),e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    
    listContainerWrapper.querySelectorAll(".card").forEach(card => card.addEventListener("mousedown",(e)=>{
        dragMouseDownItem(card,e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    
    listContainerWrapper.querySelectorAll(".list-header").forEach(header => header.addEventListener("mousedown",(e)=>{
        dragMouseDownListContainer(header.closest(".list-container"),e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    
    listContainerWrapper.querySelectorAll(".card").forEach(card => card.addEventListener("dragstart",(e)=>{
        dragStartItem(card,e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    
    listContainerWrapper.querySelectorAll(".list-header").forEach(header => header.addEventListener("dragstart",(e)=>{
        dragStartListContainer(header.closest(".list-container"),e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    
    listContainerWrapper.querySelectorAll(".card").forEach(card => card.addEventListener("dragend",(e)=>{
        dragEndItem(card,e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    
    listContainerWrapper.querySelectorAll(".list-header").forEach(header => header.addEventListener("dragend",(e)=>{
        dragEndListContainer(header.closest(".list-container"),e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    
    listContainerWrapper.querySelectorAll(".card").forEach(card => card.addEventListener("dragover",(e)=>{
        dragOverItem(card,e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    
    listContainerWrapper.querySelectorAll(".list-cards").forEach(list => list.addEventListener("dragover",(e)=>{
        dragOverList(list,e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    
    listContainerWrapper.querySelectorAll(".list-container").forEach(container => container.addEventListener("dragover",(e)=>{
        dragOverListContainer(container,e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))







    listContainerWrapper.querySelectorAll(".list-add-card-button").forEach(button => button.addEventListener("click",(e)=>{
        openAddButton(button,e)
    }))
    listContainerWrapper.querySelectorAll(".cancel-add-button").forEach(button => button.addEventListener("click",(e)=>{
        cancelAddButton(button,e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    listContainerWrapper.querySelectorAll(".add-card-final-button").forEach(button => button.addEventListener("click",(e)=>{
        successAddButton(button,e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }))
    listContainerWrapper.querySelector(".add-list-button").addEventListener("click",(e)=>{
        openAddListButton(listContainerWrapper.querySelector(".add-list-button"),e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    })
    listContainerWrapper.querySelector(".cancel-add-list-button").addEventListener("click",(e)=>{
        cancelAddListButton(listContainerWrapper.querySelector(".cancel-add-list-button"),e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    })
    listContainerWrapper.querySelector(".add-list-final-button").addEventListener("click",(e)=>{
        successAddListButton(listContainerWrapper.querySelector(".add-list-final-button"),e)
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    })
})



mainMover.addEventListener("mousedown",(e)=>{
    moveScreenDown(e)
})

mainMover.addEventListener("mouseleave",(e)=>{
    moveScreenLeave(e)
})

mainMover.addEventListener("mouseup",(e)=>{
    moveScreenUp(e)
})

mainMover.addEventListener("mousemove",(e)=>{
    moveScreenMove(e)
})

const dragItem = (item,e) => {
    e.stopPropagation()
	item.classList.add("card-movable")
    clonedItem.style.top = e.pageY - y + 'px'
    clonedItem.style.left = e.pageX - x + 'px'
}

const dragListContainer = (item,e) => {
    e.stopPropagation()
	item.classList.add("list-movable")
    clonedItem.style.top = e.pageY - y + 'px'
    clonedItem.style.left = e.pageX - x + 'px'
}

const dragMouseDownItem = (item,e) => {
    e.stopPropagation()
    y = e.clientY - item.getBoundingClientRect().top
    x = e.clientX - item.getBoundingClientRect().left
}

const dragMouseDownListContainer = (item,e) => {
    e.stopPropagation()
    y = e.clientY - item.getBoundingClientRect().top
    x = e.clientX - item.getBoundingClientRect().left
}

const dragStartItem = (item,e) => {
    e.stopPropagation()
	draggedItem = item
    clonedItem = item.cloneNode(true)
    clonedItem.className = "cloned-card"
    clonedItem.style.width = item.clientWidth + "px"
    clonedItem.style.height = item.clientHeight + "px"
    body.appendChild(clonedItem)
    const img = new Image()
    e.dataTransfer.setDragImage(img,10000,10000)
	e.dataTransfer.effectAllowed = "copyMove"
}

const dragStartListContainer = (item,e) => {
    e.stopPropagation()
	draggedList = item
    clonedItem = item.cloneNode(true)
    clonedItem.className = "cloned-list"
    clonedItem.style.width = item.clientWidth + "px"
    clonedItem.style.height = item.clientHeight + "px"
    body.appendChild(clonedItem)
    const img = new Image()
    e.dataTransfer.setDragImage(img,10000,10000)
	e.dataTransfer.effectAllowed = "copyMove"
}

const dragEndItem = (item,e) => {
    e.stopPropagation()
    body.removeChild(clonedItem)
	item.classList.remove("card-movable")
}

const dragEndListContainer = (item,e) => {
    e.stopPropagation()
    body.removeChild(clonedItem)
	item.classList.remove("list-movable")
}

const dragOverItem = (item,e) => {
	e.preventDefault()
    e.stopPropagation()
	e.dataTransfer.dropEffect = "copy"
    if(item.parentNode.textContent.trim()===""){
		item.parentNode.appendChild(draggedItem)
    }
	if(!item.nextElementSibling){
		item.parentNode.appendChild(draggedItem)
	}
	else{
		item.parentNode.insertBefore(draggedItem,item)
	}
}

const dragOverList = (item,e) => {
	e.preventDefault()
    e.stopPropagation()
	e.dataTransfer.dropEffect = "copy"
	if(item.textContent.trim() === ""){
		item.appendChild(draggedItem)
	}
}

const dragOverListContainer = (item,e) => {
	e.preventDefault()
    e.stopPropagation()
	e.dataTransfer.dropEffect = "copy"
	if(!item.nextElementSibling){
		item.parentNode.appendChild(draggedList)
	}
	else{
		item.parentNode.insertBefore(draggedList,item)
	}
}

const moveScreenDown = (e) => {
	onMove = true
    startX = e.pageX - mainContainer.offsetLeft
    scrollLeft = mainContainer.scrollLeft
    document.body.style.cursor = "grabbing"
}

const moveScreenLeave = (e) => {
	onMove = false
    document.body.style.cursor = "auto"
}

const moveScreenUp = (e) => {
	onMove = false
    document.body.style.cursor = "auto"
}

const moveScreenMove = (e) => {
	e.preventDefault()
	if(onMove){
        document.body.style.cursor = "grabbing"
		const x = e.pageX - mainContainer.offsetLeft
        const move = x - startX
        mainContainer.scrollLeft = scrollLeft - move
	}
}

const openAddButton = (item,e) => {
    item.closest(".list").querySelector(".list-footer").classList.add("hidden")
    item.closest(".list").querySelector(".add-card-textarea-container").classList.add("visible")
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
}

const cancelAddButton = (item,e) => {
    item.closest(".list").querySelector(".list-footer").classList.remove("hidden")
    item.closest(".list").querySelector(".add-card-textarea-container").classList.remove("visible")
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
}

const openAddListButton = (item,e) => {
    item.closest(".add-list-container").querySelector(".add-list").classList.add("hidden")
    item.closest(".add-list-container").querySelector(".add-list-input-container").classList.add("visible-flex")
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
}

const cancelAddListButton = (item,e) => {
    item.closest(".add-list-container").querySelector(".add-list").classList.remove("hidden")
    item.closest(".add-list-container").querySelector(".add-list-input-container").classList.remove("visible-flex")
    localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
}

const successAddButton = (item,e) => {
    if(item.closest(".add-card-textarea-container").querySelector(".add-card-textarea").value.length!==0){
        const newCard = document.createElement('div')
        newCard.className = "card"
        newCard.setAttribute('draggable',true)
        newCard.innerHTML = 
            `<p class="card-name">${item.closest(".add-card-textarea-container").querySelector(".add-card-textarea").value}</p>
                <div class="card-more-info">
                </div>
            `  
        newCard.addEventListener("drag",(e)=>{
            dragItem(newCard,e)
        })
        newCard.addEventListener("mousedown",(e)=>{
            dragMouseDownItem(newCard,e)
        })
        newCard.addEventListener("dragstart",(e)=>{
            dragStartItem(newCard,e)
        })
        newCard.addEventListener("dragend",(e)=>{
            dragEndItem(newCard,e)
        })
        newCard.addEventListener("dragover",(e)=>{
            dragOverItem(newCard,e)
        })
        item.closest(".list").querySelector(".list-cards").appendChild(newCard)
        item.closest(".list").querySelector(".list-footer").classList.remove("hidden")
        item.closest(".list").querySelector(".add-card-textarea-container").classList.remove("visible")
        item.closest(".add-card-textarea-container").querySelector(".add-card-textarea").value = ""
        localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }
}

const successAddListButton = (item,e) => {
    if(item.closest(".add-list-container").querySelector(".add-list-input").value.length!==0){
        const newList = document.createElement('div')
        newList.className = "list-container"
        newList.innerHTML = 
            `
            <div class="list-container-mover"></div>
            <div class="list">
              <div class="list-header">
                <div>
                  <input
                    type="text"
                    class="list-title"
                    value=${item.closest(".add-list-container").querySelector(".add-list-input").value}
                  />
                </div>
                <div>
                  <button class="list-menu-button">
                    <i class="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
              <div class="list-cards"></div>
              <div class="list-footer">
                <div>
                  <button class="list-add-card-button">+ Add a card</button>
                </div>
                <div>
                  <button class="list-add-card-template-button">
                    <i class="fas fa-file"></i>
                  </button>
                </div>
              </div>
              <div class="add-card-textarea-container">
                <div>
                  <textarea class="add-card-textarea"></textarea>
                </div>
                <div class="add-card-textarea-second-row">
                  <button class="add-card-final-button">Add card</button>
                  <button class="cancel-add-button">
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            `
            newList.querySelector(".list-header").setAttribute('draggable',true)
            newList.querySelector(".list-header").addEventListener("drag",(e)=>{
                dragListContainer(newList,e)
            })
            newList.querySelector(".list-header").addEventListener("mousedown",(e)=>{
                dragMouseDownListContainer(newList,e)
            })
            newList.querySelector(".list-header").addEventListener("dragstart",(e)=>{
                dragStartListContainer(newList,e)
            })
            newList.querySelector(".list-header").addEventListener("dragend",(e)=>{
                dragEndListContainer(newList,e)
            })
            newList.addEventListener("dragover",(e)=>{
                dragOverListContainer(newList,e)
            })
            newList.querySelector(".list-cards").addEventListener("dragover",(e)=>{
                dragOverList(e.target,e)
            })
            newList.querySelector(".list-add-card-button").addEventListener("click",(e)=>{
                openAddButton(e.target,e)
            })
            newList.querySelector(".cancel-add-button").addEventListener("click",(e)=>{
                cancelAddButton(e.target,e)
            })
            newList.querySelector(".add-card-final-button").addEventListener("click",(e)=>{
                successAddButton(e.target,e)
            })

            listContainerWrapper.insertBefore(newList,item.closest(".add-list-container"))
            item.closest(".add-list-container").querySelector(".add-list").classList.remove("hidden")
            item.closest(".add-list-container").querySelector(".add-list-input-container").classList.remove("visible-flex")
            item.closest(".add-list-container").querySelector(".add-list-input").value = ""
            mainMover.style.width = mainContainer.scrollWidth + "px"
            localStorage.setItem("cardLists",listContainerWrapper.innerHTML)
    }
}












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