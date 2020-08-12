<template>
  <div class="details">
    <top-bar></top-bar>
    {{id}}
  </div>
</template>

<script>
import TopBar from './detailschild/topbar'

export default {
  components:{
    TopBar
  },
  data() {
    return {
      id:null
    }
  },
  activated() {
    this.id = this.$route.params.iid;
  }
}
</script>

<style>

</style>