class Book {
    constructor(bid, author, title) {
        this.bid = bid,
            this.author = author,
            this.title = title
    }
}

class UI {
    static displayBook() {
        // const static_data = [
        //     {
        //         "bid": 110,
        //         "author": "Jhonny Cage",
        //         "title": "Ghost Rider"
        //     },
        //     {
        //         "bid": 111,
        //         "author": "Tom Riddle",
        //         "title": "Mad Max"
        //     }
        // ]
        // const books = static_data;
        const books = Store.fetchBooks();
        books.forEach((book) => {
            UI.addBooksToList(book)
        })
    }
    static addBooksToList(book) {
        const bookList = document.getElementById('book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.bid}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <a href="#" class="edit px-4 py-2 text-blue-400">Edit</a>
            </td>
            <td>
                <a href="#" class="delete px-4 py-2 text-red-400">Delete</a>
            </td>
        `
        bookList.appendChild(row);
    }
    static showAlert(message, type) {
        const div = document.createElement('div');
        if (type === "success") {
            div.className = `text-green-400 mt-6 alert`
        } else if (type === "danger") {
            div.className = `text-red-400 mt-6 alert`
        }
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.getElementById('form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 1000)
    }
    static removeBook(el) {
        el.parentElement.parentElement.remove();
        UI.showAlert("Book Removed", "success")
    }
    static updateBook(el) {
        const rowAuthor = el.parentElement.previousElementSibling.textContent;
        const rowTitle = el.parentElement.previousElementSibling.previousElementSibling.textContent;
        const rowBid = el.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;

        const fieldTitle = document.getElementById('title');
        const fieldAuthor = document.getElementById('author');
        const fieldBid = document.getElementById('bid');
        const submitBtn = document.getElementById('submit');

        fieldAuthor.value = rowAuthor;
        fieldTitle.value = rowTitle;
        fieldBid.value = rowBid;

        submitBtn.textContent = 'Update Book'
    }
    static clearFields() {
        const form = document.getElementById('form');
        form.reset();
    }
}

class Store {
    static fetchBooks() {
        let books = [];
        const storedBooks = localStorage.getItem('books');
        if (!storedBooks || storedBooks === "null") {
            books = [];
        } else {
            books = JSON.parse(storedBooks)
        }
        return books;
    }
    static saveBook(book) {
        const books = Store.fetchBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }
    static deleteBook(bid) {
        const books = Store.fetchBooks();
        const updatedBook = books.filter((book) => {
            book.id != bid
        })
        localStorage.setItem('books', JSON.stringify(updatedBook));
    }
    static modifyBook(book) {
        try {
            const storeBooks = Store.fetchBooks();
            const updateBooks = storeBooks.map((sb) => sb.bid == book.bid ? book : sb);
            localStorage.setItem("books", JSON.stringify(updateBooks));
            // Clear and re-render
            document.getElementById('book-list').innerHTML = '';
            UI.displayBook();
            UI.showAlert("Book Updated", "success")
        } catch (err) {
            UI.showAlert("Error while modifying data", "danger");
            console.log("Error while modifying data", err);
        }
    }
}

document.addEventListener("DOMContentLoaded", UI.displayBook);

document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const bid = document.getElementById('bid').value;
    const submitBtn = document.getElementById('submit');

    if (bid.trim() === "" || author.trim() === "" || title.trim() === "") {
        UI.showAlert("All fields are mandatory", "danger");
        return;
    }
    const book = new Book(bid, author, title);

    if (submitBtn.textContent === "Update Book") {
        Store.modifyBook(book);
        submitBtn.textContent = 'Add Book';
        UI.clearFields();
    } else {
        UI.addBooksToList(book);
        Store.saveBook(book);
        UI.clearFields();
        UI.showAlert("Book Added", "success")
    }
})

document.querySelector('#book-list').addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        UI.removeBook(e.target)
        Store.deleteBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling)
    } else if (e.target.classList.contains('edit')) {
        UI.updateBook(e.target)
    }
})