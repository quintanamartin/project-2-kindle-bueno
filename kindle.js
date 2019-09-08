class Kindle {
	constructor() {
		this.readBooks = 0;
		this.notYetReadBooks = 0;
		this._current = null;
		this._next = null;
		this._last = null;
		this._library = [];
		this._read = [];
		this._unread = [];
	}
	add(eBook) {
		if (this._library.some(x => x.title == eBook.title)) {
			console.warn(`"${eBook.title}" already exists in library`);
		} else {
			this._library.push(eBook);
			this._unread.push(eBook);
			this.notYetReadBooks++;
			if (this._current === null) {
				this._current = eBook;
			} else if (this._next === null) {
				this._next = eBook;
			}
		}
	}
	// para q set currentEBOOK solo agregue eBooks del kindle, hay q usarla así: kindle.currentEBook = kindle._library[nro] o hay otra manera?
	set currentEBook(eBook) {
		if (this._current != eBook) {
			this._next = this._current;
			this._current = eBook;
		}
	}
	get currentEBook() {
		return this._current;
	}

	finishCurrentBook() {
		if (this._current == null) {
			console.error(
				'There is no current book to finish, you must add one first.'
			);
		} else {
			this._current.read = true;
			this._current.readDate = Date.now();
			this._read.push(
				...this.library.filter(x => x.title === this._current.title)
			);
			this._unread = this.library.filter(x => x.title !== this._current.title);
			this._last = this._current;
			this._current = this._next;
			this._next = this._library.find(x => !x.read && x != this._current);
			this.notYetReadBooks--;
			this.readBooks++;
		}
	}
	sortBy(criteria) {
		if (criteria === 'author') {
			return this.library.sort((a, b) =>
				a.author > b.author ? 1 : b.author > a.author ? -1 : 0
			);
		} else if (criteria === 'title') {
			return this.library.sort((a, b) =>
				a.title > b.title ? 1 : b.title > a.title ? -1 : 0
			);
		} else {
			return console.error("only support 'author' or 'title' criteria");
		}
	}
	search(keywords) {

		const typedKeywords = keywords.toLowerCase().trim();

		const result = ebook =>

      			ebook.author.toLowerCase().includes(typedKeywords) ||

      			ebook.title.toLowerCase().includes(typedKeywords);

 

    		const bookList = this._library.filter(result);

 

    		return bookList.length > 0

			? bookList : console.error('There are no results found in your library');
	}
	get library() {
		return [
			...this._library.map(function(ebook) {
				delete ebook.read;
				delete ebook.readDate;
				return ebook;
			})
		];
	}
	get size() {
		return this._library.length;
	}

	filterBy(criteria) {
		return criteria === 'read'
			? this._read
			: criteria === 'unread'
			? this._unread
			: console.error('You have no items that match the selected filters');
	}
}

class Ebook {
	constructor(eBook) {
		this.title = eBook.title;
		this.genre = eBook.genre;
		this.author = eBook.author;
		this.cover = eBook.cover;
		this.read = false;
		this.readDate = null;
	}
	static isEqual(eBookA, eBookB) {
		return (
			eBookA.title === eBookB.title &&
			eBookA.genre === eBookB.genre &&
			eBookA.author === eBookB.author
		);
	}
}

const kindle = new Kindle();
