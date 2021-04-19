<template>
  <div class="seeContent">
    <p>{{ this.selectKContentByIdObj.title }}</p>
    <div class="content" v-html="this.selectKContentByIdObj.content"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["selectKContentByIdObj"]),
  },
  created() {
    console.log(this.selectKContentByIdObj);
  },
};
</script>

<style lang="scss" scoped>
p {
  font-size: 36px;
}
</style>