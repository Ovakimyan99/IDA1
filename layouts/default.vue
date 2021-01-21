<template>
  <div>
    <app-header></app-header>
    <main class="main">

      <!--   catalog   -->
      <div class="catalog">
        <h1>Каталог</h1>

        <div class="sort">
          Сортировать по:
          <select @change="clickSort()" v-model="sortItemModel">
            <option v-for="sort of sortItem">{{sort.name}}</option>
          </select>
        </div>
      </div>
      <!--   catalog   -->

      <div class="content-wrapper">
        <ul>
          <li v-for="page of pages" :key="page.id">
            <nuxt-link @click.prevent="goTo(page.id)" :to="`/${page.id}`" class="active catalog-item">{{page.name}}</nuxt-link>
          </li>
        </ul>

        <Nuxt />
      </div>
    </main>
    <app-basket />
  </div>.products--wrapper
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
      sortItem: [{ name: 'цене', sort: 'price'}, { name: 'рейтингу', sort: 'rating'}],
      sortItemModel: 'цене',
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

        this.$router.push('/' + page)
        this.$store.commit('SET_PAYLOAD_ID', page)
        this.$store.dispatch('renderCard')
      }
    },
    clickSort () {
      this.sortItem.forEach(item => {
        if (item.name === this.sortItemModel) {
          this.$store.commit('SET_PAYLOAD_SORT', item.sort)
          this.$store.dispatch('renderCard')
        }
      })
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
