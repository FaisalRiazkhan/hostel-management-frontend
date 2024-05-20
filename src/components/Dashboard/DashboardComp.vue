<template>
<v-container class="db-container">
    <v-row class="card-main">
        <v-col cols="12" md="9">
            <v-row>
                <v-col cols="12" md="4">
                    <v-card class="cards" title="Total Seats" subtitle="Total no of seats" text="Counts: 10" variant="tonal">

                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="cards" title="Seats Available" subtitle="Total seats available" text="Counts: 06" variant="tonal">

                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="cards" title="Seats Reserved" subtitle="Total seats reserved" text="Counts: 04" variant="tonal">
                    </v-card>
                </v-col>
                <v-col cols="12" md="6">
                    <canvas id="myBarChart"></canvas>
                </v-col>
                <v-col cols="12" md="6">
                    <canvas id="myLineChart"></canvas>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="3">
            <v-sheet class="piechart-sheet">
                <h3>Rent Status</h3>
                <v-divider :thickness="1" color="warning" class="border-opacity-25"></v-divider>
                <canvas id="myPieChart"></canvas>
            </v-sheet>
        </v-col>
    </v-row>
    <v-divider :thickness="1" class="border-opacity-25" style="margin-top: 5px; color: #083049ff;"></v-divider>
</v-container>
</template>

<script>
import Chart from 'chart.js/auto';


export default {
    data() {
        return {
         
        }
    },
    mounted() {
        //Bar chart
        const ctx = document.getElementById('myBarChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'November', 'December'],
                datasets: [{
                    label: '# of student',
                    data: [12, 19, 5, 15, 10, 3, 20, 25, 10, 22, 13],
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(4, 114, 77, 1)',
                    ],
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        //pie chart
        const piectx = document.getElementById('myPieChart');
        const data = {
            labels: [
                'Paid',
                'Unpaid'
            ],
            datasets: [{
                label: 'Rent Collection',
                data: [75, 25],
                backgroundColor: [
                    'rgb(255, 99, 111)',
                    ' rgba(4, 114, 77, 1)'
                ],
                hoverOffset: 15,
                borderWidth: 0
            }],
            options: {
                responsive: true,
            }
        };
        new Chart(piectx, {
            type: 'pie',
            data: data,
        });
        //line chart
        const linectx = document.getElementById('myLineChart');
        const linechartdata = {
            labels: ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'November', 'December'],
            datasets: [{
                label: 'Monthly Rent Collection',
                data: [100000, 120000, 80000, 150000, 70000, 50000, 100000, 120000, 90000, 70000, 60000],
                fill: false,
                borderColor: 'rgba(4, 114, 77, 1)',
                tension: 0.1
            }]
        };
        new Chart(linectx, {
            type: 'line',
            data: linechartdata,
        });

    }
}
</script>

<style scoped>
.piechart-sheet {
    color: whitesmoke;
}

.db-container {
    /* background-color: aqua; */
}

.cards {
    background-color: #04724dff;
    color: white;
    margin-top: 10px;
}

.piechart-sheet {
    background-color: #083049ff;
    height: 325px;
    margin-top: 10px;
    text-align: center;
    font-size: large;
}

#myBarChart {
    height: 800px;
}
</style>
