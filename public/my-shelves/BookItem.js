import Component from '../Component.js';

class BookItem extends Component {
  renderHTML() {
    const book = this.props.book;

    return /*html*/`
      <div>
        <h1>${book.title}</h1>
      <div>
      `;
  }
};

export default BookItem;
