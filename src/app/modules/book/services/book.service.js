(function () {
  angular
  .module('app.book')
  .factory('BookService', BookService);

  BookService.$inject = ['$q', '$http'];

  function BookService($q, $http) {
    var service = {
      getBook: getBook,
      bookCollection: [
        {
          id: '6504052da4a041c59c36e1883f796c63',
          title: 'English for Everyone Business English Level 2 Course Book',
          isbn: '9780241275146',
          published: '16 Jan 2017',
          packedType: ['Paperback'],
          description: 'English for Everyone is an exciting and comprehensive self-study course for adults learning English as a foreign language. This course is a unique new series with a visual, engaging, and easy to follow style to make the English language easy to learn.'+
          'Learn business English by reinforcing key language skills, grammar rules, and vocabulary with listening, speaking, reading, and writing exercises. This unique course is easy to use, starting at beginner level and working up to advanced English to help you grow in confidence as you learn. This Business English Intermediate Course Book introduces business topics such as interpersonal skills, meeting vocabulary, emailing a client, and attending interviews.' +
          'Audio material is provided at every stage through the English For Everyone website and Android/iOS apps to provide vital experience of spoken English and make even tricky phrases easy to understand. Perfect for personal study or to support exams including TOEFL and IELTS, English for Everyone is suitable for all levels of English language learners',
          size: '207 x 237mm',
          pages: 252,
          cover: 'app/assets/img/books/6504052da4a041c59c36e1883f796c63.jpg',
          images: [],
          price: 12.99
        }
      ]
    };

    return service;

    function getBook(bookId) {
      for(var i = 0; i < service.bookCollection.length; i++) {
        var book = service.bookCollection[i];
        if (book.id === bookId) {
          return book;
        }
      }
      return null;
    }
  }

})();
