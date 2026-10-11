const bookShelfDiv = document.querySelector('.bookshelf');
const addBookFormDisplayBtn = document.querySelector('.display-add-book');
const addBookForm = document.querySelector('.add-book-hidden')
const addBookBtn = document.querySelector('.add-book-btn');
const formName = document.querySelector("[name='bookName']");
const formAuth = document.querySelector("[name='bookAuthor']");
const formPages = document.querySelector("[name='bookPages']");
const formDesc = document.querySelector("[name='bookDesc']");
const formRate = document.querySelector("[name='bookRate']");
const formRead = document.querySelector("[name='bookRead']");
const allInputs = document.querySelectorAll('input');
const myLibrary = [];

function Book(name, author, pages, desc, rate, selector, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.desc = desc;
    this.rate = rate;
    this.selector = selector;
    this.read = read;
}

Book.prototype.remove = function() {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].selector === this.selector) {
            myLibrary.splice(i, 1);
            break;
        }
    }
    addLibraryToPage();
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

addBookFormDisplayBtn.addEventListener('click', () => {
    addBookForm.classList.remove('add-book-hidden');
    addBookForm.classList.add('add-book');
})

addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addBookToLibrary(formName.value, formAuth.value, formPages.value, formDesc.value, formRate.value, formRead.checked);
    addLibraryToPage();
    clearForm();
    addBookForm.classList.remove('add-book');
    addBookForm.classList.add('add-book-hidden');
})


function addBookToLibrary(name, author, pages, desc, rate, read) {
    let newID = crypto.randomUUID();
    let newBook = new Book(name, author, pages, desc, rate, newID, read);
    myLibrary.push(newBook);
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
            book.remove();
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

        let readLabel = document.createElement('div');
        readLabel.textContent = 'Read?'
        card.append(readLabel);
        
        let readDiv = document.createElement('input');
        readDiv.type = 'checkbox';
        readDiv.checked = book.read;
        readDiv.addEventListener('change', () => {
            book.toggleRead();
            if (book.read) {
                card.classList.add('card-div-read');
            } else {
                card.classList.remove('card-div-read');
            }
        });
        
        card.append(readDiv);
        
        card.classList.add(countPages(book.pages));
        if (book.read) {
            card.classList.add('card-div-read');
        }
    })
}

// ABSTRACTION

function clearForm(){
    allInputs.forEach(input => {
        if (input.type === 'checkbox') {
            input.checked = false;
        } else {
            input.value = '';
        }
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