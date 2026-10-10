const bookShelfDiv = document.querySelector('.bookshelf');
const addBookBtn = document.querySelector('.add-book-btn');
const formName = document.querySelector("[name='bookName']");
const formAuth = document.querySelector("[name='bookAuthor']");
const formPages = document.querySelector("[name='bookPages']");
const formDesc = document.querySelector("[name='bookDesc']");
const formRate = document.querySelector("[name='bookRate']");
const allInputs = document.querySelectorAll('input');
const myLibrary = [];

function Book(name, author, pages, desc, rate, selector) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.desc = desc;
    this.rate = rate;
    this.selector = selector;
}

addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(formName.value, formAuth.value, formPages.value, formDesc.value, formRate.value);
    addLibraryToPage();
    clearForm();
})


function addBookToLibrary(name, author, pages, desc, rate) {
    let newID = crypto.randomUUID();
    let newBook = new Book(name, author, pages, desc, rate, newID);
    myLibrary.push(newBook);
    console.log(newBook);
}

function removeBookFromLib(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].selector === id) {
            myLibrary.splice(i, 1);
            console.log(myLibrary);
        }
    }
    addLibraryToPage()
}

function addLibraryToPage() {
    bookShelfDiv.textContent = '';
    myLibrary.forEach(book => {
        let card = document.createElement('div');
        bookShelfDiv.append(card);
        let rmvBtn = document.createElement('button');
        rmvBtn.textContent = 'X';
        rmvBtn.addEventListener('click', (e) => {
            e.preventDefault();
            removeBookFromLib(book.selector);
        })
        card.append(rmvBtn);
        let nameDiv = document.createElement('div');
        nameDiv.textContent = book.name;
        card.append(nameDiv);
        let authDiv = document.createElement('div');
        authDiv.textContent = book.author;
        card.append(authDiv);
        let pagesDiv = document.createElement('div');
        pagesDiv.textContent = book.pages;
        card.append(pagesDiv);
        let descDiv = document.createElement('div');
        descDiv.textContent = book.desc;
        card.append(descDiv);
        let rateDiv = document.createElement('div');
        rateDiv.textContent = book.rate;
        card.append(rateDiv);
        card.classList.add(countPages(book.pages));
    })
}



// ABSTRACTION

function clearForm(){
    allInputs.forEach(input => {
        input.value = '';
    })
}

function countPages(pages) {
    if (pages < 100) {
        return 'card-div-short';
    } else if (pages < 700 && pages > 99) {
        return 'card-div-mid';
    } else if (pages > 700) {
        return 'card-div-long';
    }
}
