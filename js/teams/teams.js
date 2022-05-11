var typed = new Typed('.typed', {
    strings: ["Թիմեր"],
    typeSpeed: 100
  });
  new WOW().init();
//   wc top scorers

// team quiz
/* Իրադարձություններ */

// drag - երբ draggable տարրը շարժում ենք տեղից
// dragstart - սկիզբ, փրբ սկսում է գործընթացը
// dragend - ավարտ՝ հաջողությամբ կամ հակառակը
// dragenter - երբ տեղափոխվող տարրը հայտնվում է իր թիրախում
// dragleave - երբ տեղափոխվող տարրը լքում է իր թիրախը
// dragover - երբ տեղափոխվող տարրը գտնվում է իր թիրախի վրա
// drop - երբ տեղափոխվող տարրը բաց է թողնվում իր թիրախում

let score = 0;
let of = 3;

const resultRow = $('#resultRow');
const resultRowEl = $('#resultRow')[0];
const barca = $('#barca');
const chelsea = $('#chelsea');
const orlandocity = $('#orlandocity');

const gullit = $('#gullit');
const kaka = $('#kaka');
const bojan = $('#bojan');

    function handleDragStart(evt) {
      // console.log(this.getAttribute("dragable"));
      //   if(this.getAttribute("dragable") == true) {
          this.style.opacity = '0.88';
          // https://msdn.microsoft.com/library/ms533743(v=vs.85).aspx
          evt.dataTransfer.effectAllowed = 'link';
          // set data
          evt.dataTransfer.setData('Text', this.id);
        // } else {
        //   return 0;
        // }
    }

    function handleDragOver(evt) {
        // կասեցնում ենք բրաուզերի ստանդարտ գործողությունները
        if (evt.preventDefault) evt.preventDefault();
        return false;
    }

    function handleDragEnter(evt) {
        this.style.transform = 'scale(1.2)';//
    }

    function handleDragLeave(evt) {
        this.style.transform = 'scale(1)';
    }
    function handleDragEnd(evt) {
        this.style.opacity = '1';
    }

    function handleDrop(evt) {
        // կասեցնում ենք բրաուզերի ստանդարտ գործողությունները
        if (evt.preventDefault) evt.preventDefault();
        if (evt.stopPropagation) evt.stopPropagation();
        let plNum;

        this.style.opacity = '1';
        this.style.transform = 'scale(1)';
        // վերցնում ենք ստացված տվյալները
        var id = evt.dataTransfer.getData('Text');
        var elem = document.getElementById(id);
        // վերցնում ենք տեղափոխված տարրն իր նախկին դիրքից և տեղադրում ենք իր թիրախում
        if(this.classList.contains('dropped')) {
          return false;
        } else {
          this.appendChild(elem);
          this.classList.add('dropped');
        }
        
        let thisId = this.children[0].id;
        // console.log(thisId);
        if (thisId == 'gullit') {
          plNum = 1;
        } else if(thisId == 'kaka') {
          plNum = 2
        } else if(thisId == 'bojan') {
          plNum = 3;
        }
        if(resultRow[0].children[0].children.length === 0 && resultRow[0].children[1].children.length === 0 && resultRow[0].children[2].children.length === 0) {
            if(barca.has(bojan).length) {
                score+=1;
            }
            if(orlandocity.has(kaka).length) {
                score+=1;
            }
            if(chelsea.has(gullit).length) {
                score+=1;
            }
            resultRowEl.innerHTML = `Ձեր արդյունքը - ${score} / ${of}`;
        }


        // console.log(this.children);
        // console.log(elem);
        // console.log(this.children[0].id);
        
        $(`#${thisId}`).prop("draggable", false);
        
        // console.log(this.children[0].attributes.draggable);
        return false;
    }
    let players = document.querySelectorAll('.player');
  players.forEach(function(player) {
    player.addEventListener('dragstart', handleDragStart, false);
    player.addEventListener('dragend', handleDragEnd, false);
  });
  let clubs = document.querySelectorAll('.club');
  clubs.forEach(function(club) {
      club.addEventListener('dragover', handleDragOver, false);
      club.addEventListener('dragenter', handleDragEnter, false);
      club.addEventListener('dragleave', handleDragLeave, false);
      club.addEventListener('drop', handleDrop, false);
  });

  // players.forEach(function(player) {
  //   player.addEventListener('touchstart', handleDragStart, false);
  //   player.addEventListener('touchend', handleDragEnd, false);
  // });
  // clubs.forEach(function(club) {
  //   club.addEventListener('touchcancel', handleDragOver, false);
  //   club.addEventListener('touchmove', handleDragStart, false);
  //   club.addEventListener('touchleave', handleDragLeave, false);
  // });
    


