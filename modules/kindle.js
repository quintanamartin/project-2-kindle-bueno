import Ebook from './ebook.js';
import Buffer from './buffer.js';

export default class Kindle {
	constructor() {
		this._current = null;
		this._next = null;
		this.ebookState = new Map();
		this._last = null;
		this.library = [];
		this.status = {
			readBooks: 0,
			notYetReadBooks: 0,
			recentSearches: new Buffer({ size: 4, init: '' })
		};
	}
	_wasRead(ebook) {
		return this.ebookState.get(ebook).read;
	}
	add(eBook) {
		if (this.library.some(libraryEbook => Ebook.isEqual(libraryEbook, eBook))) {
			console.warn(`"${eBook.title}" already exists in library`);
		} else {
			this.library.push(eBook);
			this.ebookState.set(eBook, { read: false, date: null });
			this.status.notYetReadBooks++;
			if (this._current === null) {
				this._current = eBook;
			} else if (this._next === null) {
				this._next = eBook;
			}
		}
	}
	set currentEBook(eBook) {
		if (this._current != eBook) {
			this._next = this._current;
			this._current = eBook;
		}
	}
	get currentEBook() {
		if (this._current === null) {
			console.error('There is not current eBook. Select one first');
		}
		return { ...this._current };
	}

	finishCurrentBook() {
		if (this._current == null) {
			console.error('There is no current book to finish, you must add one first.');
		} else {
			this.ebookState.set(this._current, { read: true, date: Date.now() });
			//console.log(this.ebookState.get(this._current));
			this._last = this._current;
			this._current = this._next;
			this._next = this.library.find(
				x => !this.ebookState.get(x).read && x != this._current
			);
			this.status.notYetReadBooks--;
			this.status.readBooks++;
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
			console.error("only support 'author' or 'title' criteria");
		}
	}
	search(keywords) {
		this.status.recentSearches.add(keywords);
		const typedKeywords = keywords.toLowerCase().trim();

		const result = ebook =>
			ebook.author.toLowerCase().includes(typedKeywords) ||
			ebook.title.toLowerCase().includes(typedKeywords);

		const bookList = this.library.filter(result);

		return bookList.length > 0
			? bookList
			: console.error('There are no results found in your library');
	}
	get size() {
		return this.library.length;
	}
	get recentSearches() {
		return this.status.recentSearches.show();
	}
	get clearHistory() {
		this.status.recentSearches.clear();
	}
	filterBy(criteria) {
		return criteria === 'read'
			? this.library.filter(ebook => this._wasRead(ebook) === true)
			: criteria === 'unread'
			? this.library.filter(ebook => this._wasRead(ebook) === false)
			: console.error(
					'You have no items that match the selected filters ' + criteria
			  );
	}
}
