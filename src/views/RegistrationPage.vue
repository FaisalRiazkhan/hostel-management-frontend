<template>
<div class="main-container">
    <video autoplay muted loop id="video-bg">
        <source src="../assets/images/background2.mp4" type="video/mp4" />
        <!-- Include additional source elements for different video formats -->
        Your browser does not support the video tag.
    </video>
    <v-container class="login-container">

        <v-row>
            <v-col cols="12" sm="8" md="4">
                <v-card class="login-wrapper">
                    <v-card-title class="headline text-center">
                        <v-icon>mdi-account-plus</v-icon> Sign Up
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <v-text-field class="input" :rules="rules" hide-details="auto" clearable density="compact" prepend-inner-icon="mdi-account-arrow-right" variant="outlined" v-model="model.newUser.first_name" label="First Name" required></v-text-field>
                                    <span class="error-message" v-if="errorList['first_name']">{{ errorList['first_name'][0] }}</span>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <v-text-field clearable :rules="rules" hide-details="auto" density="compact" prepend-inner-icon="mdi-account-arrow-right" variant="outlined" v-model="model.newUser.last_name" label="Last Name" required></v-text-field>
                                    <span class="error-message" v-if="errorList['last_name']">{{ errorList['last_name'][0] }}</span>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <v-text-field density="compact" clearable :rules="rules" hide-details="auto" prepend-inner-icon="mdi-id-card" variant="outlined" v-model="model.newUser.national_id_no" label="CNIC" placeholder="0000011111112" required></v-text-field>
                                    <span class="error-message" v-if="errorList['national_id_no']">{{ errorList['national_id_no'][0] }}</span>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <v-text-field density="compact" clearable :rules="rules" hide-details="auto" prepend-inner-icon="mdi-email-variant" variant="outlined" v-model="model.newUser.email" label="Email Address" placeholder="johndoe@gmail.com" type="email" required></v-text-field>
                                    <span class="error-message" v-if="errorList['email']">{{ errorList['email'][0] }}</span>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <v-text-field density="compact" clearable :rules="rules" hide-details="auto" prepend-inner-icon="mdi-cellphone" variant="outlined" v-model="model.newUser.phone_number" label="Phone Number" placeholder="+920001111111" required></v-text-field>
                                    <span class="error-message" v-if="errorList['phone_number']">{{ errorList['phone_number'][0] }}</span>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <v-text-field density="compact" clearable :rules="rules" hide-details="auto" prepend-inner-icon="mdi-cellphone" variant="outlined" v-model="model.newUser.password" label="Password" type="password" required></v-text-field>
                                    <span class="error-message" v-if="errorList['password']">{{ errorList['password'][0] }}</span>
                                </v-col>
                            </v-row>

                            <v-text-field class="confirm-password" density="compact" clearable :rules="rules" hide-details="auto" prepend-inner-icon="mdi-cellphone" variant="outlined" v-model="model.newUser.password_confirmation" label="Confirm Password" type="password" required></v-text-field>
                            <span class="error-message" v-if="errorList['password']">{{ errorList['password'][0] }}</span>

                            <v-btn @click.prevent="registerUser" class="create-account-btn" variant="elevated" elevation="10" size="small" color="success" rounded="lg" type="submit">Create</v-btn>

                            <v-divider class="border-opacity-100" :thickness="1" color="warning"> </v-divider>

                            <v-row>
                                <v-col>
                                    <span>Already have an account?</span>
                                    <router-link to="/" class="back-link">
                                        <v-icon>mdi-arrow-left-circle</v-icon>Login
                                    </router-link>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn class="g-btn" prepend-icon="mdi-google" variant="outlined" size="small" rounded="lg">Sign up with Google</v-btn>
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
import axios from 'axios';
export default {
    name: 'SignupCompVue',
    data() {
        return {
            errorList: '',
            model: {
                newUser: {
                    first_name: '',
                    last_name: '',
                    national_id_no: '',
                    email: '',
                    phone_number: '',
                    password: '',
                    password_confirmation: ''
                }
            }

        };
    },
    methods: {
        registerUser() {
            axios.post('register', this.model.newUser)
                .then(res => {
                    console.log(res);
                    alert(res.data.message);
                    this.model.newUser = {
                        first_name: '',
                        last_name: '',
                        national_id_no: '',
                        email: '',
                        phone_number: '',
                        password: ''
                    }
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 422) {
                            this.errorList = error.response.data.errors;
                        }
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                });
        }
    },

};
</script>

<style scoped>
#video-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* Ensures the video covers the entire screen */
    z-index: -1;
    opacity: 90%;
}

.confirm-password {
    margin-top: 25px;
    /* margin-bottom: 22px; */
}

.error-message {
    color: red;
    font-size: 10px;
    display: block;
}

template {
    margin: 0;
    padding: 0;
    height: 100%;
}

.main-container {
    background-image: url('../assets/images/');
    /* background-color: #023047; */
    /* Replace with the path to your background image */
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    height: 100vh;
    align-items: center;
}

.login-wrapper {
    /* background-image: url('../assets/images/login.jpg'); */
    /* Replace with the path to your image */
    background-size: cover;
    opacity: 90%;
    right: 30%;
    background-position: center;
    color: #023047;
    /* Adjust the text color to be visible on the background */

    width: 600px;
}

.text-center {
    text-align: center;
}

.create-account-btn {
    width: 150px;
    margin-left: 40%;
    top: 28px;
    left: 33%;
    /* margin-bottom: 10px; */
}

.input {
    border: none;
}

.f1 {
    display: inline;
    align-items: center;
    align-content: center;
}

.back-link {
    text-decoration: none;
    color: #083049ff;
    font-weight: normal;
    margin-bottom: 5px;
    display: inline-block;
    padding-top: 4px;
    transition: color 0.3s;
}

.back-link:hover {
    color: #219ebc;

}

.g-btn {
    background-color: #083049ff;
    margin-inline-start: 35%;
    color: rgba(5, 20, 40, 0.404);

}

.g-btn:hover {
    background-color: #022250ff;
}

.g-btn::v-deep(.v-btn__prepend) {
    color: whitesmoke;
}

.g-btn::v-deep(.v-btn__content) {
    color: whitesmoke;
}

.g-btn::v-deep(.v-btn__overlay) {
    /* Targets overlay within a specific component */
    /* Custom styles here */
    background-color: #022250ff;
    position: relative;
}
</style>
