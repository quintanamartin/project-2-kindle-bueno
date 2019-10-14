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

kindle.finishCurrentBook();
kindle.finishCurrentBook();

console.log(kindle);

console.log('===========lirary===================');
console.log(kindle.library);
console.log('===========filtersssss============');
console.log(kindle.filterBy('unread'));
console.log(kindle.filterBy('read'));
console.log(kindle.filterBy('hola'));
console.log('=========== search ===================');

console.log(kindle.search('java'));

console.log('===========seeing recent searches');
console.log(kindle.status.recentSearches);
console.log('===========sort by ===================');
console.log(kindle.sortBy('author'));
console.log(kindle.sortBy('title'));

console.log(kindle.sortBy('fruta'));
console.log('===========ssearches ===================');

console.log(kindle.currentEBook);

console.log(kindle.search('c'));
console.log(kindle.search('the'));

console.log('=========== recent searches===================');
console.log(kindle.status.recentSearches.show());
console.log('========== clear searches ===================');
kindle.status.recentSearches.clear();
console.log(kindle.status.recentSearches);
