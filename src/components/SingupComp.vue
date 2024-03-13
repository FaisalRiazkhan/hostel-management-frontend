<template>
<div class="main-container">
    <div class="overlay"></div>
    <v-container class="login-container">
        <v-row>
            <v-col cols="12" sm="8" md="4">
                <v-card class="login-wrapper">
                    <v-card-title class="headline text-center">
                        <v-icon>mdi-account-plus</v-icon> Sign Up
                    </v-card-title>
                    <!-- <v-alert v-if="Object.keys(errorList).length > 0" type="error" dismissible  outlined>
                        <v-row>
                            <v-col  cols="12" >
                                <v-row style="margin-bottom: 1px;">
                                    <v-col cols="12" v-for="(error, index) in errorList" :key="index">
                                        {{ error[0] }}
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-alert> -->
                    <!-- <v-alert>{{ errorMessages }}</v-alert> -->
                    <!-- comment -->
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <span class="error-message" v-if="errorList['first_name']">{{ errorList['first_name'][0] }}</span>
                                    <v-text-field class="input" clearable density="compact" prepend-inner-icon="mdi-account-arrow-right" variant="outlined" v-model="model.newUser.first_name" label="First Name" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <span class="error-message" v-if="errorList['last_name']">{{ errorList['last_name'][0] }}</span>
                                    <v-text-field clearable density="compact" prepend-inner-icon="mdi-account-arrow-right" variant="outlined" v-model="model.newUser.last_name" label="Last Name" required ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <span class="error-message" v-if="errorList['national_id_no']">{{ errorList['national_id_no'][0] }}</span>
                                    <v-text-field density="compact" clearable prepend-inner-icon="mdi-id-card" variant="outlined" v-model="model.newUser.national_id_no" label="CNIC" placeholder="0000011111112" required></v-text-field>

                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <span class="error-message" v-if="errorList['email']">{{ errorList['email'][0] }}</span>
                                    <v-text-field density="compact" clearable prepend-inner-icon="mdi-email-variant" variant="outlined" v-model="model.newUser.email" label="Email Address" placeholder="johndoe@gmail.com" type="email" required></v-text-field>

                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <span class="error-message" v-if="errorList['phone_number']">{{ errorList['phone_number'][0] }}</span>
                                    <v-text-field density="compact" clearable prepend-inner-icon="mdi-cellphone" variant="outlined" v-model="model.newUser.phone_number" label="Phone Number" placeholder="+920001111111" required></v-text-field>

                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="f1">
                                    <span class="error-message" v-if="errorList['password']">{{ errorList['password'][0] }}</span>
                                    <v-text-field density="compact" clearable prepend-inner-icon="mdi-cellphone" variant="outlined" v-model="model.newUser.password" label="Password" type="password" required></v-text-field>

                                </v-col>
                            </v-row>

                            <span class="error-message" v-if="errorList['password']">{{ errorList['password'][0] }}</span>
                            <v-text-field density="compact" clearable prepend-inner-icon="mdi-cellphone" variant="outlined" v-model="model.newUser.password_confirmation" label="Confirm Password" type="password" required></v-text-field>
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
    name: 'SingupCompVue',
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
            axios.post('http://127.0.0.1:8000/api/register', this.model.newUser)
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
    background-image: url('../assets/images/background4.jpg');
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
    background-size: cover;
    opacity: 90%;
    right:30%;
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
    margin-bottom: 10px;
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
