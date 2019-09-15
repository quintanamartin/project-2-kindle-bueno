import Ebook from './ebook.js';

export default class Kindle {
	constructor() {
		this.readBooks = 0;
		this.notYetReadBooks = 0;
		this._current = null;
		this._next = null;
		this._last = null;
		this._library = [];
		this._read = [];
		this._unread = [];
		this._recentSearches = [];
	}
	add(eBook) {
		if (this._library.some(book => Ebook.isEqual(book, eBook))) {
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
	set currentEBook(eBook) {
		if (this._current != eBook) {
			this._next = this._current;
			this._current = eBook;
		}
	}
	get currentEBook() {
		return {
			...this._current.map(ebook => {
				delete ebook.read;
				delete ebook.readDate;
				return ebook;
			})
		};
	}

	finishCurrentBook() {
		if (this._current == null) {
			console.error('There is no current book to finish, you must add one first.');
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
		this._recentSearches.unshift(keywords);
		if (this._recentSearches.length > 5) {
			this._recentSearches.pop();
		}
		const typedKeywords = keywords.toLowerCase().trim();

		const result = ebook =>
			ebook.author.toLowerCase().includes(typedKeywords) ||
			ebook.title.toLowerCase().includes(typedKeywords);

		const bookList = this._library.filter(result);

		return bookList.length > 0
			? bookList
			: console.error('There are no results found in your library');
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
	get recentSearches() {
		return this._recentSearches.length === 0
			? console.warn('There are not recent searches')
			: this._recentSearches;
	}
	get clearHistory() {
		this._recentSearches = [];
	}
	filterBy(criteria) {
		return criteria === 'read'
			? this._read
			: criteria === 'unread'
			? this._unread
			: console.error('You have no items that match the selected filters');
	}
}
