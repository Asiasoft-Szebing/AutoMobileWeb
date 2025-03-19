<script setup lang="ts">
import { Line } from 'vue-chartjs';
import { 
    Chart as ChartJS,
    Title, 
    Tooltip,
    Legend, 
    LineElement, 
    PointElement,
    LinearScale, 
    CategoryScale, 
    type ChartOptions
 } from 'chart.js'


 ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Bookings',
            data: [10, 20, 8],
            borderColor: '#62B1FF',
            backgroundColor: '#62B1FF',
            tension: 0.4,
        },
        {
            label: 'Cancellation',
            data: [1, 2, 1],
            borderColor: '#FF6969',
            backgroundColor: '#FF6969',
            tension: 0.4,
        }
    ],
};

const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        },
    },
    scales: {
        x:{
            grid:{
                display:false,
            }
        },
        y: {
            beginAtZero: true,
        },
    },
};
</script>

<template>
    <div class="w-full h-96">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>