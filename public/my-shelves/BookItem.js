import Component from '../Component.js';

class BookItem extends Component {
  renderHTML() {
    const book = this.props.book;

    return /*html*/`
      <div>
        <p>${book.title}</p>
        <p>by ${book.author}</p>
      <div>
      `;
  }
};

export default BookItem;
