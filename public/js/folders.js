        var fileExt = ".xml";

        $(document).ready(
        function(){
            $.ajax({
            //This will retrieve the contents of the folder if the folder is configured as 'browsable'
            url: 'xml/',
            success: function (data) {
               $("#fileNames").html('<ul>');
               //List all xml file names in the page
               $(data).find('a:contains(" + fileExt + ")').each(function () {
                   var filename = this.href.replace(window.location, "").replace("http:///", "");
                   $("#fileNames").append( '<li>'+filename+'</li>');
               });
               $("#fileNames").append('</ul>');
             }
            });
        });
