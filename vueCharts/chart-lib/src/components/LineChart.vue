<template>
    <canvas ref="lineChart"></canvas>
</template>

<script>
export default {
    mounted() {
        const ctx =this.$refs.lineChart.getContext('2d');
        const chart = new this.$_Chart(ctx,{
            type: 'line',
            data: {
                labels: ['January','February','March','April','May','June'],
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [0, 10, 5, 2, 20, 30, 45],
                }]
            },

            options:{}
        });

        console.log(chart);
    }
}
</script>

<style>

</style>