let loadMoreWCNum = 5;
function loadMoreWC(loadMoreWCNum) {
  $.getJSON( "js/json/wc_top_scorers.json", function(data) {
    let wcTable = '<tr><th>Նկար</th><th>Անուն</th><th>Թիմ</th><th>Խաղեր</th><th>Գոլեր</th><th>11 մ.</th><th>Ø</th></tr>';
    $.each(data, function(key, value) {
        let goalRatio = (value.goals / value.games).toFixed(2);
        wcTable += '<tr>';
        if(value.img != '') {
          wcTable += `<td><img class="table_img" src="img/wc_top_scorers/${value.img}" alt=""></td>`;
        } else {
          wcTable += `<td><img class="table_img" src="img/wc_top_scorers/no_photo.jpg" alt=""></td>`;
        }
        wcTable += `<td>${value.name}</td>`;
        wcTable += `<td>${value.team}</td>`;
        wcTable += `<td>${value.games}</td>`;
        wcTable += `<td>${value.goals}</td>`;
        wcTable += `<td>${value.penalties}</td>`;
        wcTable += `<td>${goalRatio}</td>`;
        wcTable += '</tr>';
        if (value.id >= loadMoreWCNum) {
          return false;
        }
      });
      $('.wc_table').html(wcTable);
  });
}
loadMoreWC(loadMoreWCNum);

$(".load_more_wc").click(function (loadMoreWCNum) {
  if($(".load_more_wc i").hasClass('fa-chevron-down')) {
    $(".load_more_wc i").removeClass('fa-chevron-down');
    $(".load_more_wc i").addClass('fa-circle-notch');
    $(".load_more_wc i").addClass('fa-spin');
  } else {
    $(".load_more_wc i").removeClass('fa-circle-notch');
    $(".load_more_wc i").removeClass('fa-spin');
    $(".load_more_wc i").addClass('fa-chevron-down');
  }
  setTimeout(function(){
    let loadMoreWCNew = loadMoreWCNum += 5;
    loadMoreWC(loadMoreWCNew);
    $('.load_more_wc').hide();
    var toGSLoad = $(".wc_top_scorers table tr:nth-child(6)");
    var toGSLoadOffset = toGSLoad.offset();
    $('html, body').animate({scrollTop: toGSLoadOffset.top}, 1000);
   }, 1500);
  });


// scroll
var body = $("html, body");
var toTop = $(".scroll_top");
var toTopOffset = toTop.offset();
$('.scroll_button').click(function() {
body.stop().animate({scrollTop: toTopOffset.top}, 1000, 'swing', function() { 
    onScroll();
});
$(document).on("scroll", onScroll);
});

$(document).on("scroll", onScroll);
$(window).scroll(function() {
if($(document).scrollTop() > 100) {
    $('.header').addClass('affix');
    $('.scroll_button').addClass('scroll_vis');
    $('.scroll_button').removeClass('scroll_hid');
} else {
    $('.header').removeClass('affix');
    $('.scroll_button').removeClass('scroll_vis');
    $('.scroll_button').addClass('scroll_hid');
}
});

$('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var currLink = $(this);
    $(document).off("scroll");
    var target = this.hash,
        menu = target;
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop': $target.offset().top/*-65*/
    }, 700, 'swing', function () {
        if($(".ulmenu a")[0]){
            $('.ulmenu a').removeClass("a_active");
        }
        currLink.addClass("a_active");
        window.location.hash = target;
        $(document).on("scroll", onScroll);
        if($('#hb').prop('checked') == true) {
            $('#hb').prop('checked',false);
        }
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.ulmenu a').each(function () {
        var currLink = $(this);
        // if(typeof(refElement) != "undefined" && refElement !== null) {
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              if($(".ulmenu a.a_active")[0]){
              $('.ulmenu a.a_active').removeClass("a_active");
              }
              currLink.addClass("a_active");
          } else{
              if($(".a_active")[0]){
              currLink.removeClass("a_active");
              }
          }
        // }
    });
}


// swipebox
$( '.swipebox' ).swipebox();

// hymn_player
"use strict";

const options = {
  defaultSpeed: '1.00',
  speeds: ['1.25','1.50', '2.00', '0.75'],
  loop: true,
  skipBackInterval: 15,
  jumpForwardInterval: 15,
  features: [
    "playpause",
    "progress",
    "current",
    "duration",
    "skipback",
    "changespeed",
    "volume",
    "jumpforward",
  ]
}

new MediaElementPlayer(
  document.querySelector("audio"),
  options
 );

