export default class Ebook {
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
			eBookA.title.toLowerCase() === eBookB.title.toLowerCase() &&
			eBookA.genre.toLowerCase() === eBookB.genre.toLowerCase() &&
			eBookA.author.toLowerCase() === eBookB.author.toLowerCase()
		);
	}
}
