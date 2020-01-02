import Component from '../Component.js';
import UpdateModal from './Update-Modal.js';

class BookItem extends Component {
  onRender(el) {
    const book = this.props.book;
    el.onmouseover = function() {
      el.querySelector('.popup').style.display = 'block';
    };

    el.onmouseout = function() {
      el.querySelector('.popup').style.display = 'none';
    };

    el.addEventListener('click', () => {
      const modal = new UpdateModal({ book });
      el.prepend(modal.renderDOM());
    });
  }

  renderHTML() {
    const book = this.props.book;
    const height = book.pages * 0.08;
    let width;
    if(book.binding === 'hardback') width = 165; 
    if(book.binding === 'paperback') width = 135;
    if(book.binding === 'mass market') width = 103.5;

    return /*html*/`
      <div class="single-book"
        style="height: ${height}px; width: ${width}px">
        <p class="title">${book.title}</p>
        <div class="popup">
          <h3>${book.title}</h3>
          <h4>by ${book.author}</h4>
          <p>Pages: ${book.pages}</p>
          <p>Date Read: ${book.dateRead}</p>
          <p>Publication Year: ${book.publicationYear}</p>
        </div>
      <div>
      `;
  }
}

export default BookItem;