// Separate the audio controls so I can style them better.
(() => {
	const elementTop = document.createElement('div');
  const elementBottom = document.createElement('div');
	elementTop.classList.add('mejs-prepended-buttons');
  elementBottom.classList.add('mejs-appended-buttons');

	const controls = document.querySelector('.mejs__controls');
  if(typeof(controls) != "undefined" && controls !== null) {
	controls.prepend(elementTop);
  controls.append(elementBottom);
  
	const controlsChildren = Array.from(controls.childNodes).filter(v => v.className.startsWith("mejs_"));

  controlsChildren.slice(0, 3).forEach(elem => {
     elementTop.append(elem)
  });
  
  controlsChildren.slice(3, controlsChildren.length).forEach(elem => {
    elementBottom.append(elem)
  })
}
})();



// swiper
var swiper = new Swiper('.blog-slider', {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: '.blog-slider__pagination',
      clickable: true,
    }
  });

  // FLIP CARDS
  var $cards = $('.card-object'),
    $faceButtons = $('.face');

$faceButtons.on('click', flipCard);

function flipCard(event) {
  event.preventDefault();
  
  var $btnFace = $(this),
      $card = $btnFace.parent('.card-object');
  
  if( $card.hasClass('flip-in') ) {
    closeCards();
  } else {
    closeCards();
    openCard($card);
  }
  
}

function closeCards() {
  $cards.each( function() {
    $(this)
      .filter('.flip-in')
      .removeClass('flip-in')
      .queue( function() {
        // Force reflow hack
        var reflow = this.offsetHeight;
        $(this)
          .addClass('flip-out')
          .dequeue();
      })
      
  });
}

function openCard($card) {
  $card
    .removeClass('flip-out')
    .queue( function() {
      // Force reflow hack
      var reflow = this.offsetHeight;
      $(this)
        .addClass('flip-in')
        .dequeue();
    });
    
}


//   best goalscorers
let loadMoreGSNum = 5;
function loadMoreGS(loadMoreGSNum) {
  $.getJSON( "js/json/best_goalscorers.json", function(data) {

    let gsTable = '<tr><th>Նկար</th><th>Անուն</th><th>Ազգություն</th><th>Խաղեր</th><th>Գոլեր</th><th>Ø</th><th>Հավաքական</th></tr>';
    $.each(data, function(key, value) {
        let gRatio = (value.goals / value.games).toFixed(2);
        gsTable += '<tr>';
        if(value.img != '') {
          gsTable += `<td><img class="table_img" src="img/gs_top_scorers/${value.img}" alt=""></td>`;
        } else {
          gsTable += `<td><img class="table_img" src="img/gs_top_scorers/no_photo.jpg" alt=""></td>`;
        }

        gsTable += `<td>${value.name}</td>`;
        gsTable += `<td>${value.team}</td>`;
        gsTable += `<td>${value.games}</td>`;
        gsTable += `<td>${value.goals}</td>`;
        gsTable += `<td>${gRatio}</td>`;
        gsTable += `<td>${value.nat_team_goals}</td>`;
        gsTable += '</tr>';
        if (value.id >= loadMoreGSNum) {
          return false;
        }
      });
      $('.gscorer_table').html(gsTable);
  });
}
loadMoreGS(loadMoreGSNum);

$(".load_more_gs").click(function (loadMoreGSNum) {
  if($(".load_more_gs i").hasClass('fa-chevron-down')) {
    $(".load_more_gs i").removeClass('fa-chevron-down');
    $(".load_more_gs i").addClass('fa-circle-notch');
    $(".load_more_gs i").addClass('fa-spin');
  } else {
    $(".load_more_gs i").removeClass('fa-circle-notch');
    $(".load_more_gs i").removeClass('fa-spin');
    $(".load_more_gs i").addClass('fa-chevron-down');
  }
  setTimeout(function(){
    let loadMoreGSNew = loadMoreGSNum += 5;
    console.log(loadMoreGSNew);
    loadMoreGS(loadMoreGSNew);
    $('.load_more_gs').hide();
    var toGSLoad = $(".gscorer_table tr:nth-child(6)");
    var toGSLoadOffset = toGSLoad.offset();
    $('html, body').animate({scrollTop: toGSLoadOffset.top}, 1000);
   }, 1500);
   
  });

  // YMAPS in Modal

  ymaps.ready(init);
