<template>
  <div class="container-fluid">
    <div class="pt-3 pl-3 flex">
      <router-link
        tag="div"
        :to="{name: 'userInformation', params: { id: $route.params.id }}"
        class="btn_tags content_center c_pointer"
        :class="{ btn_tag_active: ($route.name === 'userInformation')}"
      >Information</router-link>
      <router-link
        tag="div"
        :to="{name: 'userLearning', params: { id: $route.params.id }}"
        class="btn_tags content_center c_pointer"
        :class="{ btn_tag_active: ($route.name === 'userLearning')}"
      >Learning</router-link>
      <div class="btn_tags content_center c_pointer">Transaction</div>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.btn_tags {
  width: 110px;
  height: 35px;
  margin: auto 5px;
  border-radius: 0px;
  background-color: white;
  color: #495060;
  border: 1px solid #d8dce5;
  box-shadow: 3px 3px 0 rgba(0,0,0,0.1);
}
.btn_tag_active::before{
  content: "";
  background: #fff;
  display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    position: relative;
    margin-right: 5px;
}

.btn_tag_active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}
</style>
