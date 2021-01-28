<template>
  <header class="header">
    <span class="header__logo">TestList</span>

    <div class="header__backet-wrapper" data-basket-number="0" @click="basketModal">
      <img  class="header__backet" src="@/theme/img/basket.svg" alt="Корзина" title="Корзина">
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    basketModal () {
      this.$store.commit('BASKET_DISPLAY', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 15px;

  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;
  background-color: #fff;

  @media (min-width: 855px) {
    padding: 18px 108px 18px 88px;
  }
}

.header__logo{
  font-weight: 700;
  font-size: 22px;
  line-height: 28px;
}

.header__backet-wrapper{
  position: relative;

  &:before {
    content: attr(data-basket-number);
    position: absolute;
    cursor: pointer;

    top: -3px;
    right: -5px;
    height: 12px;
    width: 12px;

    z-index: 0;
    text-align: center;
    font-size: 10px;
    border-radius: 15px;
    line-height: 1.3;
    padding: 0 1px 2px 1px;
    background: #959DAD;
    color: #fff;
  }
}

.header__backet{
  width: 24px;
  cursor: pointer;
}
</style>