var myMap;
function init () {

        if (!navigator.geolocation) {
            initMapWithoutLocation();
        } 
        function success(position) {
          ourLatitude = position.coords.latitude;
          ourLongitude = position.coords.longitude;
          initMapWithGeolocation(ourLatitude,ourLongitude);      
        }// end success
        navigator.geolocation.getCurrentPosition(success, failure);
function initMapWithGeolocation(ourLatitude, ourLongitude) {
// Call the function with the function names for success or failure


    // Создаем модель мультимаршрута.
    var multiRouteModel = new ymaps.multiRouter.MultiRouteModel([
      [ourLatitude, ourLongitude],
      "Mamikonyants Street, 52"
  ], {
      // Путевые точки можно перетаскивать.
      // Маршрут при этом будет перестраиваться.
      wayPointDraggable: true,
      boundsAutoApply: true
  }),

  // Создаём выпадающий список для выбора типа маршрута.
  routeTypeSelector = new ymaps.control.ListBox({
      data: {
          content: 'Ինչպե՞ս հասնել'
      },
      items: [
          new ymaps.control.ListBoxItem({data: {content: "Մեքենայով"},state: {selected: true}}),
          new ymaps.control.ListBoxItem({data: {content: "Հասարակական տրանսպորտով"}}),
          new ymaps.control.ListBoxItem({data: {content: "Ոտքով"}})
      ],
      options: {
          itemSelectOnClick: false
      }
  }),
  // Получаем прямые ссылки на пункты списка.
  autoRouteItem = routeTypeSelector.get(0),
  masstransitRouteItem = routeTypeSelector.get(1),
  pedestrianRouteItem = routeTypeSelector.get(2);

// Подписываемся на события нажатия на пункты выпадающего списка.
autoRouteItem.events.add('click', function (e) { changeRoutingMode('auto', e.get('target')); });
masstransitRouteItem.events.add('click', function (e) { changeRoutingMode('masstransit', e.get('target')); });
pedestrianRouteItem.events.add('click', function (e) { changeRoutingMode('pedestrian', e.get('target')); });

ymaps.modules.require([
  'MultiRouteCustomView'
], function (MultiRouteCustomView) {
  // Создаем экземпляр текстового отображения модели мультимаршрута.
  // см. файл custom_view.js
  new MultiRouteCustomView(multiRouteModel);
});


// Создаем карту с добавленной на нее кнопкой.
  myMap = new ymaps.Map('map', {
      zoom: 11,
      center: [ourLatitude, ourLongitude],
      // center: [40.0875078, 44.4827548],
      controls: [routeTypeSelector]
  }, {
      buttonMaxWidth: 300,
      minZoom: 11,
      maxZoom: 11
  }),

  // Создаем на основе существующей модели мультимаршрут.
  multiRoute = new ymaps.multiRouter.MultiRoute(multiRouteModel, {
      // Путевые точки можно перетаскивать.
      // Маршрут при этом будет перестраиваться.
      wayPointDraggable: true,
      boundsAutoApply: true
  });


// Добавляем мультимаршрут на карту.
myMap.geoObjects.add(multiRoute);

function changeRoutingMode(routingMode, targetItem) {
  multiRouteModel.setParams({ routingMode: routingMode }, true);

  // Отменяем выбор элементов.
  autoRouteItem.deselect();
  masstransitRouteItem.deselect();
  pedestrianRouteItem.deselect();

  // Выбираем элемент и закрываем список.
  targetItem.select();
  routeTypeSelector.collapse();
}

}
function initMapWithoutGeolocation() {
  // alert("Այս բրաուզերը չի սպասարկում Geolocation:");
  var myMap = new ymaps.Map('map', {
    center: [40.209875, 44.513463],
    zoom: 19
}, {
    searchControlProvider: 'yandex#search'
}),

// Создаём макет содержимого.
MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
),


myPlacemarkWithContent = new ymaps.Placemark([40.209875, 44.513463], {
    hintContent: 'ԵԻՊՔ',
    balloonContent: 'Երևանի Ինֆորմատիկայի Պետական Քոլեջ',
    iconContent: ''
}, {
    // Опции.
    // Необходимо указать данный тип макета.
    iconLayout: 'default#imageWithContent',
    // Своё изображение иконки метки.
    iconImageHref: '../img/eipq_logo.png',
    // Размеры метки.
    iconImageSize: [33, 33],
    // Смещение левого верхнего угла иконки относительно
    // её "ножки" (точки привязки).
    iconImageOffset: [-30, -30],
    // Смещение слоя с содержимым относительно слоя с картинкой.
    iconContentOffset: [15, 15],
    // Макет содержимого.
    iconContentLayout: MyIconContentLayout
});

myMap.geoObjects
.add(myPlacemarkWithContent);
}

function failure()
{
  initMapWithoutGeolocation();
}// end failure
}
    

