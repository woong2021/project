<template>
    <div>
        <div v-for="job in jobs">{{ job.title }} </div>
    </div>
</template>

<script>
import { fetchJobList } from '../api/index.js';

export default {
    data(){
        return {
            jobs: []
        }
    },
    created(){
        var vm = this;

       fetchJobList()
        .then(response => vm.jobs = response.data)
        .catch(error => console.log(error));
    }
}
</script>

<style>

</style>