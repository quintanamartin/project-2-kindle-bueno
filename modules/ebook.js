export default class Ebook {
	constructor({ title, genre, author, cover }) {
		this.title = title;
		this.genre = genre;
		this.author = author;
		this.cover = cover;
	}
	static isEqual(
		{ title, genre, author },
		{ title: title2, genre: genre2, author: author2 }
	) {
		return (
			title.toLowerCase() === title2.toLowerCase() &&
			genre.toLowerCase() === genre2.toLowerCase() &&
			author.toLowerCase() === author2.toLowerCase()
		);
	}
}
