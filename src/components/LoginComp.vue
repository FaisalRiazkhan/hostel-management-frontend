<template>
<div class="main-container">
    <div class="overlay"></div>
    <v-container class="login-container" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
                <v-card class="login-wrapper">
                    <v-card-title class="headline text-center">Login<v-icon>mdi-login</v-icon>
                    </v-card-title>
                    <v-alert v-if="errorMessage" density="compact" type="error" dismissible>
                        {{ errorMessage }}
                    </v-alert>

                    <v-divider class="border-opacity-100" :thickness="1" color="info"> </v-divider>

                    <v-card-text>
                        <v-form @submit.prevent="handleLogin">
                            <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-arrow-right" variant="outlined" v-model="email" label="Email Address" type="email" required></v-text-field>
                            <v-text-field density="compact" clearable prepend-inner-icon="mdi-form-textbox-password" variant="outlined" v-model="password" label="Password" type="password" required></v-text-field>

                            <!-- Use v-row and v-col for button layout -->
                            <v-row>
                                <v-col>
                                    <router-link to="/signup" class="back-link">Register<v-icon>mdi-arrow-right-circle</v-icon>
                                    </router-link>
                                    <!-- <v-btn @click="redirecToSignup" class="signup-button" variant="elevated" elevation="10" size="small" color="primary" v type="submit">Create Account</v-btn> -->
                                </v-col>
                                <v-col>
                                    <v-btn class="login-button" variant="elevated" elevation="10" size="small" color="success" rounded="lg" type="submit">Login</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import axios from 'axios';
export default {
    data() {
        return {
            email: "",
            password: "",
            errorMessage: ""
        };
    },
    methods: {
        ...mapActions('auth', ['login']),
        async handleLogin() {
            if (!this.email || !this.password) {
                this.errorMessage = "Please enter both email address and password.";
                return;
            }
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/login', {
                    email: this.email, // Assuming email is used for login
                    password: this.password
                });
                const {
                    token
                } = response.data;
                // Save token to localStorage or Vuex for future requests

                // Redirect to the dashboard page after successful login
                this.$router.push('/dashboard');
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    this.errorMessage = "Invalid email or password."
                } else {
                    this.errorMessage = "Something goes wrong. Please try again later."
                }
            }
            const success = await this.login({
                email: this.email,
                password: this.password
            });
            if (success) {
                // Redirect to the dashboard page after successful login
                this.$router.push('/dashboard');
            } else {
                // Handle login failure (show error message, etc.)
                // console.log('Login failed');
                this.errorMessage = "Invalid email or password.";
            }
        },
        redirecToSignup() {
            this.$router.push('signup')
        }
    },
};
</script>

<style scoped>
template {
    margin: 0;
    padding: 0;
    height: 100%;
}

.main-container {
    background-image: url('../assets/images/background2.png');
    /* Replace with the path to your background image */
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    height: 100vh;
    align-items: center;
}

.login-wrapper {
    /* background-image: url('../assets/images/login.jpg'); */
    /* Replace with the path to your image */
    /* background-color:#219ebc; */
    opacity: 90%;
    border: none;
    background-size: auto;
    background-position: center;
    color: #023047;
    /* Adjust the text color to be visible on the background */

    width: 400px;
    /* outline: auto; */
    /* outline-color: rgb(228, 1, 1); */
    /* outline-style: var(1%); */
}

.text-center {
    text-align: center;
}

.login-button {
    /* margin-left: 60%; */
    left: 100px;
    color: #e7270e;
}

.signup-button {
    margin-left: 1%;
}

.back-link {
    text-decoration: none;
    color: #083049ff;
    font-weight: normal;
    margin-bottom: 10px;
    display: inline-block;

    padding-bottom: 2px;
    transition: color 0.3s;
}

.back-link:hover {
    color: #219ebc;

}
</style>
