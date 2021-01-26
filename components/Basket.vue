<template>
  <div class="modal-basket-wrapper" v-if="this.$store.state.basketView" @click='basketModal($event)'>
    <div class="basket-wrapper" v-if="this.$store.state.basketFormGroup">
      <div class="basket-header">
        <span>Корзина</span>
        <img class="basket-header__close" src="@/theme/img/close.svg" @click='basketModal'>
      </div>
      <div class="basket-filling__header">Товары в корзине</div>
      <div class="basket-filling__items-list">

        <!--  карточка в корзине  -->
        <div class="basket-filling__item"
          v-for="{ id, name, photo, price, rating, counter } of this.$store.state.basketData"
             :key="id"
             :id="id"
        >
          <div class="basket-filling__item-img-wrap">
            <img :src="'https://frontend-test.idaproject.com'+photo" :alt="name">
          </div>

          <div class="basket-filling__item-descr">
            <span class="products__item-descr">{{ name }}</span>
            <div class="products__item-price">{{ price }} ₽</div>
            <span class="products__item-star products__item-star">{{ rating }}</span>

            <span class="counter">Кол-во: {{ counter }}</span>
          </div>

          <img class="basket-filling__item-del" src="@/theme/img/trash.svg" @click="basketItemDel($event)">
        </div>
        <!--  карточка в корзине  -->
      </div>

      <div class="basket-filling__header">Оформить заказ</div>

      <form ref="form">
        <span class="empty-cart">Пока что вы ничего не добавили в корзину.</span>
        <div class="group">
          <input
            type="text"
            class="basket-input-form"
            placeholder="Ваше Имя"
            name="Name"
            label="Name"
            v-model="name"
          >
          <div class="basket-input-form">
            <input
              type="tel"
              v-model="phone"
              name="phone"
              id="phone"
              placeholder="Телефон"
              autocomplete="tel"
              minlength="15"
              class="form-control"
              v-phone
              required
            />
          </div>
          <input
            type="text"
            class="basket-input-form"
            placeholder="Адрес"
            v-model="adres"
          >
        </div>

        <input type="submit" value="Отправить" class="basket-input-form basket-input-submit" @click.prevent="onsubmit($event)">
      </form>
      <span class="error-form" v-if="formError">Заполните форму корректно!</span>
    </div>

    <div class="basket-wrapper" v-if="!this.$store.state.basketFormGroup">
      <div class="basket-header">
        <span>Корзина</span>
        <img class="basket-header__close" src="@/theme/img/close.svg" @click='basketModal'>
      </div>

      <div class="basket-filling__items-list" v-if="!this.$store.state.applicationSent">
        <form>
          <span class="empty-cart">Пока что вы ничего не добавили в корзину.</span>
          <input type="submit" value="Перейти к выбору" class="basket-input-form basket-input-submit go-to-selection" @click.prevent="basketModal($event)">
        </form>
      </div>

      <div v-if="this.$store.state.applicationSent">
        <div class="basket-placed-order">
          <img src="@/theme/img/ok-hand.png" alt="ok">
          <span>Заявка успешно отправлена</span>
          <p>Вскоре наш менеджер свяжется с Вами</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      phone: '',
      name: '',
      adres: '',
      formError: false
    }
  },
  methods: {
    basketModal (event) {
      const target = event.target;
      if (target.classList.contains('modal-basket-wrapper') || target.classList.contains('basket-header__close')
        || target.classList.contains('go-to-selection') && !this.formError) {
        document.querySelector('.basket-wrapper').classList.add('fadeInRight')
        setTimeout(()=>{
          this.$store.commit('BASKET_DISPLAY', false) // закрываем модалку с корзиной
          this.formError = false
          this.$store.commit('APPLICATIN_SENT', false)
        }, 1050)
      }
    },
    basketItemDel (event) {
      this.$store.commit('BASKET_ITEM_DEL', event.target) // удаляем элемент корзины
      this.$store.commit('BASKET_ITEM_COUNT') // подсчет числа элементов в корзине
    },
    onsubmit () {
      if (this.$refs['form'] && this.adres && this.name && this.phone.length === 16) {
        this.formError = false
        const user = {
          name: this.name,
          adres: this.adres,
          phone: this.phone
        }

        this.$store.dispatch('formDispatch', user)
          .then(() => {
            try {
              this.$store.commit('APPLICATIN_SENT', true)
              // this.$store.commit('BASKET_ITEM_COUNT')

              // setTimeout(()=> {
              //   this.$store.commit('APPLICATIN_SENT', false)
                this.$store.commit('BASKET_DISPLAY', true)
              // }, 5000)
            } catch (e) {
              alert('Что - то пошло не так...')
              throw e
            }
          })
          .catch(() => {})
      } else {
        this.formError = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fadeInRight{
  right: -470px !important;
  opacity: 0;
  transition: 0.95s ease-in;
}

.modal-basket-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
}

.basket-wrapper{
  max-width: 460px;
  width: 100%;
  height: 100vh;

  margin-left: auto;
  padding: 52px 25px;
  background: #FFFFFF;
  box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px 0px 0px 8px;
  z-index: 2;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: fixed;
  right: 0;

  @media (min-width: 460px) {
    display: block;
    padding: 52px 48px;
  }
}

.form-control{
  background: #F8F8F8;
  border: none;
  outline: none;

  width: 100%;
  font-size: 15px;
  line-height: 21px;
}

.basket-header{
  font-weight: bold;
  font-size: 32px;
  line-height: 1.3;
  color: #000000;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.basket-header__close{
  width: 14px;
  height: 14px;
  line-height: 1;
  font-size: 15px;
  cursor: pointer;
}

.empty-cart{
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 28px;
  margin-bottom: 24px;
  display: inline-block;

  color: #000000;
}

.basket-empty-cart{
  font-weight: normal;
  font-size: 22px;
  line-height: 1.26;

  color: #000000;
  margin: 0;
}

.basket-btn__buy{
  background: #1F1F1F;
  border-radius: 8px;

  width: 100%;
  margin-top: 24px;
  padding: 14px 2px;
  border: none;
  cursor: pointer;
  outline: none;

  font-size: 16px;
  line-height: 1.1;
  text-align: center;
  color: #FFFFFF;

  &:active{
    background: #59606D;
  }
}

.basket-filling__header{
  display: inline-block;
  margin-bottom: 16px;

  color: #59606D;
  font-size: 18px;
  line-height: 1.1;
}

.basket-filling__items-list{
  margin-bottom: 32px;
}

.basket-filling__item{
  width: 100%;
  position: relative;
  background: #FFFFFF;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 12px 22px 15px 25px;

  display: flex;
  justify-content: space-between;


  &:not(:last-child) {
    margin-bottom: 12px;
  }
}

.basket-filling__item-img-wrap{

  & img{
    margin: 0;
    max-height: 90px;
  }
}

.counter {
  margin-left: 60px;
  font-size: 12px;
}

.basket-filling__item-descr{
  margin: 0 22px 0 35px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #59606D;
  margin-right: auto;

  .products__item-star{
    position: relative;
    left: auto;
    top: auto;

    color: #F2C94C;
    font-style: normal;
    font-weight: bold;
    font-size: 10px;
    line-height: 13px;
    background-image: url("../theme/img/star.svg");
    background-repeat: no-repeat;
    padding-left: 17px;
    margin-top: 16px;
    display: inline-block;

  }

  .products__item-price {
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 18px;
    color: #1F1F1F;
    margin-top: 6px;
  }

}

.basket-filling__item-del{
  cursor: pointer;

  &:hover {
    fill: lighten(black, 6.25%);
  }
}

.basket-input-form{
  background: #F8F8F8;
  border-radius: 8px;
  padding: 14px;

  font-size: 16px;
  line-height: 21px;
  margin-bottom: 16px;
  width: 100%;

  border: none;
  outline: none;

  &.basket-input-submit{
    align-items: center;
    background: #1F1F1F;
    border-radius: 8px;
    color: white;
    cursor: pointer;
  }
}

.basket-placed-order{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 100%;
  transform: translateY(-100%);
  z-index: 20;

  span {
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 31px;
    text-align: center;
    color: #000000;
  }

  p {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
    color: #59606D;
  }

  & img {
    width: 80px;
    margin-bottom: 24px;
  }

  .basket-header{
    font-size: 24px;
    line-height: 1.15;
    margin-bottom: 0;
  }

  .basket-filling__header{
    margin-top: 2px;
    font-size: 16px;
    line-height: 1.2;
  }
}

.error-form{
  color: deeppink;
}
</style>
