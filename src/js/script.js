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
        },
        filters: '.filters',

    }

    const templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    };



    function render() {

        /* find books container */
        const booksContainer = document.querySelector(select.containerOf.bookList);
        // console.log('booksContainer:', booksContainer)

        // go through every book in the dataSource.books
        for (let book of dataSource.books) {

            const ratingBgc = determineRatingBgc(book.rating);
            book.ratingBgc = ratingBgc;

            const ratingWidth = book.rating * 10;
            book.ratingWidth = ratingWidth;
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

    // in this tab, we will store information on which filter is now selected
    const filters = [];

    // in the filterForm, there are two labels -'adults only' and 'non-fiction'
    const filterForm = document.querySelector(select.filters);

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

    filterForm.addEventListener('click', function (event) {

        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
            // console.log(event.target.value)
            if (event.target.checked) {
                filters.push(event.target.value);
            }
            else {
                const indexOfFilter = filters.indexOf(event.target.value);
                filters.splice(indexOfFilter, 1);
            }

        }
        showFilteredBooks();
    })

    function showFilteredBooks() {

        for (const book of dataSource.books) {

            let shouldBeHidden = false;
            for (const filter of filters) {
                if (!book.details[filter]) {
                    shouldBeHidden = true;
                    break;
                    // jesli ta ksiazka nie pasuje do filtrow, jest chowana

                }

            }


            const bookImages = document.querySelectorAll('.book__image');


            if (shouldBeHidden) {
                for (image of bookImages) {
                    if (book.id == image.getAttribute('data-id')) {
                        image.classList.add('hidden')
                        // console.log(image)
                    }
                }
            }

            else {
                for (const image of bookImages) {
                    if (book.id == image.getAttribute('data-id')) {
                        image.classList.remove('hidden');

                    }
                }
            }
        }

    }


    function determineRatingBgc(value) {

        for (let data of dataSource.books) {
            if (value == data.rating && data.rating < 6) {
                return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
            }
            else if (value == data.rating && data.rating > 6 && data.rating <= 8) {
                return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
            }
            else if (value == data.rating && data.rating > 8 && data.rating <= 9) {
                return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
            }
            else if (value == data.rating && data.rating > 9) {
                return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
            }
        }
    }

    render();
    initActions();

}
