<template>
<v-form v-model="valid" @submit.prevent="addStudent">
    <v-container class="add-student-container">
        <v-span>
            <v-h1>Student Particulars</v-h1>
        </v-span>
        <v-divider :thickness="1"> </v-divider>

        <v-row style="padding: 10px;">
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-arrow-right" label="First name" variant="outlined" v-model="first_name" required></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-arrow-right" label="Last Name" variant="outlined" v-model="last_name"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-id-card" label="National ID No" variant="outlined" v-model="national_id_no"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-email-variant" label="Email" variant="outlined" type="email" placeholder="example@gmail.com" v-model="email"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-cellphone" label="Contact No" variant="outlined" v-model="contact_no"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-arrow-right" label="Nationality" variant="outlined" v-model="nationality"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-star-crescent" label="Religion" variant="outlined" v-model="religion"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-select density="compact" clearable prepend-inner-icon="mdi-gender-male-female" label="Gender" variant="outlined" :items="['Male','Female']" v-model="gender"></v-select>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-map-marker" label="Permanent Address" variant="outlined" v-model="permanent_address"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-select density="compact" clearable prepend-inner-icon="mdi-map-marker" label="District" variant="outlined" v-model="district" :items="['Karak', 'Bannu', 'Lakki Marwat', 'Kohat', 'Mardan']"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-select density="compact" clearable prepend-inner-icon="mdi-map-marker" label="Province" variant="outlined" v-model="province" :items="['KP','Punjab','Sind','Baluchistan','Gilgit Baldistan']"></v-select>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-map-marker" label="Current Address" variant="outlined" v-model="current_address"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-select density="compact" clearable prepend-inner-icon="mdi-map-marker" label="District" variant="outlined" v-model="current_district" :items="['Karak', 'Bannu', 'Lakki Marwat', 'Kohat', 'Mardan']"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-select density="compact" clearable prepend-inner-icon="mdi-map-marker" label="Province" variant="outlined" v-model="current_province" :items="['KP','Punjab','Sind','Baluchistan','Gilgit Baldistan']"></v-select>
            </v-col>
        </v-row>
        <v-span>
            <v-h1>Guardian Particulars</v-h1>
        </v-span>
        <v-divider :thickness="1"> </v-divider>
        <v-row style="padding: 10px;">
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-arrow-right" label="Guardian name" variant="outlined" v-model="guardian_name"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-id-card" label="National ID No" variant="outlined" v-model="guardian_id_no"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-cellphone" label="Contact No" variant="outlined" v-model="guardian_contact_no"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-hard-hat" label="Occupation" variant="outlined" v-model="guardian_occupation"></v-text-field>
            </v-col>
        </v-row>
        <!-- <v-checkbox  class="custom-checkbox" label="Do you agree?" required></v-checkbox> -->
        <!-- <v-row style="margin: 0px; padding:0px; height: 50px;">
            <v-col cols="12" md="2">

            </v-col>
        </v-row> -->
        <v-row style="margin: 0px; padding: 0px;">
            <v-col cols="12" md="2" class="btn-col-1">
                <!-- <v-btn  type="submit" block class="mt-2 btn-1" variant="outlined">Submit</v-btn> -->
                <v-btn class="btn-1" prepend-icon="mdi-check-circle" variant="outlined" type="submit" size="small" rounded="lg">Submit</v-btn>

            </v-col>
        </v-row>
    </v-container>
</v-form>
</template>

<script>
// import axios from 'axios';
import api from '../../axios/api';
export default {
    data() {
        return {
            first_name: "",
            last_name: "",
            national_id_no: "",
            email: "",
            contact_no: "",
            nationality: "",
            religion: "",
            gender: "",
            permanent_address: "",
            district: "",
            province: "",
            current_address: "",
            current_district: "",
            current_province: "",
            guardian_name: "",
            guardian_id_no: "",
            guardian_contact_no: "",
            guardian_occupation: ""
        };
    },
    methods: {
        addStudent() {
            // prepare student data to send it to addStudent api
            const studentData = {
                first_name: this.first_name,
                last_name: this.last_name,
                national_id_no: this.national_id_no,
                email: this.email,
                contact_no: this.contact_no,
                nationality: this.nationality,
                religion: this.religion,
                gender: this.gender,
                permanent_address: this.permanent_address,
                district: this.district,
                province: this.province,
                current_address: this.current_address,
                current_district: this.current_district,
                current_province: this.province1,
                guardian_name: this.current_province,
                guardian_id_no: this.guardian_id_no,
                guardian_contact_no: this.guardian_contact_no,
                guardian_occupation: this.guardian_occupation,
            };
            const token = localStorage.getItem('authToken');
            console.log(token);
            // Set token in the header
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            // post request to addStudent API
            api.post('/add_student', studentData, { headers })
                .then(response => {
                    // Handle success
                    console.log('Student added successfully', response.data);
                    // Optionally, you can reset the form after successful submission
                    // this.resetForm();
                })
                .catch(error => {
                    // Handle error
                    console.error('Error adding student', error.response.data);
                });
        },
        // resetForm() {
        //     // Reset form fields after successful submission
        //     this.first_name = '';
        //     this.last_name = '';
        //     this.national_id_no = '';
        //     this.email = '';
        //     this.contact_no = '';
        //     this.nationality = '';
        //     this.religion = '';
        //     this.gender = '';
        //     this.permanent_address = '';
        //     this.district = '';
        //     this.province = '';
        //     this.current_address = '';
        //     this.current_district = '';
        //     this.current_province = '';
        //     this.guardian_name = '';
        //     this.guardian_id_no = '';
        //     this.guardian_contact_no = '';
        //     this.guardian_occupation = '';
        // }

    }
}
</script>

<style scoped>
.add-student-container {
    color: #023047;
    padding-top: 20px;
    padding-right: 40px;
    padding-left: 40px;
}

.btn-1:hover {
    background-color: #022250ff;
}

.btn-1 {
    position: relative;
    width: 150px;
    background-color: #083049ff;
    color: rgba(5, 20, 40, 0.404);
    top: 70%;
    left: 290%;
}

.btn-1::v-deep(.v-btn__prepend) {
    color: whitesmoke;
}

.btn-1::v-deep(.v-btn__content) {
    color: whitesmoke;
}

.btn-1::v-deep(.v-btn__overlay) {
    background-color: #022250ff;
    position: relative;
    /* Add other custom styles for the overlay, like border effects etc. */
}

.v-col-md-3 {
    /* margin-top: 5px; */
    padding: 5px;
}

.v-col-md-6 {
    padding: 5px;
}

.v-row {
    margin-top: 5px;
}

/* .v-selection-control {
    top: 80%;
    left: 22%;
}
.custom-checkbox{
    background-color: #219ebc;
} */
/* .v-input.v-input__control{
    background-color: #219ebc;
} */
</style>
