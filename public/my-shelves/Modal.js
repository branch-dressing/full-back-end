import Component from '../Component.js';

class Modal extends Component {
  onRender(form) {
    form.addEventListener('submit', event => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const book = {
        title: formData.get('title'),
        author: formData.get('author'),
        pages: formData.get('pages'),
        publicationYear: formData.get('publication-year'),
        dateRead: formData.get('date-read'),
      };

      fetch('/api/v1/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
      })
        .then(res => res.json())
        .then(book => {
          if(book._id) {
            window.location.href = '/my-shelves.html';
          } else {
            console.log('Book NOT created');
          }
        });
    });
  }

  renderHTML(){
    return /*html*/`
    <div>
      <form class="modal">
        <fieldset>
          <legend>Add a Book</legend>
          <input name="title" type="text" placeholder="title" required>
          <input name="author" type="text" placeholder="author" required>
          <input name="pages" type="number" placeholder="pages" required>
          <input name="publication-year" type="number" placeholder="2020">
          <input name="date-read" type="date">
        </fieldset>
        <button>Add Book</button>
    </form>
  </div>
  `;
  }
}

export default Modal;
