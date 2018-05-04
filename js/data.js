'use strict';

window.data = {

  mock: {
    avatars: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'],
    title: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    address: ['600, 350', '1100, 350', '900, 550', '800, 400', '500, 550', '200, 700', '350, 600', '1000, 700'],
    type: ['palace', 'flat', 'house', 'bungalo'],
    typeRu: ['Замок', 'Квартира', 'Дом', 'Бунгало'],
    checkin: ['12:00', '13:00', '14:00'],
    checkout: ['12:00', '13:00', '14:00'],
    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  },
  create: function (count) {

    var items = [];
    for (var i = 0; i < count; i++) {
      var item = {};

      // Author
      item.author = {};
      item.author.avatar = window.data.mock.avatars[i];

      // Offer
      item.offer = {};
      item.offer.title = window.data.mock.title[i];
      item.offer.address = window.data.mock.address[i];
      item.offer.price = window.utils.getRandomInt(1000, 1000000);
      item.offer.type = window.utils.getRandom(window.data.mock.type);
      item.offer.rooms = window.utils.getRandomInt(1, 5);
      item.offer.guests = window.utils.getRandomInt(1, 10);
      item.offer.checkin = window.utils.getRandom(window.data.mock.checkin);
      item.offer.checkout = window.utils.getRandom(window.data.mock.checkout);
      item.offer.features = window.utils.getRandomFeature(window.data.mock.features);
      item.offer.description = '';
      item.offer.photos = window.utils.shuffleArray(window.data.mock.photos);

      // Location
      item.location = {};
      item.location.x = window.utils.getRandomInt(300, 900);
      item.location.y = window.utils.getRandomInt(150, 500);


      items[i] = item;

    }
    return items;

  }

};
