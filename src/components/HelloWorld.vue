<template>
  <div>
    <app-nav-bar />
  </div>
</template>

<script>
import NavBar from './admin/NavBar.vue'
export default {
  name: 'HelloWorld',
  components: {
    appNavBar: NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
