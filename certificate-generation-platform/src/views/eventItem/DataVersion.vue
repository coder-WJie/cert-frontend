<template>
  <div id="root">
    <div class="chart" id="chartone"></div>
    <div class="chart" id="charttwo"></div>
    <div class="chart" id="chartthree"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
    };
  },
  computed: {
    option() {
      return {
        title: {
          text: "某站点用户访问来源",
          subtext: "纯属虚构",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let chartone = document.querySelector("#chartone");
      let charttwo = document.querySelector("#charttwo");
      let chartthree = document.querySelector("#chartthree");
      this.chartInstanceOne = this.$echarts.init(chartone);
      this.chartInstanceTwo = this.$echarts.init(charttwo);
      this.chartInstanceThree = this.$echarts.init(chartthree);
      this.chartInstanceOne.setOption(this.option);
      this.chartInstanceTwo.setOption(this.option);
      this.chartInstanceThree.setOption(this.option);
    },
  },
};
</script>

<style scoped>
#root {
  display: flex;
  justify-content: space-around;
}
.chart {
  width: 440px;
  height: 400px;
  display: inline-block;
  margin-top: 10px;
}
</style>