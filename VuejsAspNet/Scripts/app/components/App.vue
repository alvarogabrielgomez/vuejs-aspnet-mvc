<template>

<div id="flex-container">
    <router-view/>
</div>

</template>

<script>
import Vue from 'vue';
import { store } from '../store';
import { mapState, mapActions } from 'vuex';
    import { router } from '../helpers';
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

export default {
    router: router,
    store: store,
    computed: {
        ...mapState([
            'online'
        ]),
        ...mapState({
            alert: state => state.alert
        })
    },
    mounted() {
    },
    methods: {
        ...mapActions({
            clearAlert: 'alert/clear'
        }),
        ...mapActions('database', ['checkDatabase']),
    },
    watch:{
        $route(to, from) {
            this.clearAlert();
        }
    }
};
</script>