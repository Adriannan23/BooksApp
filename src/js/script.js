{
    'use strict';

    const select = {
        templateOf: {
            book: '#template-book',
        },
        containerOf: {
            bookList: '.books-list',
        }
    }

    const templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    }

    function render() {

        /* find books container */
        const booksContainer = document.querySelector(select.containerOf.bookList);
        console.log('booksContainer:', booksContainer)


        for (let book of dataSource.books) {
            console.log('book:', book)

            /* generate HTML based on template */
            const generatedHTML = templates.book(book);
            console.log('generatedHTML:', generatedHTML)

            /* create element using utils.createElementFromHTML */
            const domHtmlElement = utils.createDOMFromHTML(generatedHTML)

            // /* add book to book list */
            booksContainer.appendChild(domHtmlElement);
        }
    }

    render();
}