// CUSTOM
ymaps.modules.define('MultiRouteCustomView', [
    'util.defineClass'
], function (provide, defineClass) {
    // Класс простого текстового отображения модели мультимаршрута.
    function CustomView (multiRouteModel) {
        this.multiRouteModel = multiRouteModel;
        // Объявляем начальное состояние.
        this.state = "init";
        this.stateChangeEvent = null;
        // Элемент, в который будет выводиться текст.
        this.outputElement = $('<div></div>').appendTo('#viewContainer');

        this.rebuildOutput();

        // Подписываемся на события модели, чтобы
        // обновлять текстовое описание мультимаршрута.
        multiRouteModel.events
            .add(["requestsuccess", "requestfail", "requestsend"], this.onModelStateChange, this);
    }

    // Таблица соответствия идентификатора состояния имени его обработчика.
    CustomView.stateProcessors = {
        init: "processInit",
        requestsend: "processRequestSend",
        requestsuccess: "processSuccessRequest",
        requestfail: "processFailRequest"
    };

    // Таблица соответствия типа маршрута имени его обработчика.
    CustomView.routeProcessors = {
        "driving": "processDrivingRoute",
        "masstransit": "processMasstransitRoute",
        "pedestrian": "processPedestrianRoute"
    };

    defineClass(CustomView, {
        // Обработчик событий модели.
        onModelStateChange: function (e) {
            // Запоминаем состояние модели и перестраиваем текстовое описание.
            this.state = e.get("type");
            this.stateChangeEvent = e;
            this.rebuildOutput();
        },

        rebuildOutput: function () {
            // Берем из таблицы обработчик для текущего состояния и исполняем его.
            var processorName = CustomView.stateProcessors[this.state];
            this.outputElement.html(
                this[processorName](this.multiRouteModel, this.stateChangeEvent)
            );
        },

        processInit: function () {
            return "Նախնականացում...";
        },

        processRequestSend: function () {
            return "Տվյալների հարցում...";
        },

        processSuccessRequest: function (multiRouteModel, e) {
            var routes = multiRouteModel.getRoutes(),
                result = ["Տվյալները հաջողությամբ ստացվեցին:"];
            if (routes.length) {
                result.push("Ընդհանուր երթուղիներ - " + routes.length + ":");
                for (var i = 0, l = routes.length; i < l; i++) {
                    result.push(this.processRoute(i, routes[i]));
                }
            } else {
                result.push("Երթուղիներ չկան։");
            }
            return result.join("<br/>");
        },

        processFailRequest: function (multiRouteModel, e) {
            return e.get("error").message;
        },

        processRoute: function (index, route) {
            // Берем из таблицы обработчик для данного типа маршрута и применяем его.
            var processorName = CustomView.routeProcessors[route.properties.get("type")];
            return (index + 1) + ". " + this[processorName](route);
        },

        processDrivingRoute: function (route) {
            var result = ["Ավտոմեքենայի երթուղի:"];
            result.push(this.createCommonRouteOutput(route));
            return result.join("<br/>");
        },

        processMasstransitRoute: function (route) {
            var result = ["Հասարակական տրանսպորտի երթուղի:"];
            result.push(this.createCommonRouteOutput(route));
            result.push("Երթուղու նկարագրությունը - <ul>" + this.createMasstransitRouteOutput(route) + "</ul>");
            return result.join("<br/>");
        },

        processPedestrianRoute: function (route) {
            var result = ["Քայլելու երթուղի:"];
            result.push(this.createCommonRouteOutput(route));
            return result.join("<br/>");
        },

        // Метод, формирующий общую часть описания для всех типов маршрутов.
        createCommonRouteOutput: function (route) {
            let distance = route.properties.get("distance").text.replace("км", "կմ");
            let duration = route.properties.get("duration").text.replace("мин.", "րոպե");
            duration = duration.replace("ч", "ժամ");
            return `Երթուղու երկարությունը - ${distance} <br/>
                Ճամփորդության ժամանակը - ${duration}`;
        },

        // Метод, строящий список текстовых описаний для
        // всех сегментов маршрута на общественном транспорте.
        createMasstransitRouteOutput: function (route) {
            var result = [];
            for (var i = 0, l = route.getPaths().length; i < l; i++) {
                var path = route.getPaths()[i];
                for (var j = 0, k = path.getSegments().length; j < k; j++) {
                    result.push("<li>" + path.getSegments()[j].properties.get("text") + "</li>");
                }
            }
            for(let k = 0; k < result.length; k++) {
                result[k] = result[k].replace("мин в пути", "րոպե ճանապարհին");
                result[k] = result[k].replace("км", "կմ");
                result[k] = result[k].replace("м", "մ");
                result[k] = result[k].replace(/№№/gi, "№");
                result[k] = result[k].replace(/\n/gi, " - ");
                result[k] = result[k].replace("Автобусы", "Ավտոբուսներ");
                result[k] = result[k].replace("Автобус", "Ավտոբուս");
                result[k] = result[k].replace("Маршрутки", "Միկրոավտոբուսներ");
                result[k] = result[k].replace("Маршрутка", "Միկրոավտոբուս");
                result[k] = result[k].replace("Троллейбусы", "Տրոլեյբուսներ");
                result[k] = result[k].replace("Троллейбус", "Տրոլեյբուս");
            }
            return result.join("");
        },

        destroy: function () {
            this.outputElement.remove();
            this.multiRouteModel.events
                .remove(["requestsuccess", "requestfail", "requestsend"], this.onModelStateChange, this);
        }
    });

    provide(CustomView);
});

parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"SLYU":[function(require,module,exports) {
    var define;
    var global = arguments[3];
    var e,t=arguments[3];function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(t,n){"object"===("undefined"==typeof exports?"undefined":o(exports))&&"undefined"!=typeof module?module.exports=n():"function"==typeof e&&e.amd?e(n):(t=t||self).MicroModal=n()}(this,function(){"use strict";function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function t(e){return function(e){if(Array.isArray(e))return o(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return o(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,n=new Array(t);o<t;o++)n[o]=e[o];return n}var n,i,r,a,s,l=(n=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],i=function(){function o(e){var n=e.targetModal,i=e.triggers,r=void 0===i?[]:i,a=e.onShow,s=void 0===a?function(){}:a,l=e.onClose,c=void 0===l?function(){}:l,d=e.openTrigger,u=void 0===d?"data-micromodal-trigger":d,f=e.closeTrigger,h=void 0===f?"data-micromodal-close":f,m=e.openClass,v=void 0===m?"is-open":m,g=e.disableScroll,y=void 0!==g&&g,b=e.disableFocus,p=void 0!==b&&b,w=e.awaitCloseAnimation,E=void 0!==w&&w,k=e.awaitOpenAnimation,M=void 0!==k&&k,C=e.debugMode,A=void 0!==C&&C;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),this.modal=document.getElementById(n),this.config={debugMode:A,disableScroll:y,openTrigger:u,closeTrigger:h,openClass:v,onShow:s,onClose:c,awaitCloseAnimation:E,awaitOpenAnimation:M,disableFocus:p},r.length>0&&this.registerTriggers.apply(this,t(r)),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)}var i,r,a;return i=o,(r=[{key:"registerTriggers",value:function(){for(var e=this,t=arguments.length,o=new Array(t),n=0;n<t;n++)o[n]=arguments[n];o.filter(Boolean).forEach(function(t){t.addEventListener("click",function(t){return e.showModal(t)})})}},{key:"showModal",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(this.activeElement=document.activeElement,this.modal.setAttribute("aria-hidden","false"),this.modal.classList.add(this.config.openClass),this.scrollBehaviour("disable"),this.addEventListeners(),this.config.awaitOpenAnimation){this.modal.addEventListener("animationend",function t(){e.modal.removeEventListener("animationend",t,!1),e.setFocusToFirstNode()},!1)}else this.setFocusToFirstNode();this.config.onShow(this.modal,this.activeElement,t)}},{key:"closeModal",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this.modal;if(this.modal.setAttribute("aria-hidden","true"),this.removeEventListeners(),this.scrollBehaviour("enable"),this.activeElement&&this.activeElement.focus&&this.activeElement.focus(),this.config.onClose(this.modal,this.activeElement,e),this.config.awaitCloseAnimation){var o=this.config.openClass;this.modal.addEventListener("animationend",function e(){t.classList.remove(o),t.removeEventListener("animationend",e,!1)},!1)}else t.classList.remove(this.config.openClass)}},{key:"closeModalById",value:function(e){this.modal=document.getElementById(e),this.modal&&this.closeModal()}},{key:"scrollBehaviour",value:function(e){if(this.config.disableScroll){var t=document.querySelector("body");switch(e){case"enable":Object.assign(t.style,{overflow:""});break;case"disable":Object.assign(t.style,{overflow:"hidden"})}}}},{key:"addEventListeners",value:function(){this.modal.addEventListener("touchstart",this.onClick),this.modal.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)}},{key:"removeEventListeners",value:function(){this.modal.removeEventListener("touchstart",this.onClick),this.modal.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)}},{key:"onClick",value:function(e){e.target.hasAttribute(this.config.closeTrigger)&&this.closeModal(e)}},{key:"onKeydown",value:function(e){27===e.keyCode&&this.closeModal(e),9===e.keyCode&&this.retainFocus(e)}},{key:"getFocusableNodes",value:function(){var e=this.modal.querySelectorAll(n);return Array.apply(void 0,t(e))}},{key:"setFocusToFirstNode",value:function(){var e=this;if(!this.config.disableFocus){var t=this.getFocusableNodes();if(0!==t.length){var o=t.filter(function(t){return!t.hasAttribute(e.config.closeTrigger)});o.length>0&&o[0].focus(),0===o.length&&t[0].focus()}}}},{key:"retainFocus",value:function(e){var t=this.getFocusableNodes();if(0!==t.length)if(t=t.filter(function(e){return null!==e.offsetParent}),this.modal.contains(document.activeElement)){var o=t.indexOf(document.activeElement);e.shiftKey&&0===o&&(t[t.length-1].focus(),e.preventDefault()),!e.shiftKey&&t.length>0&&o===t.length-1&&(t[0].focus(),e.preventDefault())}else t[0].focus()}}])&&e(i.prototype,r),a&&e(i,a),o}(),r=null,a=function(e){if(!document.getElementById(e))return console.warn("MicroModal: ❗Seems like you have missed %c'".concat(e,"'"),"background-color: #f8f9fa;color: #50596c;font-weight: bold;","ID somewhere in your code. Refer example below to resolve it."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<div class="modal" id="'.concat(e,'"></div>')),!1},s=function(e,t){if(function(e){if(e.length<=0)console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'","background-color: #f8f9fa;color: #50596c;font-weight: bold;","data attribute."),console.warn("%cExample:","background-color: #f8f9fa;color: #50596c;font-weight: bold;",'<a href="#" data-micromodal-trigger="my-modal"></a>')}(e),!t)return!0;for(var o in t)a(o);return!0},{init:function(e){var o=Object.assign({},{openTrigger:"data-micromodal-trigger"},e),n=t(document.querySelectorAll("[".concat(o.openTrigger,"]"))),a=function(e,t){var o=[];return e.forEach(function(e){var n=e.attributes[t].value;void 0===o[n]&&(o[n]=[]),o[n].push(e)}),o}(n,o.openTrigger);if(!0!==o.debugMode||!1!==s(n,a))for(var l in a){var c=a[l];o.targetModal=l,o.triggers=t(c),r=new i(o)}},show:function(e,t){var o=t||{};o.targetModal=e,!0===o.debugMode&&!1===a(e)||(r&&r.removeEventListeners(),(r=new i(o)).showModal())},close:function(e){e?r.closeModalById(e):r.closeModal()}});return window.MicroModal=l,l});
    },{}],"bAmi":[function(require,module,exports) {
    var global = arguments[3];
    var e=arguments[3],t="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},a=function(){var e=/\blang(?:uage)?-(\w+)\b/i,a=0,n=t.Prism={manual:t.Prism&&t.Prism.manual,util:{encode:function(e){return e instanceof r?new r(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++a}),e.__id},clone:function(e){switch(n.util.type(e)){case"Object":var t={};for(var a in e)e.hasOwnProperty(a)&&(t[a]=n.util.clone(e[a]));return t;case"Array":return e.map(function(e){return n.util.clone(e)})}return e}},languages:{extend:function(e,t){var a=n.util.clone(n.languages[e]);for(var r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){var i=(r=r||n.languages)[e];if(2==arguments.length){for(var s in a=arguments[1])a.hasOwnProperty(s)&&(i[s]=a[s]);return i}var l={};for(var o in i)if(i.hasOwnProperty(o)){if(o==t)for(var s in a)a.hasOwnProperty(s)&&(l[s]=a[s]);l[o]=i[o]}return n.languages.DFS(n.languages,function(t,a){a===r[e]&&t!=e&&(this[t]=l)}),r[e]=l},DFS:function(e,t,a,r){for(var i in r=r||{},e)e.hasOwnProperty(i)&&(t.call(e,i,e[i],a||i),"Object"!==n.util.type(e[i])||r[n.util.objId(e[i])]?"Array"!==n.util.type(e[i])||r[n.util.objId(e[i])]||(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,i,r)):(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,null,r)))}},plugins:{},highlightAll:function(e,t){var a={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var r,i=a.elements||document.querySelectorAll(a.selector),s=0;r=i[s++];)n.highlightElement(r,!0===e,a.callback)},highlightElement:function(a,r,i){for(var s,l,o=a;o&&!e.test(o.className);)o=o.parentNode;o&&(s=(o.className.match(e)||[,""])[1].toLowerCase(),l=n.languages[s]),a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+s,o=a.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+s);var u={element:a,language:s,grammar:l,code:a.textContent};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return u.code&&(n.hooks.run("before-highlight",u),u.element.textContent=u.code,n.hooks.run("after-highlight",u)),void n.hooks.run("complete",u);if(n.hooks.run("before-highlight",u),r&&t.Worker){var g=new Worker(n.filename);g.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,i&&i.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},g.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,i&&i.call(a),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,a){var i=n.tokenize(e,t);return r.stringify(n.util.encode(i),a)},matchGrammar:function(e,t,a,r,i,s,l){var o=n.Token;for(var u in a)if(a.hasOwnProperty(u)&&a[u]){if(u==l)return;var g=a[u];g="Array"===n.util.type(g)?g:[g];for(var c=0;c<g.length;++c){var p=g[c],d=p.inside,h=!!p.lookbehind,m=!!p.greedy,f=0,y=p.alias;if(m&&!p.pattern.global){var k=p.pattern.toString().match(/[imuy]*$/)[0];p.pattern=RegExp(p.pattern.source,k+"g")}p=p.pattern||p;for(var b=r,v=i;b<t.length;v+=t[b].length,++b){var w=t[b];if(t.length>e.length)return;if(!(w instanceof o)){p.lastIndex=0;var S=1;if(!(P=p.exec(w))&&m&&b!=t.length-1){if(p.lastIndex=v,!(P=p.exec(e)))break;for(var x=P.index+(h?P[1].length:0),A=P.index+P[0].length,j=b,O=v,F=t.length;F>j&&(A>O||!t[j].type&&!t[j-1].greedy);++j)x>=(O+=t[j].length)&&(++b,v=O);if(t[b]instanceof o||t[j-1].greedy)continue;S=j-b,w=e.slice(v,O),P.index-=v}if(P){h&&(f=P[1].length);A=(x=P.index+f)+(P=P[0].slice(f)).length;var P,N=w.slice(0,x),C=w.slice(A),B=[b,S];N&&(++b,v+=N.length,B.push(N));var $=new o(u,d?n.tokenize(P,d):P,y,P,m);if(B.push($),C&&B.push(C),Array.prototype.splice.apply(t,B),1!=S&&n.matchGrammar(e,t,a,b,v,!0,u),s)break}else if(s)break}}}}},tokenize:function(e,t){var a=[e],r=t.rest;if(r){for(var i in r)t[i]=r[i];delete t.rest}return n.matchGrammar(e,a,t,0,0,!1),a},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(t)}}},r=n.Token=function(e,t,a,n,r){this.type=e,this.content=t,this.alias=a,this.length=0|(n||"").length,this.greedy=!!r};if(r.stringify=function(e,t,a){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(a){return r.stringify(a,t,e)}).join("");var i={type:e.type,content:r.stringify(e.content,t,a),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:a};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var s="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,s)}n.hooks.run("wrap",i);var l=Object.keys(i.attributes).map(function(e){return e+'="'+(i.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(l?" "+l:"")+">"+i.content+"</"+i.tag+">"},!t.document)return t.addEventListener?(t.addEventListener("message",function(e){var a=JSON.parse(e.data),r=a.language,i=a.code,s=a.immediateClose;t.postMessage(n.highlight(i,n.languages[r],r)),s&&t.close()},!1),t.Prism):t.Prism;var i=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return i&&(n.filename=i.src,n.manual||i.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),t.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=a),void 0!==e&&(e.Prism=a),a.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\s\S])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\s\S]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},a.languages.markup.tag.inside["attr-value"].inside.entity=a.languages.markup.entity,a.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),a.languages.xml=a.languages.markup,a.languages.html=a.languages.markup,a.languages.mathml=a.languages.markup,a.languages.svg=a.languages.markup,a.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:{pattern:/("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},a.languages.css.atrule.inside.rest=a.util.clone(a.languages.css),a.languages.markup&&(a.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:a.languages.css,alias:"language-css"}}),a.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:a.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:a.languages.css}},alias:"language-css"}},a.languages.markup.tag)),a.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},a.languages.javascript=a.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,function:/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),a.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),a.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:a.languages.javascript}},string:/[\s\S]+/}}}),a.languages.markup&&a.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:a.languages.javascript,alias:"language-javascript"}}),a.languages.js=a.languages.javascript;
    },{}],"g2Hq":[function(require,module,exports) {
    "use strict";var e=o(require("../../../lib/dist/micromodal"));function o(e){return e&&e.__esModule?e:{default:e}}require("./prism"),e.default.init({openTrigger:"data-custom-open",disableScroll:!1,awaitCloseAnimation:!0}),document.querySelector(".js-modal-trigger").addEventListener("click",function(o){e.default.show("modal-2",{debugMode:!0,disableScroll:!0,onShow:function(e){document.querySelector(".js-body").classList.add(e.id)},onClose:function(e){document.querySelector(".js-body").classList.remove(e.id)},closeTrigger:"data-custom-close",awaitCloseAnimation:!0})}),document.querySelector(".js-modal-close-trigger").addEventListener("click",function(o){o.preventDefault(),e.default.close("modal-2")});var t=document.querySelectorAll(".heading"),l={};Array.prototype.forEach.call(t,function(e){l[e.id]=e.offsetTop}),window.onscroll=function(){var e=document.documentElement.scrollTop||document.body.scrollTop;for(t in l)l[t]<=e&&(document.querySelector(".active").classList.remove("blue","fw6","active"),document.querySelector("a[href*="+t+"]").classList.add("blue","fw6","active"))};
    },{"../../../lib/dist/micromodal":"SLYU","./prism":"bAmi"}]},{},["g2Hq"], null)
    //# sourceMappingURL=/scripts.12661ea5.js.map
      
    MicroModal.init();