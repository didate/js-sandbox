// Book Class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


class UI {
    // Fonctions
    submit = (e) => {
        // Get form values
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const isbn = document.getElementById('isbn').value;

        if (title === '' || author === '' || isbn === '') {
            this.showAlert('Please fill all fields', 'alert-error');
        } else {
            // Create book object
            const book = new Book(title, author, isbn);
            // Add book to List of Book
            this.addRow(book);
            this.showAlert('Book added', 'alert-success');

        }

        e.preventDefault();
    }

    addRow = (book) => {
        const list = document.getElementById('book-list');
        // Create tr element
        const row = document.createElement('tr');
        // Insert cols
        row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><a href="#" class="delete">X</a></td>`;
        list.appendChild(row);
        this.clearForm();
    }

    showAlert = (message, className) => {
        // create div alert
        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));

        // Get Parent
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        // insert div before the form
        container.insertBefore(div, form);

        // Timeout after 3 secs
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    clearForm = () => {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }


    deleteItem = (e) => {
        const target = e.target;
        if (target.className === 'delete') {
            // 1 ist parent is td the 2nd one is tr
            target.parentElement.parentElement.remove();
            this.showAlert('Book removed', 'alert-success');
        }
        e.preventDefault();
    }
}

const ui = new UI();

// Event Listener add book
document.getElementById('book-form').addEventListener('submit', ui.submit);

// Event Listener delete book
document.getElementById('book-list').addEventListener('click', ui.deleteItem);