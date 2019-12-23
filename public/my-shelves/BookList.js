import Component from '../Component.js';
import BookItem from './BookItem.js';

class BookList extends Component {
  onRender(el) {
    //need to pull in books. But limit the number then for each
    BookList.forEach(book => {
      const bookItem = new BookItem();
      el.appendChild(bookItem.renderDOM());
    });
  }

  renderHTML() {
    return /*html*/`
      <div id="booklist">
      </div>
      `;
  }
}

export default BookList;