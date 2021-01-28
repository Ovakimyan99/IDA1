<template>
  <div class="container-products">

    <div class="products--wrapper" ref="wrapperCard">
      <app-product-item />
    </div>
  </div>
</template>
<script>
import AppHeader from '@/components/Header'
import appProductItem from '@/components/ProductItem'

export default {
  components: {
    AppHeader,
    appProductItem
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

.container-products{
  @media (max-width: 720px) {
    margin-top: 20px;
  }
}

</style>
