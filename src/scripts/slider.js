const sliderList = document.querySelector('.slider__list');

let viewedGoods = [
   {
      id: 1,
      image: "BXC.png",
      name: "BXC",
      desc: "Вытяжное устройство для механической системы вентиляции",
      code: "G2H1064",
      amount: 1,
      minPrice: 1848,
      maxPrice: 36584
   },{
      id: 2,
      image: "G2H.png",
      name: "G2H",
      desc: "Многофункциональное вытяжное устройство для естественной и гибридной вентиляции",
      code: "G2H1065",
      amount: 1,
      minPrice: 2848,
      maxPrice: 46584
   },{
      id: 3,
      image: "GHN.png",
      name: "GHN",
      desc: "Вытяжное устройство с датчиком присутствия",
      code: "G2H1063",
      amount: 1,
      minPrice: 3848,
      maxPrice: 56584
   },{
      id: 4,
      image: "TDA.png",
      name: "TDA",
      desc: "Вытяжное устройство с датчиком присутствия",
      code: "G2H1062",
      amount: 1,
      minPrice: 4848,
      maxPrice: 66584
   },{
      id: 5,
      image: "G2H.png",
      name: "G2H-35F",
      desc: "Многофункциональное вытяжное устройство для естественной и гибридной вентиляции (с дополнениями)",
      code: "G2H1065",
      amount: 1,
      minPrice: 5848,
      maxPrice: 76584
   },{
      id: 6,
      image: "GHN.png",
      name: "GHN-49H",
      desc: "Вытяжное устройство с датчиком присутствия (с дополнениями)",
      code: "G2H1063",
      amount: 1,
      minPrice: 6848,
      maxPrice: 86584
   }
]

displayViewedGoods(viewedGoods);

function displayViewedGoods(goodsArr) {
   sliderList.innerHTML = '';

   goodsArr.forEach((item) => {
      let li = document.createElement('li');
      li.className = "slider__item swiper-slide";

      li.insertAdjacentHTML('afterbegin', `<div class="slider-item">
         <div class="slider-item__pic">
            <img src="./images/content/${item.image}" alt="товар ${item.name}" class="slider-item__img">
         </div>
         <div class="slider-item__desc">
            <div class="slider-item__name">${item.name}</div>
            <div class="slider-item__text">${item.desc}</div>
         </div>
         <div class="slider-item__price">
            <div class="slider-item__cost">
               ${item.minPrice.toLocaleString()}&nbsp;&#8381; – ${item.maxPrice.toLocaleString()}&nbsp;&#8381;
            </div>
            <div class="slider-item__currency">
               18,74&nbsp;&euro; – 370,97&nbsp;&euro;
            </div>
         </div>
         <button type="button" class="button button--blue slider-item__btn">Подробнее</button>
      </div>`);

      sliderList.append(li);
   });
}


const swiper = new Swiper('.slider__block', {
   loop: true,
   spaceBetween: 20,
   pagination: {
      el: '.slider__counter',
      type: 'fraction',
   },
   breakpoints: {
      576: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      992: { slidesPerView: 4 }
   },
   navigation: {
      nextEl: '.slider__btn-right ',
      prevEl: '.slider__btn-left',
   },
});
