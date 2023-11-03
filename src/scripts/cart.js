;(function () {
   const cartList = document.querySelector('.normal-cart__list');
   const cartClear = document.querySelector('.normal-cart__clear');
   const totalCostMark = Array.from(document.querySelectorAll('.total-cost'));
   const totalAmountMark = Array.from(document.querySelectorAll('.total-amount'));
   const totalAmountGoodsMark = Array.from(document.querySelectorAll('.total-amount-goods'));
   const installationMark = document.querySelector('.total-installation');
   const installation = document.querySelector('.installation-goods__checkbox');
   const buttonSubmit = document.querySelector('#button-submit');

   let goods = [
      {
         id: 1,
         image: "G2H.png",
         name: "Вытяжное устройство G2H",
         desc: "12-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
         code: "G2H1065",
         amount: 1,
         price: 12644
      },{
         id: 2,
         image: "BXC.png",
         name: "Вытяжное устройство BXC",
         desc: "13-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
         code: "G2H1064",
         amount: 3,
         price: 13644
      },{
         id: 3,
         image: "GHN.png",
         name: "Вытяжное устройство GHN",
         desc: "14-72/168 м3/ч / гидрорегулируемый расход / от датчика присутствия",
         code: "G2H1063",
         amount: 1,
         price: 14644
      }
   ];
   let totalCost = (arr) => arr.reduce((sum, elem) => sum + (elem.price * elem.amount), 0);
   let totalAmount = (arr) => arr.reduce((sum, elem) => sum + elem.amount, 0);
   let itemCost = (elem) => (elem.price * elem.amount).toLocaleString();
   let displayPrice = (elem) => elem.amount < 2 ? 'carts-item__price--hiden' : '';
   
   displayGoods(goods);
   displayTotals(goods);


   function displayGoods(goodsArr) {
      cartList.innerHTML = '';

      goodsArr.forEach((item) => {
         let li = document.createElement('li');
         li.className = "carts-item normal-cart__item";
         li.setAttribute('data-index', `${item.id}`);

         li.insertAdjacentHTML('afterbegin', `<div class="carts-item__pic">
            <img src="./images/content/${item.image}" alt="товар ${item.name}" class="carts-item__img">
         </div>
         <div class="carts-item__desc">
            <div class="carts-item__name">${item.name}</div>
            <div class="carts-item__text">${item.desc}</div>
            <div class="carts-item__code">Артикул: ${item.code}</div>
         </div>
         <div class="carts-item__count">
            <div class="carts-item__counter">
               <div class="carts-item__btns">
                  <div class="carts-item__btn" data-action="decrement">
                     <div class="carts-item__btn-icon"></div>
                  </div>
                  <div class="carts-item__btn carts-item__amount">${item.amount}</div>
                  <div class="carts-item__btn" data-action="increment">
                     <div class="carts-item__btn-icon carts-item__btn-icon--plus"></div>
                  </div>
               </div>
               <div class="carts-item__price ${displayPrice(item)}">${item.price.toLocaleString()}&nbsp;&#8381;/шт.</div>
            </div>
            <div class="carts-item__cost">${itemCost(item)}&nbsp;&#8381;</div>
         </div>
         <div class="carts-item__remove"></div>`);

         cartList.append(li);
      });

      removeGoods();
      changeAmountGoods();
   }
      
   function displayTotals(goodsArr) {
      totalAmountMark.forEach((elem) => elem.innerHTML = `${totalAmount(goodsArr)}&nbsp;шт`);
      totalAmountGoodsMark.forEach((elem) => elem.innerHTML = `${goodsArr.length}&nbsp;товара`);
      totalCostMark.forEach((elem) => elem.innerHTML = `${totalCost(goodsArr).toLocaleString()}&nbsp;&#8381;`);
   }
   
   function removeGoods() {
      const cartsItemsRemove = Array.from(document.querySelectorAll('.carts-item__remove'));

      cartsItemsRemove.forEach((item) => {
         item.addEventListener('click', (e) => {
            let item = e.target.closest('.carts-item');
            goods = goods.filter(elem => elem.id !== +item.dataset.index);

            displayGoods(goods);
            displayTotals(goods);
         });
      });
   }

   function changeAmountGoods() {
      const itemsBtn = Array.from(document.querySelectorAll('.carts-item__btn'));

      itemsBtn.forEach((item) => {
         item.addEventListener('click', (e) => {
            const item = e.target.closest('.carts-item');
            const cartsItemAmount = item.querySelector('.carts-item__amount');
            const cartsItemPrice = item.querySelector('.carts-item__price');
            const cartsItemCost = item.querySelector('.carts-item__cost');
            
            goods.forEach((elem) => {
               if (elem.id === +item.dataset.index) {
                  const operation = e.currentTarget.dataset.action === 'increment' ? 1 : elem.amount > 0 ? -1 : 0;
                  const amount = elem.amount += operation;

                  cartsItemAmount.innerText = amount;
                  cartsItemCost.innerHTML = `${itemCost(elem)}&nbsp;&#8381;`;

                  if (elem.amount < 2) {
                     cartsItemPrice.classList.add('carts-item__price--hiden');
                  } else {
                     cartsItemPrice.classList.remove('carts-item__price--hiden');
                  }
                  
                  return amount;
               }
            });

            displayTotals(goods);
         });
      });
   }
   
   cartClear.addEventListener('click', () => {
      goods = [];
      displayGoods(goods);
      displayTotals(goods);
   });
   
   installation.addEventListener('change', () => {
      installationMark.innerText = installation.checked ? 'Да' : 'Нет';
   });
   
   buttonSubmit.addEventListener('click', () => {
      if (!goods.length) {
         alert('КОРЗИНА ПУСТА');
         return
      }

      const data = [...goods, {installation: installation.checked}];
      sendOrder(data);
   });

   async function sendOrder(data) {
      try {
         const response = await fetch(`https://jsonplaceholder.typicode.com/posts/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json;charset=utf-8'}
         });

         const json = await response.json();
         console.log(json);

         if (response.ok) {
            alert(`
              ЗАКАЗ ОТПРАВЛЕН 
              Товаров: ${totalAmount(goods)} шт.
              На сумму: ${totalCost(goods)} руб.
            `)
         } else {
            alert(`
              ОШИБКА!
              Повторите попытку позже
            `)
         }
      } catch (error) {
         throw new Error(`Ошибка ${error}`)
      }
   }
})()