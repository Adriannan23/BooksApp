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

    const favouriteBooks = [];

    function initActions() {


        const booksImageContainer = document.querySelectorAll(select.containerOf.bookImage);


        for (const bookImage of booksImageContainer) {

            bookImage.addEventListener('dblclick', function (event) {
                event.preventDefault();

                bookImage.classList.add('favorite');

                let bookImageDataId = bookImage.getAttribute('data-id');
                favouriteBooks.push(bookImageDataId);
            })
        }
    }
    render();
    initActions();
}