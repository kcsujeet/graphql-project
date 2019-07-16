<template>
<transition appear disappear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
  <div class="row border-thin bg-white overflow-hidden border-radius-3 mb-3 post-container">
    <div class="col-md-2 overflow-hidden flex-1">
      <div class="row h-100 justify-content-center align-items-center">
        <img
          class="rounded-img"
          src="https://res.cloudinary.com/teepublic/image/private/s--qTzgPjhE--/t_Preview/b_rgb:6e2229,c_limit,f_jpg,h_630,q_90,w_630/v1524793004/production/designs/2632126_0.jpg"
          alt
        />
      </div>
    </div>
    <div class="col-md-10">
      <div class="row mt-3 justify-content-between">
        <ul class="mb-0 list-style-none">
          <li>
            <p class="text-dark-gray">{{post.user? post.user.name : post.created_by.name}}</p>
          </li>
        </ul>
        <div>
          <i
            :id="post.id"
            @click="togglePopover()"
            class="fas fa-ellipsis-h text-dark-gray mr-4"
            v-if="this.$route.name != 'Home'"
          ></i>
        </div>
        <b-popover
          v-if="this.$route.name != 'Home'"
          :target="post.id"
          triggers="click"
          :show.sync="popovershow"
          placement="bottomleft"
          ref="popover"
        >
          <b-list-group class="border-0">
            <b-list-group-item @click="$emit('update_post', post)">update</b-list-group-item>
            <b-list-group-item @click="$emit('delete_post', post.id)">delete</b-list-group-item>
          </b-list-group>
        </b-popover>
      </div>
      <div class="row">
        <ul class="list-style-none">
          <li>
            <p class="text-dark-gray mb-1">{{post.title}}</p>
          </li>
          <li>
            <p class="text-dark-gray mb-1">{{post.description}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </transition>
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
    };
  },
  methods: {
    togglePopover() {
      return this.popovershow ? false : true;
    },
    onClickOutside(event) {
      if (event.target != document.getElementById(this.post.id)) {
        this.popovershow = false;
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
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 85% !important;
}
.popover-body {
  padding: none !important;
}
.list-group-item {
  border: 0;
  font-size: 80%;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #c1d3ea8c;
  }
}

.post-container {
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  &:hover {
    transform: scale(1.008);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  }
}
</style>
