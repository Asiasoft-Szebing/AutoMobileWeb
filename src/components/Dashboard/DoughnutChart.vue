<script setup lang="ts">
import { Doughnut } from "vue-chartjs";

// Register Chart.js components
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, type ChartOptions } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);


//sample appointment service data
const service = {
  labels: ["Car Wash", "Car Service", "Car Maintenance", "Oil Change"],
  datasets: [
    {
      data: [5, 5, 5, 5],
      backgroundColor: ["#FFC107", "#4A90E2", "#50E3C2", "#FF4B4B"],
    },
  ],
};

const chartOptions: ChartOptions<"doughnut"> = {
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};
</script>

<template>
  <Doughnut id="AppointmentChart" :data="service" :options="chartOptions" />
</template>
