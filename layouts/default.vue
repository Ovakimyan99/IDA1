<template>
  <div @click="clickSort($event)">
    <app-header></app-header>
    <main class="main">

      <!--   catalog   -->
      <div class="catalog">
        <h1>Каталог</h1>

        <div class="sort">
          Сортировать по:
          <span class="sort__result">{{sortItemModel}}</span>
          <div class="select__wrapper" ref="selectWrapper">
            <div v-for="sort of sortItem" class="select__item">{{sort.value}}</div>
          </div>
        </div>
      </div>
      <!--   catalog   -->

      <div class="content-wrapper">
        <ul>
          <li v-for="page of pages" :key="page.id" @click="goTo(page.id)">
            <nuxt-link :to="`/${page.id !== 1 ? page.id : '' }`" exact class="active catalog-item">{{page.name}}</nuxt-link>
          </li>
        </ul>

        <Nuxt keep-alive />
      </div>
    </main>
    <app-basket />
  </div>
</template>

<script>
import appHeader from '../components/Header'
import appBasket from '../components/Basket'

export default {
  components: {
    appHeader,
    appBasket
  },
  data () {
    return {
      pages: [],
      oldPage: null,
      sortItem: [{ name: 'цене', sort: 'price', value: 'по ценам'}, { name: 'рейтингу', sort: 'rating', value: 'по рейтингу'}],
      sortItemModel: 'цене'
    }
  },
  computed: {
    pageData () {
      return this.$store.dispatch('renderCatalogItem')
        .then(() => this.pages = [...this.$store.state.pageData])
    }
  },
  methods: {
    goTo(page) {
      if (this.oldPage !== page) {
        this.oldPage = page;

        if (page !== 1) {
          this.$router.push('/' + page)
        } else {
          this.$router.push('/')
        }
        this.$store.commit('SET_PAYLOAD_ID', page)
        this.$store.dispatch('renderCard')
      }
    },
    clickSort (e) {
      const target = e.target
      if (target.classList.contains('sort__result')) {
        this.$refs.selectWrapper.style.display = 'block';
      } else if (target.classList.contains('select__item')) {

        this.sortItem.forEach(item => {
          if (item.value === target.textContent) {
            this.sortItemModel = item.name
            this.$store.commit('SET_PAYLOAD_SORT', item.sort)
            this.$store.commit('SORT_MOUNTAINS', null)
          }
        })
        this.$refs.selectWrapper.style.display = 'none';
      }
      else if (target) {
        this.$refs.selectWrapper.style.display = 'none';
      }
    }
  },
  created () {
    this.pageData
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper{
  display: flex;
  flex-direction: row;

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
  }

  & ul {
    padding: 0;
    margin: 0;
    flex-shrink: 0;
    margin-right: 40px;

    li {
      list-style-type: none;
    }
  }

  .catalog-item{
    text-decoration: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 1.5;
    color: #1F1F1F;
  }
}

.sort{
  position: relative;
}

.select__wrapper{
  position: absolute;
  right: 0;
  z-index: 2;
  display: none;

  margin-top: 6px;
  padding: 8px 0;
  background: #FFFFFF;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  min-width: 160px;
}

.select__item{
  padding: 4px 12px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  color: #959DAD;

  &:hover{
    color: #1F1F1F;
    background: #F8F8F8;
  }
}

.sort__result{
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  color: #59606D;
  cursor: pointer;
}

.sort__option{
  background: #F8F8F8;
  padding: 1px;
}

.sort__select{
  position: absolute;
  z-index: 1;
  right: 0;
}

.catalog{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main{
  display: flex;
  flex-direction: column;
}
</style>
