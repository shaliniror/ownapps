$("document").ready(function(){

      var tableid = '1WNIXlj_3xXVIBRd4JIyXZadi51ZzZ-vcTTc5J_cK';
      var map;

      function initialize() {
        geocoder = new google.maps.Geocoder();
        map = new google.maps.Map(document.getElementById('map_canvas'), {
          center: new google.maps.LatLng(38.937301, -94.703309),
          zoom: 2,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
 
        setData();
      }

      function setData() {

        var query = new google.visualization.Query('http://www.google.com/fusiontables/gvizdata?tq=' + encodeURIComponent("SELECT id, 'latitude', 'longitude' FROM 1WNIXlj_3xXVIBRd4JIyXZadi51ZzZ-vcTTc5J_cK"));
        query.send(getData);
                
      }

      function getData(response) {

        numRows = response.getDataTable().getNumberOfRows();
        numCols = response.getDataTable().getNumberOfColumns();
        var row_array = [];
        for (i = 0; i < numRows; i++) {
          var row = [];
          for (j = 0; j < numCols; j++) {
            row.push(response.getDataTable().getValue(i, j));
          }
          row_array.push(row);
        }

        for(k=0; k<= row_array.length; k++){
         createMarker(row_array[k]); 
        }
      }

      function createMarker(row) {
        var myLatLng = new google.maps.LatLng(row[1], row[2]);
        var contentString = '<div id="content">'
                             + '<b>id: </b>' + row[0] + '<br>'
                             + '<b>latitude: </b>' + row[1] + '<br>'
                             + '<b>longitude: </b>' + row[2] + '<br>'
                            +'</div>';

        
          var image ={
url: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + row[0] + '|FE6256|000000'
          };

          var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              icon: image
          });

          var infowindow = new google.maps.InfoWindow({
      content: contentString
  });
google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map,marker);
  });

       
      }
      google.maps.event.addDomListener(window, 'load', initialize);

      });
