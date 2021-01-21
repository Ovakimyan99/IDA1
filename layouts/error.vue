<template>
  <div class="error">
    Данной страницы не существует, вернитесь на <a href="/">главную</a>
    <span>404</span>
  </div>
</template>

<script>
export default {
  layout: 'error'
}
</script>

<style lang="scss" scoped>
*{
font-family: sans-serif;
}

.error{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  text-align: center;
  font-size: 20px;
}

a{
  color: #f55959;
  transition: 0.3s all ease-in;
  margin-left: 7px;

  &:hover {
    color: #ca3c3c;
  }
}

span{
  font-size: 190px;
  color: #6495ed;
  position: absolute;
  opacity: 0.5;
  left: 50%;
  top: 50%;
  transform: translate(-30%, -80%);
  letter-spacing: 1.5px;
  z-index: -1;
}
</style>
