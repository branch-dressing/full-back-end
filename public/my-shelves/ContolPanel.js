import Component from '../Component.js';

class ControlPanel extends Component {
  renderHTML() {
    return /*html*/`
      <div>
        <div>
          <p>Add Book</p>
        </div>
        <div>
          <p>Search</p>
        </div>
        <div>
          <p>Other</p>
        </div>
      </div>`;
  }

}

export default ControlPanel;
