import Component from '../Component.js';
import BookItem from './BookItem.js';

class BookList extends Component {
  onRender(el) {
    const bookList = this.props.books;

    bookList.forEach(book => {
      const props = { book };
      const bookItem = new BookItem(props);
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
