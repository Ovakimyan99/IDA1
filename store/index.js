export default {
  state: {
    // CARD
    mountains: [],
    sortParams: {
      id: 1,
      sort: 'price'
    },

    //CATEGORY
    pageData: [],

    // BASKET
    basketData: [],
    basketView: false,
    basketFormGroup: false,
    userData: [],
    applicationSent: false
  },
  mutations: {
    //CARD
    SET_CARDS (state, payload) {
      state.mountains = [...state.mountains, ...payload]
    },
    SET_PAYLOAD_SORT (state, payload) { // передаем параметр сортировки, чтобы сортировать в actions
      state.sortParams.sort = payload
    },
    SET_PAYLOAD_ID (state, payload) {
      state.sortParams.id = payload
    },

    // CATEGORY
    SET_CATEGORY (state, payload) {
      state.pageData = [...payload]
    },

    //BASKET
    BASKET_PUSH_ITEM (state, { ...payload }) {
      let cardItem = { ...payload };

      // Находим карточку, которую передали в payload, если она есть
      const product = state.basketData.find((item) => item.id === cardItem.id);

      if (!!product) { // если есть, то увеличиваем счетчик
        product['counter'] += 1;
      } else { // если нет, то добавляем счетчик и кидаем карточку в общий массив карточек
        payload['counter'] = 1;
        state.basketData = [...state.basketData, payload]
      }
    },
    BASKET_DISPLAY (state, payload) { // открытие / закрытие модалки.
      state.basketView = payload;
    },
    BASKET_ITEM_DEL (state, target) { // удаляем товары из корзины
      let cardItem = target.closest('.basket-filling__item').id; // id карточки, взятая из DOM

      const product = state.basketData.find(item => item.id === +cardItem);

      if (product['counter'] > 1) {
        product['counter'] -= 1;
      } else {
        state.basketData.splice(state.basketData.indexOf(product), 1);
      }
    },
    BASKET_ITEM_COUNT (state) {
      // число отображающее количество элементов в корзине
      let selector = document.querySelector('[data-basket-number]');
      // число элементов в корзине
      let numberOfItemInBusket = state.basketData.reduce(function(result, item){
        return result + item.counter;
      }, 0);

      if (numberOfItemInBusket) {
        // если 0
        state.basketFormGroup = true
      } else {
        // если есть товары в корзине
        state.basketFormGroup = false
      }

      // выводим
      return selector.setAttribute('data-basket-number', numberOfItemInBusket);
    },
    FORM_COMMIT(state, payload) {
      state.userData = [...state.userData, payload]
      state.basketData.length = 0;
    },
    APPLICCATIN_SENT (state, payload) {
      state.applicationSent = payload
    }
  },
  actions: {
    async renderCard ({ commit, state }) {
      const res = await fetch('https://frontend-test.idaproject.com/api/product')
      const mountains = await res.json()
      let sort = state.sortParams.sort
      let id = state.sortParams.id;
      let filteredMointains = await mountains.sort((a, b) => {
        if (sort === 'price' && a.price && b.price) {
          return a.price - b.price
        } else if (sort === 'rating' && a.rating && b.rating) {
          return a.rating - b.rating
        }
      }).filter(item => {
        if (item.category && id) {
          return item.category === +id;
        }
      }) // сортировка по цене / популярности
      commit('SET_CARDS', filteredMointains)
    },
    async renderCatalogItem ({ commit, state }) {
      const res = await fetch('https://frontend-test.idaproject.com/api/product-category')
      const category = await res.json()
      commit('SET_CATEGORY', category)
    },
    async basketPushItem (state, payload) {
      const target = payload.target
      if (target && target.classList.contains('products__item-basket')) {
        const id = +target.closest('.products__item').id
        const res = await fetch('https://frontend-test.idaproject.com/api/product')
        const data = await res.json()
        const card = data.find(item => id === item.id)

        state.commit('BASKET_PUSH_ITEM', card)
        state.commit('BASKET_ITEM_COUNT')
      }
    },
    async formDispatch (state, payload) {
      state.commit('FORM_COMMIT', payload)
      state.basketFormGroup = false;
      state.basketView = false;
      state.commit('BASKET_ITEM_COUNT')
    }
  }
}