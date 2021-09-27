<template>
  <div id="app">
    <lm-scale-time @dragTime="dragTime"></lm-scale-time>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  },
  methods:{
    dragTime(date){
      console.log(date);
    }
  }
}
</script>

<style lang="scss">
html,body,#app{
  width: 100%;
  height: 1080px;
  padding: 0;
  margin: 0;
  //overflow: hidden;
}
#app{
  background:#292929;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
}

</style>
