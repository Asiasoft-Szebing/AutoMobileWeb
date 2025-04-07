<script setup lang="ts">
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  type ChartOptions,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = {
  labels: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
  datasets: [
    {
      label: "Performance",
      data: [1, 1, 2, 2, 2],
      backgroundColor: "#4285F4",
      barThickness: 55,
    },
  ],
};

const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 10,
      }
    },
  },
};
</script>

<template>
  <div class="w-full h-96">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
