<template>

        <div id="main-login-container">
            <!--<router-link to="/home">Home</router-link>-->

            <div id="main-login">
                <transition name="fade">
                    <div id="loading-overlay" v-if="loadingMss">
                        <div class="loader-small-container">
                            <div class="loader-small">Loading...</div>
                        </div>
                    </div>
                </transition>

                    <div id="logo-form"><h2 class="logo-text">Apontamento de Produção</h2></div>
                    <form id="form-login" @submit.prevent="handleSubmit">
                        <div class="material-group-input disabled" style="width: 80%;">
                            <input id="input-NOMBRE" name="name" class="material-input" type="text" value="NOMBRE" disabled>
                            <!--<span class="material-input-highlight"></span>-->
                            <!--<span class="material-input-bar"></span>-->
                            <!--<label class="material-input-label">NOMBRE</label>-->
                        </div>

                        <div class="material-group-input" v-bind:class="{ 'is-invalid': submitted && !CARNET && document.getElementById('input-NOMBRE').value !== 'Usuario não encontrado'}" style="width: 80%; margin-top:15px">
                            <input id="input-CARNET" v-model="CARNET" name="CARNET" class="material-input" type="text" required autofocus>
                            <span class="material-input-highlight"></span>
                            <span class="material-input-bar"></span>
                            <label class="material-input-label">N CARNET</label>
                        </div>
                    </form>
                    <button form="form-login" class="button red login-submit" v-bind:disabled="status.loggingIn">Entrar</button>
            </div>

        </div>

       
</template>
<script>
    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'login-index',
        data() {
            return {
                CARNET: '',
                submitted: false,
                loadingMss:false,

            }
        },
        computed: {
            ...mapState('account', ['status'], ['loginFailure']),

            hayerror: function () {
                return this.$store.state.account.loginFailure;
            }
        },
        created() {
            // reset login status
            //this.logout();
        },
        mounted() {
            setTimeout(function () {
            document.getElementById('input-CARNET').focus();
            }, 200)
        },
        updated() {
            const inputNOMBRE = document.getElementById('input-NOMBRE');
            this.verifyUserKeyDownPress(this.CARNET)
                .then((response) => {
                    if (response.data.exists) {
                        inputNOMBRE.value = response.data.NOMBRE.toString();
                    } else {
                        inputNOMBRE.value = "Usuario não encontrado";
                    }
            })
            .catch((error) => {
                inputNOMBRE.value = "Usuario não encontrado";
            });

            if (this.hayerror) {
                this.loadingMss = false;
                custom.toast.msg('Erro ao entrar', 8000);
                this.$store.state.account.loginFailure = false;
            }

        },
        methods: {
            ...mapActions('account', ['login', 'logout']),
            handleSubmit(e) {
                const inputNOMBRE = document.getElementById('input-NOMBRE');
                this.submitted = true;
                const { CARNET } = this;
                if (CARNET) {
                    this.login({ CARNET })
                    this.loadingMss = true;
                }
            },
            verifyUserKeyDownPress: function (CARNET) {
                return axios.get('/Ajax/SelectNOMBRE', {
                    params: {
                        CARNET:CARNET
                    }
                });
            }
        }
    }
</script>
<style lang="css" scoped>
    #form-login {
        width: 100%;
        height: auto;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        justify-items: center;
        align-content: center;
    }
    #main-login-container {
        display: flex;
        min-height: 70vh;
        width: 100%;
        height: 100vh;
        margin: auto;
        max-width: 1000px;
        box-sizing: border-box;
    }
    #main-login {
        width: 100%;
        height: 65vh;
        min-width: 200px;
        max-width: 377px;
        border: 1px solid #eaeced;
        overflow: hidden;
        min-height: 109px;
        padding: 10px 10px 55px;
        background-color: #fff;
        margin: auto;
        border-radius: 5px !important;
        display: flex;
        flex-direction: column;
        position: relative;
        justify-content: center;
        align-items: center;
        max-height: 490px;
    }
    #logo-form {
        width: 100%;
    }
    .logo-text {
        text-align: center;
        font-size: 19px;
        font-weight: 200;
        text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.45098039215686275);
    }
</style>