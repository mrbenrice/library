// DOM

let librarySizeHeader = document.querySelector('.librarysize');
let addBookButton = document.querySelector('#addBookButton');
let flexContainer = document.querySelector('.flexcontainer');
let inputContainer = document.querySelector('.inputcontainer');
let submitBook = document.querySelector('.submitbook')
let titleText = document.querySelector('#titletext')
let authorText = document.querySelector('#authortext')
let pagesText = document.querySelector('#pagestext')
let readOrNot = document.querySelector('#readornot')
let reviewText = document.querySelector('#reviewtext')
let cardContainer = document.querySelector('.carousel')
let colors = ['lightcoral', 'lightpink', 'cornflowerblue', 'darksalmon', 'darkseagreen', 'indianred', 'khaki', 'lightgreen', 'lightskyblue']
let librarySize = 0

addBookButton.addEventListener('click', () => {
    addBookButton.style.display = 'none';
    inputContainer.style.display = 'flex'
    inputContainer.style.flexDirection = 'column';
})

// Book constructor

function Book (title, author, pages, read, review) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.review = review
}

// Add book to array on submit

let bookList = [];
submitBook.addEventListener('click', () => {

// Add counter to submit button, to keep track of number of books
    librarySize++;
    console.log(librarySize);
    librarySizeHeader.innerHTML = `Library size: ${librarySize}`;


// Assign parameters to input
    title = titleText.value 
    author = authorText.value 
    pages = pagesText.value 
    if (readOrNot.checked != true) {
        read = 'not read'
    } else if (readOrNot.checked = true) {
        read = 'read'
    }
    review = reviewText.value
    

//  Add user-submitted book to object

    newBook = new Book(title, author, pages, read, review);
    bookList.push(newBook);
    console.log(bookList)
    inputContainer.style.display = 'none'
    addBookButton.style.display = 'block'

    const bookCard = document.createElement('div');
    cardContainer.classList.add('bookcard');
    bookCard.setAttribute("data", `${librarySize - 1}`)
    bookCard.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    bookCard.textContent = `${this.title}`
    cardContainer.appendChild(bookCard);


// Push book created onto a stylised card
let latestAddition = bookList.slice(-1);

const bookCardAuthor = document.createElement('div')
bookCard.classList.add('bookcardauthor')
bookCardAuthor.textContent = `Author: ${latestAddition.author}`
bookCard.appendChild(bookCardAuthor);

const bookCardPages = document.createElement('div')
bookCard.classList.add('bookcardpages')
bookCardPages.textContent = `Number of pages: ${latestAddition.pages}`
bookCard.appendChild(bookCardPages)

const bookCardRead = document.createElement('div')
bookCard.classList.add('bookcardread')
bookCardRead.textContent = `${latestAddition.read}`
bookCard.appendChild(bookCardRead)

const bookCardReview = document.createElement('div')
bookCard.classList.add('bookcardreview')
bookCardReview.textContent = `Review: ${latestAddition.review}`
bookCard.appendChild(bookCardReview)

const removeBookButton = document.createElement('button')
bookCard.classList.add('removebookbutton')
removeBookButton.innerHTML = 'Remove book?'
bookCard.appendChild(removeBookButton)

removeBookButton.addEventListener('click', () => {
    bookPositionInArray = bookCard.getAttribute('data')
    bookList.splice(bookPositionInArray, 1);
    console.log(bookList)
    librarySize--
    librarySizeHeader.innerHTML = `Library size: ${librarySize}`;
    bookCard.style.display = 'none'
})
})









