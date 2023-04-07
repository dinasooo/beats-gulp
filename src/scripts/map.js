let myMap;

const init = () =>{
    myMap = new ymaps.Map("map", {
        center: [59.935274, 30.312388],
        zoom: 11,
        controls: []
    });

    const coords = [
        [59.94, 30.39],
        [59.91, 30.50],
        [59.88, 30.31],
        [59.97, 30.31]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        iconLayout: 'default#image',
        iconImageHref: "svg/marker.svg",
        draggable: false,
        iconImageSize: [30, 42],
        iconImageOffset: [-3, -42]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    })

    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);