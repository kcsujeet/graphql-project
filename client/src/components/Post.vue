<template>
  <div
    class="row left-box-shadow border-thin bg-white overflow-hidden border-radius-25"
  >
    <div class="col-md-2 overflow-hidden flex-1">
      <div class="row h-100 justify-content-center align-items-center">
        <img
          class="rounded-img"
          src="https://res.cloudinary.com/teepublic/image/private/s--qTzgPjhE--/t_Preview/b_rgb:6e2229,c_limit,f_jpg,h_630,q_90,w_630/v1524793004/production/designs/2632126_0.jpg"
          alt
        >
      </div>
    </div>
    <div class="col-md-10 bg-purple">
      <div class="row mt-3 justify-content-between">
        <ul class="mb-0 list-style-none">
          <li>
            <p class="text-light-gray">Rajiv Sah</p>
          </li>
        </ul>
        <div>
        <i
          id="popover-reactive-1"
          @click="togglePopover()"
          class="fas fa-ellipsis-h text-white mr-3"
        ></i>
        </div>
        <b-popover
          target="popover-reactive-1"
          triggers="click"
          :show.sync="popovershow"
          placement="topleft"
          ref="popover"
        >
          <b-list-group class="border-0">
            <b-list-group-item>Cras justo odio</b-list-group-item>
            <b-list-group-item>Dapibus ac facilisis in</b-list-group-item>
            <b-list-group-item>Morbi leo risus</b-list-group-item>
            <b-list-group-item>Porta ac consectetur ac</b-list-group-item>
            <b-list-group-item>Vestibulum at eros</b-list-group-item>
          </b-list-group>
        </b-popover>
      </div>
      <div class="row">
        <ul class="list-style-none">
          <li>
            <p class="text-white mb-1">{{post.title}}</p>
          </li>
          <li>
            <p class="text-white mb-1">{{post.description}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  props: {
    post: Object
  },
  data() {
    return {
      popovershow: false
    }
  },
  methods: {
    togglePopover() {
      return this.popovershow ? false : true;
    },
    onClickOutside(event){
      if (event.target != document.getElementById('popover-reactive-1')){
        this.popovershow = false
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.onClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.onClickOutside);
  }
};
</script>

<style lang="scss" scoped>
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 85% !important;
}
.popover-body{
  padding: none !important;
}
.list-group-item{
  border: 0;
}
</style>
