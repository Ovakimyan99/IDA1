<template>
  <div class="products--wrapper" ref="wrapperCard" @click="basketPushItem($event)">
    <div class="products__item"
         v-for="card of this.$store.state.mountains"
         :key="card.id"
         :id="card.id"
    >

      <span class="products__item-star">{{card.rating}}</span>
      <svg class="products__item-basket" width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.84 0.48C4.06663 0.177833 4.42229 0 4.8 0H19.2C19.5777 0 19.9334 0.177833 20.16 0.48L23.76 5.28C23.9158 5.48772 24 5.74036 24 6V22.8C24 23.7548 23.6207 24.6705 22.9456 25.3456C22.2705 26.0207 21.3548 26.4 20.4 26.4H3.6C2.64522 26.4 1.72955 26.0207 1.05442 25.3456C0.379285 24.6705 0 23.7548 0 22.8V6C0 5.74036 0.0842134 5.48772 0.24 5.28L3.84 0.48ZM5.4 2.4L2.4 6.4V22.8C2.4 23.1183 2.52643 23.4235 2.75147 23.6485C2.97652 23.8736 3.28174 24 3.6 24H20.4C20.7183 24 21.0235 23.8736 21.2485 23.6485C21.4736 23.4235 21.6 23.1183 21.6 22.8V6.4L18.6 2.4H5.4Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0 6C0 5.33726 0.537258 4.8 1.2 4.8H22.8C23.4627 4.8 24 5.33726 24 6C24 6.66274 23.4627 7.2 22.8 7.2H1.2C0.537258 7.2 0 6.66274 0 6Z"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.2 9.6C7.86274 9.6 8.4 10.1373 8.4 10.8C8.4 11.7548 8.77928 12.6705 9.45442 13.3456C10.1295 14.0207 11.0452 14.4 12 14.4C12.9548 14.4 13.8705 14.0207 14.5456 13.3456C15.2207 12.6705 15.6 11.7548 15.6 10.8C15.6 10.1373 16.1373 9.6 16.8 9.6C17.4627 9.6 18 10.1373 18 10.8C18 12.3913 17.3679 13.9174 16.2426 15.0426C15.1174 16.1679 13.5913 16.8 12 16.8C10.4087 16.8 8.88258 16.1679 7.75736 15.0426C6.63214 13.9174 6 12.3913 6 10.8C6 10.1373 6.53726 9.6 7.2 9.6Z"/>
      </svg>

      <img class="products__item-img" :src="'https://frontend-test.idaproject.com'+card.photo" alt="КАРТИНКИ НЕТ" title="Рюкзак">

      <p class="products__item-descr">{{ card.name }}</p>
      <div class="products__item-price">{{ String(card.price).substring(0, 3) + ' ' + String(card.price).substring(3) }} ₽</div>
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
      if (event.target.closest('.products__item-basket')) {
        this.$store.dispatch('basketPushItem', event.target.closest('.products__item-basket'))
      }
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
  flex: 1;
  padding: 16px;
  margin: 0 8px 16px;

  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background: #FFFFFF;
  transition: 0.3s ease-in;

  &:nth-child(4n){
    @media (min-width: 1405px) {
      margin-right: 0;
    }
  }

  &:hover {
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.14);
  }

  @media (min-width: 1460px) {
    width: 264px;
    flex: auto;
  }
}

.products--wrapper{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;

  @media (min-width: 720px) {
    margin-top: 0;
    justify-content: flex-end;
  }
}

.products__item-star{
  background-image: url(".././theme/img/star.svg");
  background-repeat: no-repeat;
  background-color: #fff;
  border-radius: 5px;
  padding: 1px 0 2px 16px;
  height: auto;

  position: absolute;
  top: 20px;
  left: 19px;

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
  height: auto;
  cursor: pointer;
  background-color: #fff;
  border-radius: 1px;

  path {
    fill: #1F1F1F;
    transition: 0.2s ease-out;
  }

  &:hover path{
    fill: #959DAD;
  }

  &:after {
    content: '';
    position: absolute;
    background-color: #959DAD;
    width: 30px;
    height: 30px;
  }
}

.products__item-img{
  max-height: 180px;
  height: 100%;

  margin: 2px auto 16px;
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
  margin-top: 8px;
}
</style>
