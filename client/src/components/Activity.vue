<template>
    <a href="#" class="list-group-item flex-column align-items-start activity-container mb-1">
    <div class="d-flex w-100 justify-content-between">
      <small class="mb-1">List group item heading</small>
      <small>3 days ago</small>
    </div>
  </a>
</template>

<script>
export default {
    name: 'Activity',
    data() {
        return {
            post: Object
        }
    }

}
</script>

<style lang="scss" scoped>

  .activity-container{
    border-radius: 1rem !important;
    border: 1px solid #ced4da !important;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
      &:hover{
    transform: scale(1.02, 1.02);
    box-shadow: 0 1px 3px rgba(0,0,0,0.15);
  }
  }
</style>
