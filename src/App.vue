<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  color: #000000;
  background: #ffffff;
}
</style>

<!--this.$server.photoQuery(data).then(data => {-->
<!--var data = data.data;-->
<!--for (var i = 0; i < data.length; i++) {-->
<!--data[i].url = data[i].url.split(",");-->
<!--}-->
<!--_this.myData = data-->
<!--//         alert()-->
<!--})-->
