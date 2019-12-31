import Component from '../Component.js';

class BookItem extends Component {
  renderHTML() {
    const book = this.props.book;
    //const height = book.pages / 

    return /*html*/`
      <div class="single-book">
        <p class="title">${book.title}</p>
      <div>
      `;
  }
}

export default BookItem;
