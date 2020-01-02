import Component from '../Component.js';

class UpdateModal extends Component {
  onRender(form) {
    const bookProp = this.props.book;
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

      fetch(`/api/v1/books/${bookProp._id}`, {
        method: 'PATCH',
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
            console.log('Book NOT UPDATED');
          }
        });
    });

    form.addEventListener('blur', event => {
      event.preventDefault();
      console.log('did this work?');
    });
  }

  renderHTML(){
    const book = this.props.book;
    return /*html*/`
    <div>
      <form class="modal unrotate">
        <fieldset>
          <legend>Update a Book</legend>
          <label for="title">Title</label>
          <input id="title" name="title" type="text" value="${book.title}">
          </br>
          <label for="author">Author</label>
          <input id="author" name="author" type="text" value="${book.author}">
          </br>
          <label for="pages">Pages</label>
          <input id="pages" name="pages" type="number" value="${book.pages}">
          </br>
          <label for="binding">Binding</label>
          <input id="binding" name="binding" type="string" value="${book.binding}">
          </br>
          <label for="publication-year">Publication Year</label>
          <input id="publication-year" name="publication-year" type="number" value="${book.publicationYear}">
          </br>
          <label for="date-read">Date Read</label>
          <input id="date-read" name="date-read" type="date" value="${book.dateRead}">
        </fieldset>
        <button>Update</button>
        <button class="cancel">Cancel</button>
        </form>
  </div>
  `;
  }
}

export default UpdateModal;
