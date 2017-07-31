/**
 *  Module
 *
 * Description
 */
(function() {
    "use strict"

    angular
        .module('app.core')
        .factory('mapShowMarker', [
            '$compile',
            '$http',

            'S3Service',
            'mainUrl',
            'mapCons',
            'itemsService',
            'condoService',
            '$timeout',

            'postAddData',
            'responseWait',
            '$state',
            function(
                $compile,
                $http,

                S3Service,
                mainUrl,
                mapCons,
                itemsService,
                condoService,
                $timeout,

                postAddData,
                responseWait,
                $state
            ) {

                function showMarkers(scope, data, secondMap) {
                    var map;
                    if (secondMap) {
                        map = mapCons.secondMap;
                    } else {
                        map = mapCons.map;
                    };
                    var mc;
                    var locations = data;

                    mapCons.markers = [];
                    for (var i = 0; i < locations.length; i++) {
                        var locType = locations[i].locationType;
                        var MarkerImage;
                        if (locType == "STATION") {

                            MarkerImage = 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2018.0.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20width%3D%2247%22%20height%3D%2286%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%2047%2086%22%20enable-background%3D%22new%200%200%2047%2086%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%20%20%20%20%3Cg%3E%0D%0A%20%20%20%20%20%20%20%20%3Ccircle%20fill%3D%22%23FFFFFF%22%20cx%3D%2223.5%22%20cy%3D%2212.7%22%20r%3D%2211.2%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpath%20fill%3D%22%23F44336%22%20d%3D%22M23.5%2C24.8c-6.7%2C0-12.1-5.4-12.1-12.1c0-6.7%2C5.4-12.1%2C12.1-12.1c6.7%2C0%2C12.1%2C5.4%2C12.1%2C12.1%0D%0A%09%09C35.6%2C19.4%2C30.2%2C24.8%2C23.5%2C24.8z%20M23.5%2C2.3c-5.7%2C0-10.4%2C4.7-10.4%2C10.4c0%2C5.7%2C4.7%2C10.4%2C10.4%2C10.4s10.4-4.7%2C10.4-10.4%0D%0A%09%09C33.9%2C7%2C29.2%2C2.3%2C23.5%2C2.3z%22%20%2F%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3Cg%20id%3D%22Layer_2%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Layer_3%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctext%20transform%3D%22matrix%281%200%200%201%2023.8442%2017%29%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27roboto%27%22%20font-size%3D%2214%22%20font-weight%3D%22bold%22%3E' + JSON.stringify(locations[i].items_count) + '%3C%2Ftext%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2223%22%20y%3D%2224%22%20fill%3D%22%23F44336%22%20width%3D%221%22%20height%3D%226%22%20%2F%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%23F44336%22%20d%3D%22M35.9%2C30H11.1C7.7%2C30%2C5%2C32.7%2C5%2C36.1V68h37V36.1C42%2C32.7%2C39.3%2C30%2C35.9%2C30z%22%20%2F%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M35.3%2C34H11.7C9.7%2C34%2C8%2C35.7%2C8%2C37.7V53h31V37.7C39%2C35.7%2C37.3%2C34%2C35.3%2C34z%22%20%2F%3E%0D%0A%20%20%20%20%3Ccircle%20fill%3D%22%23FFFFFF%22%20cx%3D%2210.3%22%20cy%3D%2258.4%22%20r%3D%222.3%22%20%2F%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%23F44336%22%20d%3D%22M45%2C47L45%2C47c-1.1%2C0-2-0.9-2-2v-7c0-1.1%2C0.9-2%2C2-2l0%2C0c1.1%2C0%2C2%2C0.9%2C2%2C2v7C47%2C46.1%2C46.1%2C47%2C45%2C47z%22%20%2F%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%23F44336%22%20d%3D%22M2%2C47L2%2C47c-1.1%2C0-2-0.9-2-2v-7c0-1.1%2C0.9-2%2C2-2h0c1.1%2C0%2C2%2C0.9%2C2%2C2v7C4%2C46.1%2C3.1%2C47%2C2%2C47z%22%20%2F%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M30%2C31H17c-0.5%2C0-1%2C0.4-1%2C1v0c0%2C0.5%2C0.4%2C1%2C1%2C1h13c0.5%2C0%2C1-0.4%2C1-1v0C31%2C31.4%2C30.6%2C31%2C30%2C31z%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%222%22%20y%3D%2236%22%20fill%3D%22%23F44336%22%20width%3D%224%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2241%22%20y%3D%2236%22%20fill%3D%22%23F44336%22%20width%3D%224%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2223%22%20y%3D%2234%22%20fill%3D%22%23F44336%22%20width%3D%221%22%20height%3D%2219%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2255%22%20fill%3D%22%23FFFFFF%22%20width%3D%2217%22%20height%3D%221%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2257%22%20fill%3D%22%23FFFFFF%22%20width%3D%2217%22%20height%3D%221%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2259%22%20fill%3D%22%23FFFFFF%22%20width%3D%2217%22%20height%3D%221%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2261%22%20fill%3D%22%23FFFFFF%22%20width%3D%2217%22%20height%3D%221%22%20%2F%3E%0D%0A%20%20%20%20%3Ccircle%20fill%3D%22%23FFFFFF%22%20cx%3D%2236.7%22%20cy%3D%2258.4%22%20r%3D%222.3%22%20%2F%3E%0D%0A%20%20%20%20%3Cg%3E%0D%0A%20%20%20%20%20%20%20%20%3Cdefs%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cpolygon%20id%3D%22SVGID_1_%22%20points%3D%2238.2%2C46.2%2025.8%2C46.2%2026%2C53%2038%2C53%20%09%09%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fdefs%3E%0D%0A%20%20%20%20%20%20%20%20%3CclipPath%20id%3D%22SVGID_2_%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cuse%20xlink%3Ahref%3D%22%23SVGID_1_%22%20overflow%3D%22visible%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2FclipPath%3E%0D%0A%20%20%20%20%20%20%20%20%3Ccircle%20clip-path%3D%22url%28%23SVGID_2_%29%22%20fill%3D%22%23F44336%22%20cx%3D%2232.8%22%20cy%3D%2253%22%20r%3D%224.2%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Ccircle%20clip-path%3D%22url%28%23SVGID_2_%29%22%20fill%3D%22%23FFFFFF%22%20cx%3D%2232.8%22%20cy%3D%2253%22%20r%3D%223%22%20%2F%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3Cline%20fill%3D%22none%22%20stroke%3D%22%23F44336%22%20stroke-width%3D%220.8484%22%20stroke-linecap%3D%22round%22%20stroke-miterlimit%3D%2210%22%20x1%3D%2214.5%22%20y1%3D%2236.2%22%20x2%3D%2210.2%22%20y2%3D%2240.5%22%20%2F%3E%0D%0A%20%20%20%20%3Cline%20fill%3D%22none%22%20stroke%3D%22%23F44336%22%20stroke-width%3D%220.8484%22%20stroke-linecap%3D%22round%22%20stroke-miterlimit%3D%2210%22%20x1%3D%229.9%22%20y1%3D%2243.8%22%20x2%3D%2217.3%22%20y2%3D%2236.5%22%20%2F%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%23F44336%22%20d%3D%22M42%2C65H5v6c10.8%2C3.7%2C18%2C15%2C18%2C15s7.6-11.5%2C19-15V65z%22%20%2F%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M36.8%2C68H10.2C9%2C68%2C8%2C67%2C8%2C65.8v-0.6C8%2C64%2C9%2C63%2C10.2%2C63h26.6c1.2%2C0%2C2.2%2C1%2C2.2%2C2.2v0.6C39%2C67%2C38%2C68%2C36.8%2C68z%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2218%22%20y%3D%2264%22%20fill%3D%22%23F44336%22%20width%3D%2211%22%20height%3D%223%22%20%2F%3E%0D%0A%3C%2Fsvg%3E%0D%0A';
                        } else if (locType == "MALL") {
                            MarkerImage = 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2018.0.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20width%3D%2247%22%20height%3D%2286%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%2047%2086%22%20enable-background%3D%22new%200%200%2047%2086%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%20%20%20%20%3Ccircle%20fill%3D%22%23FFFFFF%22%20cx%3D%2223.5%22%20cy%3D%2212.2%22%20r%3D%2211.2%22%20%2F%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%236838BB%22%20d%3D%22M23.5%2C24.3c-6.7%2C0-12.1-5.4-12.1-12.1c0-6.7%2C5.4-12.1%2C12.1-12.1c6.7%2C0%2C12.1%2C5.4%2C12.1%2C12.1%0D%0A%09C35.6%2C18.9%2C30.2%2C24.3%2C23.5%2C24.3z%20M23.5%2C1.8c-5.7%2C0-10.4%2C4.7-10.4%2C10.4c0%2C5.7%2C4.7%2C10.4%2C10.4%2C10.4s10.4-4.7%2C10.4-10.4%0D%0A%09C33.9%2C6.5%2C29.2%2C1.8%2C23.5%2C1.8z%22%20%2F%3E%0D%0A%20%20%20%20%3Cg%20id%3D%22Layer_2%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Layer_3%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctext%20transform%3D%22matrix%281%200%200%201%2023.8442%2017%29%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27roboto%27%22%20font-size%3D%2214%22%20font-weight%3D%22bold%22%3E' + JSON.stringify(locations[i].items_count) + '%3C%2Ftext%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2223.1%22%20y%3D%2223%22%20fill%3D%22%236838BB%22%20width%3D%220.9%22%20height%3D%226%22%20%2F%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%236838BB%22%20d%3D%22M42%2C64H5v6c10.8%2C3.7%2C18%2C16%2C18%2C16s7.7-12.5%2C19-16V64z%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%225%22%20y%3D%2242%22%20fill%3D%22%236838BB%22%20width%3D%2237%22%20height%3D%2222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%227%22%20y%3D%2244%22%20fill%3D%22%23FFFFFF%22%20width%3D%2233%22%20height%3D%2219%22%20%2F%3E%0D%0A%20%20%20%20%3Cg%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22%236838BB%22%20stroke-linecap%3D%22round%22%20stroke-miterlimit%3D%2210%22%20points%3D%2213%2C46.5%2014.9%2C46.5%2019.2%2C56.5%20%0D%0A%09%0929.4%2C56.5%2032.6%2C47.5%2020%2C47.5%20%09%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Ccircle%20fill%3D%22%236838BB%22%20cx%3D%2220.6%22%20cy%3D%2259.4%22%20r%3D%221.4%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Ccircle%20fill%3D%22%236838BB%22%20cx%3D%2227.7%22%20cy%3D%2259.6%22%20r%3D%221.4%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2250%22%20fill%3D%22%236838BB%22%20width%3D%228%22%20height%3D%221%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Crect%20x%3D%2221%22%20y%3D%2253%22%20fill%3D%22%236838BB%22%20width%3D%226%22%20height%3D%221%22%20%2F%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3Cg%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpolygon%20fill%3D%22%236838BB%22%20points%3D%2241%2C29%206%2C29%203%2C38%2044%2C38%20%09%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Ccircle%20fill%3D%22%236838BB%22%20cx%3D%226%22%20cy%3D%2238%22%20r%3D%223%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cellipse%20transform%3D%22matrix%280.9993%203.701623e-002%20-3.701623e-002%200.9993%201.3983%20-0.4164%29%22%20fill%3D%22%236838BB%22%20cx%3D%2211.9%22%20cy%3D%2237.6%22%20rx%3D%223.1%22%20ry%3D%223.4%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Ccircle%20fill%3D%22%236838BB%22%20cx%3D%2218%22%20cy%3D%2238%22%20r%3D%223%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Ccircle%20fill%3D%22%236838BB%22%20cx%3D%2224%22%20cy%3D%2238%22%20r%3D%223%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Ccircle%20fill%3D%22%236838BB%22%20cx%3D%2230%22%20cy%3D%2238%22%20r%3D%223%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Ccircle%20fill%3D%22%236838BB%22%20cx%3D%2236%22%20cy%3D%2238%22%20r%3D%223%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cellipse%20transform%3D%22matrix%280.9993%203.700648e-002%20-3.700648e-002%200.9993%201.434%20-1.5097%29%22%20fill%3D%22%236838BB%22%20cx%3D%2241.5%22%20cy%3D%2238%22%20rx%3D%222.5%22%20ry%3D%223%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%2210%2C30%209%2C30%207%2C38%208%2C38%20%09%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%2217%2C30%2016%2C30%2015%2C38%2016%2C38%20%09%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Crect%20x%3D%2223%22%20y%3D%2230%22%20fill%3D%22%23FFFFFF%22%20width%3D%221%22%20height%3D%228%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%2231%2C30%2030%2C30%2031%2C38%2032%2C38%20%09%22%20%2F%3E%0D%0A%20%20%20%20%20%20%20%20%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%2238%2C30%2037%2C30%2039%2C38%2040%2C38%20%09%22%20%2F%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2236%22%20y%3D%2244%22%20fill%3D%22%236838BB%22%20width%3D%221%22%20height%3D%2219%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2210%22%20y%3D%2244%22%20fill%3D%22%236838BB%22%20width%3D%221%22%20height%3D%2219%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%227%22%20y%3D%2265%22%20fill%3D%22%23FFFFFF%22%20width%3D%2233%22%20height%3D%223%22%20%2F%3E%0D%0A%3C%2Fsvg%3E%0D%0A';
                        } else {
                            MarkerImage = 'data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2018.0.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20width%3D%2247%22%20height%3D%2286%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20viewBox%3D%220%200%2047%2086%22%20enable-background%3D%22new%200%200%2047%2086%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2229%22%20fill%3D%22%23FD9901%22%20width%3D%2226%22%20height%3D%2236%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2217%22%20y%3D%2231%22%20fill%3D%22%23FFFFFF%22%20width%3D%2222%22%20height%3D%2233%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%225%22%20y%3D%2236%22%20fill%3D%22%23FD9901%22%20width%3D%2217%22%20height%3D%2229%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%227%22%20y%3D%2238%22%20fill%3D%22%23FFFFFF%22%20width%3D%2213%22%20height%3D%2226%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2211%22%20y%3D%2244%22%20fill%3D%22%23FD9901%22%20width%3D%2221%22%20height%3D%2221%22%20%2F%3E%0D%0A%20%20%20%20%3Ccircle%20fill%3D%22%23FFFFFF%22%20cx%3D%2223.1%22%20cy%3D%2212.2%22%20r%3D%2211.2%22%20%2F%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%23FD9901%22%20d%3D%22M23.1%2C24.3c-6.7%2C0-12.1-5.4-12.1-12.1c0-6.7%2C5.4-12.1%2C12.1-12.1c6.7%2C0%2C12.1%2C5.4%2C12.1%2C12.1%0D%0A%09C35.2%2C18.9%2C29.8%2C24.3%2C23.1%2C24.3z%20M23.1%2C1.8c-5.7%2C0-10.4%2C4.7-10.4%2C10.4c0%2C5.7%2C4.7%2C10.4%2C10.4%2C10.4s10.4-4.7%2C10.4-10.4%0D%0A%09C33.5%2C6.5%2C28.8%2C1.8%2C23.1%2C1.8z%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2223%22%20y%3D%2223.4%22%20fill%3D%22%23FD9901%22%20width%3D%221%22%20height%3D%225.7%22%20%2F%3E%0D%0A%20%20%20%20%3Cg%20id%3D%22Layer_2%22%3E%0D%0A%20%20%20%20%20%20%20%20%3Cg%20id%3D%22Layer_3%22%3E%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ctext%20transform%3D%22matrix%281%200%200%201%2023.8442%2017%29%22%20text-anchor%3D%22middle%22%20font-family%3D%22%27roboto%27%22%20font-size%3D%2214%22%20font-weight%3D%22bold%22%3E' + JSON.stringify(locations[i].items_count) + '%3C%2Ftext%3E%0D%0A%20%20%20%20%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3C%2Fg%3E%0D%0A%20%20%20%20%3Cpath%20fill%3D%22%23FD9901%22%20d%3D%22M41%2C64H5v6c10.8%2C3.7%2C17.7%2C16%2C17.7%2C16s7-12.5%2C18.3-16V64z%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2213%22%20y%3D%2246%22%20fill%3D%22%23FFFFFF%22%20width%3D%2217%22%20height%3D%2221%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%229%22%20y%3D%2240%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2240%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%229%22%20y%3D%2244%22%20fill%3D%22%23FD9901%22%20width%3D%222.9%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%229%22%20y%3D%2248%22%20fill%3D%22%23FD9901%22%20width%3D%222.9%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%229%22%20y%3D%2252%22%20fill%3D%22%23FD9901%22%20width%3D%222.9%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%229%22%20y%3D%2256%22%20fill%3D%22%23FD9901%22%20width%3D%222.9%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%229%22%20y%3D%2260%22%20fill%3D%22%23FD9901%22%20width%3D%222.9%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2234%22%20y%3D%2260%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2234%22%20y%3D%2256%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2234%22%20y%3D%2252%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2234%22%20y%3D%2248%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2234%22%20y%3D%2244%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2234%22%20y%3D%2240%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2234%22%20y%3D%2236%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2234%22%20y%3D%2232%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2229%22%20y%3D%2240%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2229%22%20y%3D%2236%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2229%22%20y%3D%2232%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2224%22%20y%3D%2240%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2224%22%20y%3D%2236%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2224%22%20y%3D%2232%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2219%22%20y%3D%2232%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2259%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2259%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2225%22%20y%3D%2259%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2256%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2256%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2225%22%20y%3D%2256%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2253%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2253%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2225%22%20y%3D%2253%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2250%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2250%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2225%22%20y%3D%2250%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2215%22%20y%3D%2247%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2220%22%20y%3D%2247%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2225%22%20y%3D%2247%22%20fill%3D%22%23FD9901%22%20width%3D%223%22%20height%3D%222%22%20%2F%3E%0D%0A%20%20%20%20%3Crect%20x%3D%2219%22%20y%3D%2262%22%20fill%3D%22%23FD9901%22%20width%3D%225%22%20height%3D%225%22%20%2F%3E%0D%0A%3C%2Fsvg%3E%0D%0A';
                            // condo
                            // ff9800

                            // JSON.stringify(locations[i].items_count)
                        };

                        mapCons.markers[i] = new google.maps.Marker({
                            position: {
                                lat: locations[i].latitude,
                                lng: locations[i].longtitude
                            },
                            map: map,
                            id: locations[i].id,
                            icon: {
                                url: MarkerImage,
                                labelOrigin: new google.maps.Point(20, 20)
                            },
                            itemsCount: locations[i].items_count
                        });


                        // var iwLocationName = new google.maps.InfoWindow();


                        google.maps.event.addListener(mapCons.markers[i], 'click', (function(i, scope) {
                            return function() {
                                console.log(mapCons.IsChoosingLocation);

                                // mapCons.IsChoosingLocation == true when marker draggable active
                                switch (mapCons.IsChoosingLocation) {
                                    case true:
                                        if (!postAddData.location) { postAddData.location = {}; } //postAddData used also for user location settings
                                        postAddData.location.id = mapCons.markers[i].id;
                                        postAddData.location.condoAddrSelected = true;
                                        scope.$apply();
                                        break;

                                    case false:
                                        scope.location_obj = locations[i];
                                        scope.closeInfoWindow = function() {
                                            mapCons.infowindow.close();
                                            // mapCons.infowindow.prototype.position = {
                                            //     lat: mapCons.latitude,
                                            //     lng: mapCons.longitude
                                            // }
                                            mapCons.infowindow = new google.maps.InfoWindow({
                                                position: new google.maps.LatLng(13.748074, 100.577436)
                                            })
                                        }

                                        if (mapCons.infowindow)
                                            mapCons.infowindow.close();

                                        responseWait.status = true;

                                        condoService.getCondoIdItems.async(locations[i].id).then(function(success) {
                                            responseWait.status = false;

                                            scope.mapMarkers = success;
                                            var contentString = '<info-window iwlocation="location_obj" iwdata="mapMarkers" iwclose="closeInfoWindow"></info-window>';
                                            var compiled = $compile(contentString)(scope);

                                            mapCons.infowindow = new google.maps.InfoWindow({
                                                id: mapCons.markers[i].id,
                                                content: compiled[0],
                                                position: new google.maps.LatLng(locations[i][1], locations[i][2])
                                            });


                                            $timeout(function() {
                                                mapCons.infowindow.open(map, mapCons.markers[i]);
                                            }, 600);
                                        });
                                        break;
                                }
                            }
                        })(i, scope, locations[i]));

                        google.maps.event.addListener(mapCons.markers[i], 'mouseover', (function(i, scope) {
                            return function() {
                                var activeTitle;
                                if (locations[i].title_en)
                                  activeTitle = locations[i].title_en;
                                else activeTitle = locations[i].title;

                                var contentString = '<info-window-hover title="' + activeTitle + '"></info-window-hover>'
                                    // var contentString = '<info-window-hover title="' + locations[i].name_en + '"></info-window-hover>'
                                var compiled = $compile(contentString)(scope);

                                //update scope
                                scope.$apply();

                                mapCons.iwLocationName.close();
                                mapCons.iwLocationName = new google.maps.InfoWindow({
                                    id: mapCons.markers[i].id,
                                    content: compiled[0],
                                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),

                                });
                                mapCons.iwLocationName.open(map, mapCons.markers[i]);

                            };
                        })(i, scope, locations[i]));

                        google.maps.event.addListener(mapCons.markers[i], 'mouseout', (function(i, scope) {
                            return function() {
                                mapCons.iwLocationName.close();
                            };
                        })(i, scope, locations[i]));
                    }

                    function setClustering(markers) {
                        var mcOptions = {
                            gridSize: 45
                        };
                        mc = new MarkerClusterer(map, markers, mcOptions);
                        mapCons.cluster.fn = mc;
                        var newStyle = mapCons.cluster.option;
                        mc.setStyles(newStyle);
                    }
                    setClustering(mapCons.markers);

                    /////////////
                    ///context menu
                    ////////////
                    var menuStyle = {
                        menu: 'context_menu'
                            //menuSeparator: 'context_menu_separator',
                            //menuItem: 'context_menu_item'
                    };

                    var contextMenuOptions = {
                        classNames: menuStyle,
                        menuItems: [{
                            label: 'Add your condo...',
                            id: 'menu_option1',
                            className: 'menu_item',
                            eventName: 'option1_clicked'
                        }, {
                            label: 'Exit',
                            id: 'menu_option2',
                            className: 'menu_item',
                            eventName: 'option2_clicked'
                        }],
                        pixelOffset: new google.maps.Point(10, -5),
                        zIndex: 5
                    };

                    var contextMenu = new ContextMenu(map, contextMenuOptions);
                    google.maps.event.addListener(contextMenu, 'menu_item_selected',
                        function(latLng, eventName, source) {
                            switch (eventName) {
                                case 'option1_clicked':
                                    if (!postAddData.newCondo) { postAddData.newCondo = {}; }
                                    postAddData.newCondo.latLng = {
                                        lat: latLng.lat(),
                                        lng: latLng.lng()
                                    };
                                    scope.$apply();
                                    $state.go("home.home_location");
                                    break;
                                case 'option2_clicked':
                                    // do something else
                                    break;
                                default:
                                    break;
                            }
                        });

                    google.maps.event.addListener(map, 'rightclick', function(mouseEvent) {
                        contextMenu.show(mouseEvent.latLng, map);
                    });

                    $timeout(function() {
                        mapCons.loadedFinished = true;
                    }, 0);
                }
                return {
                    showMarkers: showMarkers
                };
            }
        ]);
})();
