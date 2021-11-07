<template>
  <div class="locaton_header">
    <div>
      <b-navbar toggleable="lg" class="pr-5 pl-5 bg_header">
        <b-navbar-brand href="#" class="flex1">
          <router-link :to="{name: 'home'}" tag="div">
            <b-img src="https://i.pinimg.com/originals/9a/5f/ac/9a5faca1071eed2426e178838514caf2.jpg" class="mr-1 img_profile" />
            <!-- <b-icon icon="layers-fill" variant="success" class="mr-1" /> -->
            <span class="text_logo ">PIKAACADEMY</span>
          </router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto mr-2">

          <b-navbar-nav id="nav-collapse" is-nav>
            <b-collapse id="nav-collapse" is-nav>
              <b-nav-form class="mr-2">
                <b-input-group class="form__search">
                  <template #append>
                    <b-input-group-text class="bg-t border__n"> <b-icon icon="search" variant="white" /></b-input-group-text>
                  </template>
                  <b-form-input v-model="searchKey" class="bg-t border__n text-white" placeholder="Search" @keydown.enter.prevent="onSearch" />
                </b-input-group>
              </b-nav-form>

              <b-navbar-nav>
                <b-nav-item class="btn_mb">
                  <router-link :to="{name: 'interestsUser'}" tag="div">
                    <b-icon icon="x-diamond-fill" variant="white" class="mr-1" /><span class="text-white">Interests</span>
                  </router-link>
                </b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav v-if="user">
                <b-nav-item href="/cart" class="flex">
                  <div class="flex">
                    <b-icon icon="cart" variant="white" class="mr-1" />
                    <span v-if="cart.cart_count > 0" class="text_nofification">{{ cart.cart_count }}</span>
                    <span class="text-white" :class="{ text_cart: (cart.cart_count > 0) }">Cart</span>
                  </div>
                </b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav v-if="user">
                <b-nav-item href="/wishlist"><b-icon icon="heart" variant="white" class="mr-1" /><span class="text-white">Wishlist</span></b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav v-if="user">
                <b-nav-item href="/my-courses">
                  <b-icon icon="play" variant="white" scale="1.5" class="mr-1" /><span class="text-white">My Learning</span>
                </b-nav-item>
              </b-navbar-nav>

              <b-nav-item-dropdown right no-caret class="btn_mb">
                <template #button-content>
                  <div>
                    <b-icon icon="globe" variant="white" /> <span class="text-white">language</span>
                  </div>
                </template>
                <b-dropdown-item href="#">English</b-dropdown-item>
                <b-dropdown-item href="#">Tiếng Việt</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-navbar-nav v-if="!user">
                <b-button :to="{ name: 'loginUser' }" class="mr-2 text-white btn_login btn_mb" variant="outline-dark">Login</b-button>
                <b-button :to="{ name: 'signUpUser' }" class="btn_singup btn_mb" variant="outline-success">Sing up</b-button>
              </b-navbar-nav>
              <b-navbar-nav v-else class="ml-2 drop_info">
                <b-nav-item-dropdown toggle-class="text-decoration-none" style="background-color: #1D1E22;" right no-caret>
                  <template #button-content>
                    <b-img rounded="circle" :src="user.url_avatar" class="img_profile" />
                  </template>
                  <b-dropdown-item class="p-2 drop_profile " :to="{ name: 'profileUser' }">
                    <b-icon icon="person-circle" variant="white" class="mr-3" />
                    <span class="text-white">Profile</span>
                  </b-dropdown-item>
                  <b-dropdown-item class="p-2 drop_item_logout" @click="logout()">
                    <b-icon icon="box-arrow-right" variant="danger" class="mr-3" />
                    <span class="text-white">Logout</span>
                  </b-dropdown-item>
                </b-nav-item-dropdown>

              </b-navbar-nav>
            </b-collapse>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-navbar>
    </div>
  </div>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data() {
    return {
      searchKey: null
    }
  },
  computed: {
    user: function() {
      return this.$store.state.User.myInfo
    },
    cart: function() {
      return this.$store.state.User.myCart
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('User/logout')
      this.$router.push('/login')
    },
    onSearch: function() {
      if (this.$route.name === 'search') {
        eventBus.$emit('search', this.searchKey)
      } else {
        this.$store.state.User.searchKey = this.searchKey
        this.$router.push({
          name: `search`
        })
      }
      this.searchKey = null
    }
  }
}
</script>

<style lang="scss" scoped>
.text_nofification {
    position: relative;
    background-color: red;
    color: white;
    border-radius: 15px;
    font-size: 12px;
    text-align: center;
    width: 1.5em;
    font-weight: 700;
    height: 1.5em;
    top: -0.8em !important;
    margin-left: -0.8em;
}

.text_cart {
  margin-left: -0.5em;
}

.drop_profile {
  background-color: #1D1E22;
  margin-top: -0.6rem;
  border-bottom: 1px solid pink;
}

.drop_item_logout {
  background-color: #1D1E22;
  margin-bottom: -0.6rem;
}

.text_logo {
  font-style: italic;
  font-weight: bolder;
  color: #bae910;
  text-shadow: 5px 2px 4px grey;
}

.img_profile {
  margin: -0.5rem;
  width: 50px;
  height: 50px;
}

.btn_login {
  background-color: #28a745;
  width: 85px;
  height: 40px;
  font-weight: bold;
}

.btn_singup {
  width: 85px;
  height: 40px;
  font-weight: bold;
}

.drop_info {
  :hover {
      background-color: #1D1E22;
    }
}

.dropdown-toggle::after {
    display: none !important;
}

.locaton_header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.bg_header {
  background-color: #242529;
}

.form__search {
  border-radius: 2rem;
  border: 2px solid;
  background-color: transparent;
  border-color: hsla(0,0%,100%,.6);
  width: 500px;
}

@media only screen and (max-width: 1024px) {
  .btn_mb {
    text-align: center;
    width: 100%;
    margin: 10px 0;
    border: 1px solid white;
    border-radius: 0.25rem;
  }
  .form__search {
    margin-bottom: 5px;
    border-color: white;
    width: 275px;
  }
}
.border__n {
  border: 0;
}
.bg-t {
  background-color: transparent !important;
}
</style>
