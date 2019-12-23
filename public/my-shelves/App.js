import Component from '../Component.js';
import Header from '../common/Header.js';
import ControlPanel from './ControlPanel.js';
import BookList from './BookList.js';
import verifyLogin from '../utils/verify.js';

class App extends Component {
  onRender(el) {
    verifyLogin();

    const header = new Header();
    el.prepend(header.renderDOM());
    
    const controlPanel = new ControlPanel();
    el.prepend(controlPanel.renderDOM());

    const bookList = new BookList();
    el.prepend(bookList.renderDOM());
  }

  renderHTML() {
    return /*html*/`
      <div>
      </div>`;
  }
}

export default App;
