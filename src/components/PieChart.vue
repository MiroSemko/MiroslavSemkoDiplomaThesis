<template>
    <div style="height: 295px;">
      <!-- Pass the `data` and `options` props to the `ChartJS` component -->
      <ChartJS :type="'pie'" :data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PieController,
  } from "chart.js";
  import { Chart as ChartJSComponent } from "vue-chartjs";

  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PieController
  )
  
  // Register required Chart.js components globally
  ChartJS.register(Title, Tooltip, Legend, ArcElement);
  
  export default {
    name: "PieChart",
    components: { ChartJS: ChartJSComponent },
    props: {
      dataPoints: {
        // Example: { Count_left: 3, Count_right: 8, Count_error: 2 }
        type: Object,
        required: false,
        default: () => ({}),
      },
    },
    data() {
      return {
        chartData: {
          labels: [], // Labels for pie chart (e.g., ["Left", "Right", "Error"])
          datasets: [
            {
              label: "Counts",
              backgroundColor: ["#36A2EB", "#64af68", "#f87979"],
              data: [], // Values for each slice
            },
          ],
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true, // Show legend
              position: "bottom", // Position the legend
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
        console.log(newVal);
        if (!newVal || Object.keys(newVal).length === 0) {
          // Reset the chart if the value is empty
          this.chartData = {
            ...this.chartData,
            labels: [],
            datasets: [{ ...this.chartData.datasets[0], data: [] }],
          };
          return;
        }
  
        // Extract keys and values for pie chart data
        const labels = Object.keys(newVal);
        const data = Object.values(newVal);
  
        this.chartData = {
          ...this.chartData,
          labels,
          datasets: [{ ...this.chartData.datasets[0], data }],
        };
      },
    },
  };
  </script>
  