import Kindle from './modules/kindle.js';
import Ebook from './modules/ebook.js';

const kindle = new Kindle();

let ebook = new Ebook({
	title: 'Drive',
	genre: 'Psychology',
	author: 'Daniel H. Pink',
	cover: 'https://i.imgur.com/B3XpOxl.jpg'
});

kindle.add(ebook);

ebook = new Ebook({
	title: 'Futuro Pop',
	genre: 'Science Fiction',
	author: 'Luciano Banchero',
	cover: 'https://i.imgur.com/uYOy55M.jpg'
});

kindle.add(ebook);

ebook = new Ebook({
	title: 'The Lord of the Rings - The Fellowship of the Ring',
	genre: 'Fantasy',
	author: 'J. R. R. Tolkien',
	cover: 'https://i.imgur.com/OwMUnQu.jpg'
});

kindle.add(ebook);

ebook = new Ebook({
	title: 'The Principles Of Object-oriented Javascript',
	genre: 'Programming',
	author: 'Nicholas C. Zakas',
	cover: 'https://i.imgur.com/Iktw1ps.jpg'
});

kindle.add(ebook);

ebook = new Ebook({
	title: "Harry Potter and the Philosopher's Stone",
	genre: 'Fantasy',
	author: 'J. K. Rowling',
	cover: 'https://i.imgur.com/PH1aXaP.jpg'
});

kindle.add(ebook);

ebook = new Ebook({
	title: 'Eloquent JavaScript',
	genre: 'Programming',
	author: 'Marijn Haverbeke',
	cover: 'https://i.imgur.com/F4NQlvx.jpg'
});

kindle.add(ebook);

console.log(kindle);
