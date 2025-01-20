<template>
  <div style="height: 270px;">
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
  LineElement
);

export default {
  name: "CounterChart",
  components: { ChartJS: ChartJSComponent },
  props: {
    dataPoints: {
      // Example: { O_Counter_1: 10, O_Counter_2: 20 }
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  data() {
    return {
      chartData: {
        labels: [], // X-axis labels
        datasets: [
          {
            label: "Entered Products",
            backgroundColor: "#f87979",
            borderColor: "#f87979",
            data: [], // Y-axis data
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
            display: false, // Disable the legend entirely
          },
        },
        scales: {
          x: {
            grid: {
              display: false, // Remove vertical grid lines
            },
            ticks: {
              display: false, // Optionally, keep or remove X-axis labels
            },
          },
          y: {
            grid: {
              display: false, // Remove horizontal grid lines
            },
            ticks: {
              display: true, // Optionally, keep or remove Y-axis labels
              callback: function (value) {
                return Math.floor(value); // Remove decimals by rounding down
              },
            }
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
