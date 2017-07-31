function initAutocomplete(map) {
    var search_markers = [];

// Create the search box and link it to the UI element.
    var input = document.getElementById('searchmap_keyword');

    var searchBox = new google.maps.places.SearchBox(input);


// Listen for the event fired when the user selects an item from the
// pick list. Retrieve the matching places for that item.
    searchBox.addListener('places_changed', function () {

        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        for (var i = 0, marker; marker = search_markers[i]; i++) {
            marker.setMap(null);
        }

        // For each place, get the icon, place name, and location.
        // Clear out the old markers.
        search_markers.forEach(function(marker) {
            marker.setMap(null);
        });
        search_markers = [];

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            search_markers.push(marker);

            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
        map.setZoom(16);
    });

// Bias the SearchBox results towards places that are within the bounds of the
// current map's viewport.
    google.maps.event.addListener(map, 'bounds_changed', function () {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
    });

    $("#searchmapbutton").click(function(){
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }
        for (var i = 0, marker; marker = search_markers[i]; i++) {
            marker.setMap(null);
        }

        search_markers.forEach(function(marker) {
            marker.setMap(null);
        });
        search_markers = [];

        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, place; place = places[i]; i++) {
            var image = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            var marker = new google.maps.Marker({
                map: map,
                icon: image,
                title: place.name,
                position: place.geometry.location
            });

            search_markers.push(marker);

            bounds.extend(place.geometry.location);
        }

        map.fitBounds(bounds);
        map.setZoom(16);
    });
}
