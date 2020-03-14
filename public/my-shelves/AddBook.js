import Component from '../Component.js';
import Modal from './Modal.js';

class AddBook extends Component {
  onRender(el) {
    el.addEventListener('click', () => {
      const modal = new Modal();
      el.prepend(modal.renderDOM());
    });
  }
  renderHTML() {
    return /*html*/`
    <div id="add-book">
      <img src="./assets/add-book.png">
    </div>
    `;
  }
}

export default AddBook;
