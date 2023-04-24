{
    'use strict';

    const select = {
        templateOf: {
            book: '#template-book',
        },
        containerOf: {
            bookList: '.books-list',
            bookImage: '.books-list .book__image',
            // bookImageId: '.books-list '
        }
    }

    const templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    }

    function render() {

        /* find books container */
        const booksContainer = document.querySelector(select.containerOf.bookList);
        // console.log('booksContainer:', booksContainer)

        // go through every book in the dataSource.books
        for (let book of dataSource.books) {
            // console.log('book:', book)

            /* generate HTML code based on 'book' template */
            const generatedHTML = templates.book(book);
            // console.log('generatedHTML:', generatedHTML)

            /* create DOM element using utils.createElementFromHTML */
            const domHtmlElement = utils.createDOMFromHTML(generatedHTML)

            // /* add book (DOM element) to book list as a new child */
            booksContainer.appendChild(domHtmlElement);
        }
    }

    const favoriteBooks = [];

    function initActions() {

        // find place where the whole book list is
        const booksListContainer = document.querySelector(select.containerOf.bookList);

        // add dbclick listener to booksListContainer
        booksListContainer.addEventListener('dblclick', function (event) {
            event.preventDefault();
            // use offsetParent property
            const clickedElement = event.target.offsetParent;
            // check if clickedElement is a book
            if (clickedElement.classList.contains('book__image')) {
                // check data-id for book
                const bookId = clickedElement.getAttribute('data-id');
                // add 'favorite' class if there is not 'favorite' class and remove 'favorite' class if there is 'favorite' class
                clickedElement.classList.toggle('favorite');
                if (clickedElement.classList.contains('favorite')) {
                    favoriteBooks.push(bookId);
                }
                else {
                    favoriteBooks.pop(bookId);
                }
            }
        })

    }
    render();
    initActions();
}
