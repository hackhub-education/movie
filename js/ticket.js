var movies = [
  {
    date: '2015-10-25',
    name: 'Avengers',
    price: 10,
    avaliable: true,
    ticketLeft: 5
  }, 
  {
    date: '2016-01-21',
    name: 'Start Wars',
    price: 12,
    avaliable: true,
    ticketLeft: 0
  },
  {
    date: '1998-05-02',
    name: 'Titanic',
    price: 4,
    avaliable: false,
    ticketLeft: 5
  }
];

for (var i = 0; i < movies.length; i++) {
  if (movies[i].avaliable || movies[i].ticketLeft > 0) {
    console.log(movies[i].name);
  } else {
    console.log('not avaliable');
  }
}






