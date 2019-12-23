import Component from '../Component.js';
import Header from '../common/Header.js';
// import ControlPanel from './ContolPanel';
import BookList from './BookList.js';
import verifyLogin from '../utils/verify.js';

class App extends Component {
  onRender(el) {
    verifyLogin();

    const header = new Header();
    el.prepend(header.renderDOM());
    
    // const controlPanel = new ControlPanel();
    // el.prepend(controlPanel.renderDOM());

    const bookList = new BookList({ books: [] });
    el.appendChild(bookList.renderDOM());

    async function loadBooks() {
      const results = await fetch('/api/v1/books');
      const data = await results.json();
      if(data.results === 'False') {
        return {
          results: [],
          count: 0
        };
      }
      //const count = data.count;
      bookList.update({ books: data });
    }

    loadBooks();

  }

  renderHTML() {
    return /*html*/`
      <div>
      </div>`;
  }
}

export default App;
