// C L I E N T E
$(document).ready(function() {
var tabIDs;
  $('#conectNginx').on('click', function(req, res) {
    $.ajax({
      type: 'POST',
      url: "/folder",
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
        alert(data.stdout);
        $('#mensagem').text(data.stdout);
        $(data).find("a:contains(.config)").each(function() {
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
        $("#knobconections").val(parseInt(data.stdout)).trigger('change');
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }, 2000);

  setInterval(function() {
    $.ajax({
      type: 'POST',
      url: '/conectmemtotal',
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
        $("#memtotal").val(parseInt(data.stdout)).trigger('change');
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }, 2000);

  setInterval(function() {
    $.ajax({
      type: 'POST',
      url: '/conectmemfree',
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
        $("#memfree").val(parseInt(data.stdout)).trigger('change');
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  }, 2000);

  setInterval(function() {
    $.ajax({
      type: 'POST',
      url: '/conectmemavail',
      data: {},
      success: function(data) {
        console.log(data);
        console.log(data.message);
        $("#memavail").val(parseInt(data.stdout)).trigger('change');
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
        //console.log(data.message);
      },
      dataType: 'json',
      contentType: 'application/json'
    });
  });



  var button = '<button class="close" type="button" title="Remove this page">&nbsp× </button>';
  var tabID = 1;

  function resetTab() {
    var tabs = $("#tab-list li:not(:first)");
    var len = 1
    $(tabs).each(function(k, v) {
      len++;
      $(this).find('a').html('Configuração ' + len + button);
    })
    tabID--;
  }

  $('#btn-add-tab').click(function() {
    tabID++;
    console.log(tabID);
    tabIDs = tabID;
    $('#tab-list').append(
      $('<li><a href="#tab' + tabID + '" role="tab" data-toggle="tab">Configuração ' + tabID + '<button class="close" type="button" title="Remove this page">×</button></a></li>'));
    $('#tab-content').append(
      $('<div class="tab-pane fade" id="tab' + tabID + '"><form id="teste"><p>' + '</p><div class="form-group"><label for="host">Host:</label><div class="form-input"><input type="text" class="form-control" id="host' + tabID + '" value="xpto' + tabID + '.pt" name="host"></div></div><div class="form-group"><label for="port">Port:</label><div class="form-input"><input type="text" class="form-control" id="port' + tabID + '" value="80"></div></div><div class="form-group"><label for="destination">Destination:</label><div class="form-input"><input type="text" class="form-control" id="destination' + tabID + '" value="http://127.0.0.1:300' + tabID + '"></div></div><div class="checkbox"><label><div class="form-input"><input type="checkbox" id="cache' + tabID + '"> Static assets cache</div></label></div></form></div>'));
  });
  $('#tab-list').on('click', '.close', function() {

    var tabID1 = $(this).parents('a').attr('href');
    console.log(tabID-1);
    tabIDs  = tabID -1;
    $(this).parents('li').remove();
    $(tabID1).remove();
    //display first tab
    var tabFirst = $('#tab-list a:first');
    resetTab();
    tabFirst.tab('show');
  });

  var list = document.getElementById("tab-list");
var a = [];
var array = [];
var array2 = [];
var array3 = [];
    $("#printme").button().on("click", function() {
          printCalc()
        })

        function printCalc() {
                $("#tabs").each(function() {
                  //$(this).find(".nav-tabs li").each(function(index, element) {
                    var i=0;
                    var x=1;
                    //Nº de palavras dentro do array
                    var count = 0;
                    $("form#teste input").each(function(index, element) {

                    //tabs_html += "<h2>" + $(this).text() + "</h2><br/>";
                    //tabs_html += $(".tab-content .tab-pane").eq(index).html() + "<br/><br/>";
                    //console.log($(this).val());
                    
                    a = JSON.stringify(
                      $(this).val()
                    );
                    count = count + 1;
                    i=i+1;
                    if (i==1) {
                      array = 'host' + a + ',';
                      //array2 = array2 + array;
                    }
                    if (i==2) {
                      array =  array  + 'port' + a + ",";
                    }
                    if (i==3) {
                      array =  array + 'destination' + a + ",";
                    }
                    if (i==4) {
                      array =  array + 'cache' + a + ",";
                      i = i + 1;
                    }
                    if (i==5) {
                      array2 = array ;
                      i = 1;
                    }


                  });
                  //var str = JSON.serialize(array);

                  // log the results
                  //console.log(str.name);
                  //console.log(obj);
                  i = 0;
                  console.log(array);

                            //console.log(JSON.serialize(array));
var obj = JSON.parse(array);
console.log(obj);

                  console.log(count);

                  var y = 1;
                  var text = [];
                  text = "{" + array + "}";
                  for (i=1; i<10;i++){
                            console.log(array[i]);
                          }
                  //text = JSON.stringify(text);



                  for (i=0; i<=count; i++){
                    if (y<=4){
                      //text = JSON.parse(array);
                      console.log(text);
                      y=y+1;
                    }

                  }
                  //console.log((array2));
                  });


                  };


});
