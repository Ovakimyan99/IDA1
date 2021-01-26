<template>
  <div class="products--wrapper" ref="wrapperCard" @click="basketPushItem($event)">
    <div class="products__item"
         v-for="card of this.$store.state.mountains"
         :key="card.id"
         :id="card.id"
    >
      <span class="products__item-star">{{card.rating}}</span>
      <img  class="products__item-basket" src="@/theme/img/basket.svg" alt="Корзина" title="Корзина">

      <img class="products__item-img" :src="'https://frontend-test.idaproject.com'+card.photo" alt="КАРТИНКИ НЕТ" title="Рюкзак">

      <p class="products__item-descr">{{ card.name }}</p>
      <div class="products__item-price">{{ card.price }} ₽</div>
    </div>
  </div>
</template>

<script>
export default {
  validate({params}) {
    return /^\d+$/.test(params.id)
  },
  methods: {
    basketPushItem(event) {
      this.$store.dispatch('basketPushItem', event)
    }
  },
  created () {
    const id = !!this.$route.path.split('/')[1] === false ? 1 : this.$route.path.split('/')[1];
    this.$store.commit('SET_PAYLOAD_ID', id)
  },
  async fetch() {
    await this.$store.dispatch('renderCard')
  }
}
</script>

<style lang="scss" scoped>
.products__item{
  position: relative;
  width: 264px;
  padding: 16px;
  margin: 0 8px 16px;

  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background: #FFFFFF;

  &:nth-child(4n){
    @media (min-width: 1405px) {
      margin-right: 0;
    }
  }
}

.products--wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;

  @media (min-width: 720px) {
    margin-top: 0;
    justify-content: space-between;
  }
}

.products__item-star{
  background-image: url(".././theme/img/star.svg");
  background-repeat: no-repeat;
  background-color: #fff;
  border-radius: 5px;
  padding: 1px 0 2px 16px;
  height: 15px;

  position: absolute;
  top: 25px;
  left: 20px;

  font-weight: bold;
  font-size: 10px;
  line-height: 1.1;
  color: #F2C94C;
}

.products__item-basket{
  position: absolute;
  width: 12px;
  right: 18px;
  top: 18px;
  cursor: pointer;
  background-color: #fff;
  border-radius: 1px;
}

.products__item-img{
  max-height: 180px;
  height: 100%;

  margin: 5px auto 16px;
  display: block;
}

.products__item-descr{
  margin: 0;
  font-size: 14px;
  line-height: 1.2;
  color: #59606D;

}

.products__item-price{
  font-weight: bold;
  font-size: 14px;
  line-height: 1.1;
  color: #1F1F1F;
  margin-top: 6px;
}
</style>
