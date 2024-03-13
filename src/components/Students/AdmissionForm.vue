<template>
<v-form v-model="valid">
    <v-container class="add-student-container">
        <v-span>
            <v-h1>Student Particulars</v-h1>
        </v-span>
        <v-divider :thickness="1"> </v-divider>

        <v-row style="padding: 10px;">
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-arrow-right" label="First name" variant="outlined" v-model="firstname" required></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-arrow-right" label="Last Name" variant="outlined" v-model="lastname"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-id-card" label="National ID No" variant="outlined" v-model="nationalidno"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-email-variant" label="Email" variant="outlined" type="email" placeholder="example@gmail.com" v-model="email"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-cellphone" label="Contact No" variant="outlined" v-model="contactno"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-arrow-right" label="Nationality" variant="outlined" v-model="nationality"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-star-crescent" label="Religion" variant="outlined" v-model="religion"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-select density="compact" clearable prepend-inner-icon="mdi-gender-male-female" label="Gender" variant="outlined" :items="['Male','Female']" v-model="geneder"></v-select>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-map-marker" label="Permanent Address" variant="outlined" v-model="permanentaddress"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-select density="compact" clearable prepend-inner-icon="mdi-map-marker" label="District" variant="outlined" v-model="district" :items="['Karak', 'Bannu', 'Lakki Marwat', 'Kohat', 'Mardan']"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-select density="compact" clearable prepend-inner-icon="mdi-map-marker" label="Province" variant="outlined" v-model="province" :items="['Pakistan']"></v-select>
            </v-col>
            <v-col cols="12" md="6">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-map-marker" label="Current Address" variant="outlined" v-model="currentaddress"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-select density="compact" clearable prepend-inner-icon="mdi-map-marker" label="District" variant="outlined" v-model="district1" :items="['Karak', 'Bannu', 'Lakki Marwat', 'Kohat', 'Mardan']"></v-select>
            </v-col>
            <v-col cols="12" md="3">
                <v-select density="compact" clearable prepend-inner-icon="mdi-map-marker" label="Province" variant="outlined" v-model="province1" :items="['Pakistan']"></v-select>
            </v-col>
        </v-row>
        <v-span>
            <v-h1>Guardian Particulars</v-h1>
        </v-span>
        <v-divider :thickness="1"> </v-divider>
        <v-row style="padding: 10px;">
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-arrow-right" label="Guardian name" variant="outlined" v-model="gurdianname"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-id-card" label="National ID No" variant="outlined" v-model="nationalidno1"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-cellphone" label="Contact No" variant="outlined" v-model="contactno1"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
                <v-text-field density="compact" clearable prepend-inner-icon="mdi-account-hard-hat" label="Occupation" variant="outlined" v-model="occupation"></v-text-field>
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
                <v-btn class="btn-1" prepend-icon="mdi-check-circle" variant="outlined" size="small" rounded="lg">Submit</v-btn>

            </v-col>
        </v-row>
    </v-container>
</v-form>
</template>

<script>
export default {
    data() {
        return {
            firstname: "",
            lastname: "",
            nationalidno: "",
            email: "",
            contactno: "",
            nationality: "",
            geneder: "",
            permanentaddress: "",
            district: "",
            province: "",
            currentaddress: "",
            district1: "",
            province1: "",
            gurdianname: "",
            contactno1: "",
            nationalidno1: "",
            occupation: ""
        };
    },
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
    color: whitesmoke ;
}
.btn-1::v-deep(.v-btn__content) {
    color: whitesmoke ;
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
