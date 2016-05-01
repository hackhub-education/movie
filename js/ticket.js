var movies = [
  {
    id: 'm0',
    date: '2015-10-25',
    name: 'Avengers',
    price: 10,
    avaliable: true,
    ticketLeft: 5
  }, 
  {
    id: 'm1',
    date: '2016-01-21',
    name: 'Start Wars',
    price: 12,
    avaliable: true,
    ticketLeft: 2
  },
  {
    id: 'm2',
    date: '1998-05-02',
    name: 'Titanic',
    price: 4,
    avaliable: false,
    ticketLeft: 5
  },
  {
    id: 'm3',
    date: '1978-05-02',
    name: 'Go',
    price: 17,
    avaliable: true,
    ticketLeft: 5
  }
];

for (var i = 0; i < movies.length; i++) {
  var dateTd = '<td>' + movies[i].date + '</td>';
  var nameTd = '<td>' + movies[i].name + '</td>';
  var priceTd = '<td>' + movies[i].price + '</td>';
  var ticketTd = '<td id="t' + movies[i].id +'">' + movies[i].ticketLeft + '</td>';
  if (movies[i].avaliable && movies[i].ticketLeft > 0) {
    // movie is avaliable and has ticket left, user can purchase
    var purchaseTd = '<td><button class="btn btn-primary btn-purchase" id="'+ movies[i].id + '">Purchase</button></td>';
  } else {
    // movie is not avaliable and user cannot purchase
    var purchaseTd = '<td><button class="btn" disabled="true">Not Avaliable</button></td>';
  }
  $('<tr>').html(dateTd + nameTd + priceTd + purchaseTd + ticketTd).appendTo('#ticket-table');
}

$('.btn-purchase').click(function(e) {

  $('input[name="name"]').val('');
  $('input[name="email"]').val('');
  $('input[name="phone"]').val('');

  for (var i = 0; i < movies.length; i++) {
    if (movies[i].id === e.target.id) {
      if (movies[i].ticketLeft > 0) {
        // movies[i].ticketLeft--;
        $('.movie-name').text(movies[i].name);
        $('input[name="movie-id"]').val(movies[i].id);

        $('#user-info').modal('show');
        $('#t' + movies[i].id).text(movies[i].ticketLeft);
      } 
      if (movies[i].ticketLeft < 1) {
        // $(e.target).text('Not Avaliable').css({
        //   'background-color': '#ccc',
        //   'cursor': 'default'
        // });
        $(e.target).text('Not Avaliable').removeClass('btn-primary btn-purchase').prop('disabled', true);
      }
    }
  }
});

$('#btn-reserve').click(function(e) {

  var reservation = {
    name: $('input[name="name"]').val(),
    email: $('input[name="email"]').val(),
    phone: $('input[name="phone"]').val(),
    movieId: $('input[name="movie-id"]').val(),
  };
  console.log(reservation);
});