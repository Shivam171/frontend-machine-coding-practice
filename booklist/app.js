// Class Book
class Book {
    constructor(title, author, bid) {
        this.title = title,
            this.author = author,
            this.bid = bid
    }
}

// Class UI
class UI {
    static displayBooks() {
        // const StaticData = [
        //     {
        //         bid: 1,
        //         title: "The man who sold his ferrari",
        //         author: "John Wick"
        //     },
        //     {
        //         bid: 2,
        //         title: "Solar Eclipse",
        //         author: "Einstein"
        //     }
        // ]

        // const books = StaticData
        const books = Store.getStoreBooks();
        books.forEach((book) => {
            UI.addBooksToList(book);
        })
    }
    static addBooksToList(book) {
        const bookList = document.querySelector("#book-list")
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${book.bid}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><a href="#" class="delete bg-red-400 rounded-lg px-4 py-2 text-white">X</a></td>
        `
        bookList.appendChild(row)
    }
    static showAlert(message, type) {
        const div = document.createElement('div');
        if (type === "warning") {
            div.className = `text-yellow-400 mt-6 alert`
        } else if (type === "success") {
            div.className = `text-green-400 mt-6 alert`
        } else if (type === "danger") {
            div.className = `text-red-400 mt-6 alert`
        }
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector(".container")
        const form = document.querySelector("#form")
        container.insertBefore(div, form)
        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 1000)
    }
    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }
    static clearFields() {
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
        document.getElementById("bid").value = "";
    }
}

class Store {
    static getStoreBooks() {
        let books = [];
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books;
    }
    static addStoreBook(book) {
        const books = Store.getStoreBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books))
    }
    static removeStoreBook(bid) {
        const books = Store.getStoreBooks();
        books.forEach((book, index) => {
            if (book.bid === bid) {
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Events: Add book
document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form field values
    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const bid = document.getElementById("bid").value
    // Validate the form
    if (title === "" || author === "" | bid === "") {
        UI.showAlert("⚠️ Please fill in all the fields", "warning")
        return;
    }
    // Instantiate the Book
    const book = new Book(title, author, bid)
    // Adding book to list
    UI.addBooksToList(book);
    // Add book to store
    Store.addStoreBook(book);
    // Success alert
    UI.showAlert("✅ Book Added", "success");
    // Clear form
    UI.clearFields()
})

// Events: Display books
document.addEventListener("DOMContentLoaded", UI.displayBooks)

// Events: Remove book btn
document.querySelector("#book-list").addEventListener("click", (e) => {
    e.preventDefault();
    UI.deleteBook(e.target);
    Store.removeStoreBook(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent);
    UI.showAlert("🗑️ Book Removed", "danger")
})


