<template>
  <div class="lmScaleTime-wrapper">
    <div class="scale-wrapper">
      <div class="date-wrapper" >
        <div v-for="(item,index) in dateList" class="items-date">
          <i v-for="i in index < dateList.length ? 10 : 11" :key="i"></i>
          <span class="item_scale_time"> {{ item }}</span>
        </div>
        <div class="items-date last-items-date">
          <i></i>
          <span class="item_scale_time"> 23:59</span>
        </div>
      </div>
      <div class="time-axis-center" >
        <span class="line-axis"></span>
        <div class="draggable-time" ref="timeAxis">
          <vue-draggable-resizable
            :w="offWidth"
            :h="20"
            :resizable="true"
            :x="0"
            @dragging="onDrag"
            @resizing="onResizing"
            :min-height="20"
            :min-width="10"
            :handles="['ml', 'mr']"
            :parent="true"
            class="video_track"
          >
            <div style="background: #00C4B4;width: 100%;height: 100%;"></div>
          </vue-draggable-resizable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "lmScaleTime",
  data() {
    return {
      selectTimer: 60,
      dateList: [],
      videoCalendar: new Date(),
      offWidth:60,
      resultTimer:{
        starTimer:'',
        endTimer:'',
      }
    }
  },
  methods:{
    createLine(minute) {
      var seconds = minute * 60;
      var len = (60 * 24 * 60) / seconds; //数组长度
      for (var i = 0, total = 0, newArr = []; i < len; i++) {
        var h = parseInt(total / 3600),
          min = parseInt(total % 3600 / 60);
        newArr.push(this.s(h) + ':' + this.s(min));
        total += seconds;
      }
      return newArr;
    },
    s(n) {
      return n < 10 ? '0' + n : n
    },

    onDrag(x, y) {
      let newDay=this.$moment().format("YYYY-MM-DD");
      this.resultTimer.starTimer=this.mapPositionToTime(x)
      //减去一秒
      let odate=this.$moment(newDay +' '+ this.mapPositionToTime(x + this.offWidth+1))
      this.resultTimer.endTimer=odate.subtract(1,'seconds').format('HH:mm:ss');
      console.log(this.resultTimer);
      this.$emit('dragTime',this.resultTimer)
    },

    onResizing(x,y,w,h){
      let newDay=this.$moment().format("YYYY-MM-DD");
      this.offWidth=w
      this.resultTimer.starTimer=this.mapPositionToTime(x);
      //减去一秒
      let odate=this.$moment(newDay +' '+ this.mapPositionToTime(x + w))
      this.resultTimer.endTimer=odate.subtract(1,'seconds').format('HH:mm:ss');
      this.$emit('dragTime',this.resultTimer)
    },


    //根据位置x装换成时间HH:mm:ss格式
    mapPositionToTime(x){
      let newDay=this.$moment().format("YYYY-MM-DD");
      let offWidth=this.$refs.timeAxis.offsetWidth//3px的padding+2px的border
      return this.$moment(newDay+' 00:00:00').add(x*(86400/offWidth), 'seconds').format('HH:mm:ss');
    },

    //根据时间格式HH:mm:ss 装换位置 x
    // mapTimeToPosition(time){
    //   let newDay=this.$moment().format("YYYY-MM-DD");
    //   return this.$moment(newDay+' '+time).diff(newDay+' 00:00:00',"seconds",true)
    // }
  },
  mounted() {
    // console.log(this.mapTimeToPosition('09:00:00'));
    this.dateList=this.createLine(this.selectTimer);
  }
}
</script>

<style scoped lang="scss">
.lmScaleTime-wrapper {
  min-width: 1200px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .scale-wrapper {
    flex-shrink:0;
    width:90%;
    box-sizing: border-box;
    .date-wrapper{
      height: 60px;
      width: 100%;
      box-sizing: border-box;
      padding:10px 0;
      display: flex;
      flex-wrap: nowrap;
      justify-content: left;
      .items-date{
        height: 40px;
        position: relative;
        display: flex;
        flex: 1;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-items: flex-end;
        i {
          display: inline-block;
          width: 1px;
          background: #fafafa;
          height: 5px;
        }

        :nth-child(5n + 1) {
          height: 10px;
        }
        :nth-child(10n + 1) {
          height: 15px;
        }
        :nth-child(10) {
          height: 5px;
        }
        :first-child {
          margin-left: 0;
        }
        .item_scale_time {
          position: absolute;
          top: 0;
          left: -17px;
          color: #fafafa;
        }
      }
      .last-items-date{
        flex:0;
        i {
          position: absolute;
          left: 3px;
          display: inline-block;
          width: 1px;
          background: #fafafa;
          height: 5px;
        }
      }
    }
    .time-axis-center{
      width:calc(100%);
      height: 20px;
      margin-top: 20px;
      position: relative;
      .line-axis{
        width: 100%;
        height: 1px;
        background: #7e7e7e;
        position: absolute;
        left: 0;
        top: 10px;

      }
      .draggable-time{
        width:calc(100% + 3px);
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        /deep/ .vdr{
         border: none;
        }
        /deep/ .handle{
          background: #00C4B4;
          border: none;
        }
        /deep/ .handle-ml {
          left: -5px;
        }
        /deep/ .handle-mr{
          right:-5px;
        }
        /deep/ .handle-ml,/deep/ .handle-mr{
          height: 25px;
          width: 10px;
          top: -5px;
          margin-top: 0px;
          display: block !important;
        }
        /deep/ .handle-ml:after,/deep/ .handle-mr:after{
          content:"";
          width:0;
          height:0;
          position:absolute;
          left:0;
          top:-10px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid #00C4B4;
        }
      }
    }
  }


}

</style>

