import Component from '../Component.js';
import AddBook from './AddBook.js';

class ControlPanel extends Component {
  onRender(el) {
    const addBook = new AddBook();
    el.prepend(addBook.renderDOM());
  }

  renderHTML() {
    return /*html*/`
      <div id="control-panel">
      </div>
    `;
  }

}

export default ControlPanel;
