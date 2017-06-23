// C L I E N T E
$(document).ready(function() {

  $('#conectNginx').on('click', function(req, res) {
  $.ajax({
    type: 'POST',
    url: "/folder",
    data: {},
    success: function(data){
      console.log(data);
      console.log(data.message);
      alert(data.stdout);
       $('#mensagem').text(data.stdout);
       $(data).find("a:contains(.config)").each(function(){
          // will loop through
          alert("Found a file: " + $(data.stdout).attr("href"));
          console.log(data);

       });
    },
    dataType: 'json',
    contentType: 'application/json'
  });
  });

setInterval(function() {
    $.ajax({
      type: 'POST',
      url: '/conect',
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
        $("#knob-angle-offset").val(parseInt(data.stdout)).trigger('change');
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }, 5000);

  setInterval(function() {
      $.ajax({
        type: 'POST',
        url: '/conectmemfree',
        data: {},
        success: function(data) {
          console.log(data);
          console.log(data.message);
          $("#memfree").val((data.stdout)).trigger('change');
        },
        dataType: 'json',
        contentType: 'application/json'
      });
    }, 2000);


  $('#createHost').on('click', function(req, res) {
    $.ajax({
      type: 'POST',
      url: '/host',
      data: JSON.stringify({
        'host': $('#host').val(),
        'port': $('#port').val(),
        'destination': $('#destination').val(),
        'cache': $('#cache').is(':checked')
      }),
      success: function(data) {
        console.log(data);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });

  $('#createHost1').on('click', function(req, res) {

    $.ajax({
      type: 'POST',
      url: '/host1',
      data: JSON.stringify({
        'host1': $('#host1').val(),
        'port1': $('#port1').val(),
        'destination1': $('#destination1').val(),
        'cache1': $('#cache2').is(':checked'),
        'host2': $('#host2').val(),
        'port2': $('#port2').val(),
        'destination2': $('#destination2').val(),
        'cache2': $('#cache2').is(':checked'),
        'host3': $('#host3').val(),
        'port3': $('#port3').val(),
        'destination3': $('#destination3').val(),
        'cache3': $('#cache3').is(':checked'),
        'host4': $('#host1').val(),
        'port4': $('#port1').val(),
        'destination4': $('#destination4').val(),
        'cache4': $('#cache4').is(':checked')
      }),
      success: function(data) {
        console.log(data);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });


  $('#testNginx').on('click', function(req, res) {
    $.ajax({
      type: 'POST',
      url: '/nginx/test',
      data: {},
      success: function(data) {
        console.log(data);
        alert('Teste. ' + data.stdout);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });

  $('#reloadNginx').on('click', function() {
    $.ajax({
      type: 'POST',
      url: '/nginx/reload',
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });

  $('#conectNginx').on('click', function() {
  });

});
