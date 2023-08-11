<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
a{
  text-decoration: none;
}
.clearfix::before,
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
