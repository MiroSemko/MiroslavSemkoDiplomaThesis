<template>
  <div style="height: 295px;">
    <!-- Pass the `data` and `options` props to the `ChartJS` component -->
    <ChartJS :type="'line'" :data="chartData" :options="chartOptions" :key="JSON.stringify(chartData)"/>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
} from "chart.js";
import { Chart as ChartJSComponent } from "vue-chartjs";

// Register Chart.js components globally
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController
);

export default {
  name: "CounterChart",
  components: { ChartJS: ChartJSComponent },
  props: {
    dataPoints: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Products",
            backgroundColor: "#36A2EB",
            borderColor: "#36A2EB",
            data: [],
            fill: false,
            tension: 0.2,
            pointRadius: 0, // Remove dots on the line
            pointHoverRadius: 0, // Remove hover effect for dots
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Time',
              color: '#666',
              font: {
                size: 12,
              },
            },
            grid: {
              display: false,
            },
            ticks: {
              display: false,
            },
          },
          y: {
            title: {
              display: true,
              text: 'Product Count',
              color: '#666',
              font: {
                size: 12,
              },
            },
            grid: {
              display: false,
            },
            ticks: {
              stepSize: 1,
              display: true,
              callback: function (value) {
                return Math.floor(value);
              },
            },
          },
        },
      },
    };
  },
  watch: {
    dataPoints: {
      immediate: true,
      handler(newVal) {
        this.updateChartData(newVal);
      },
    },
  },
  methods: {
    updateChartData(newVal) {
      if (!newVal || Object.keys(newVal).length === 0) {
        // Reset the chart if the value is empty
        this.chartData = {
          ...this.chartData,
          labels: [],
          datasets: [{ ...this.chartData.datasets[0], data: [] }],
        };
        return;
      }

      const currentTime = new Date().toLocaleTimeString();
      const productCount = Object.values(newVal)[0];

      const newLabels = [...this.chartData.labels, currentTime];
      const newData = [...this.chartData.datasets[0].data, productCount];

      // Optional: Limit data points
      const maxDataPoints = 200;
      if (newLabels.length > maxDataPoints) {
        newLabels.shift();
        newData.shift();
      }

      this.chartData = {
        ...this.chartData,
        labels: newLabels,
        datasets: [{ ...this.chartData.datasets[0], data: newData }],
      };
    },

  },

};
</script>
