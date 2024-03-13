<template>
<v-container class="room-container">
    <v-row>
        <v-col cols="12" md="3" style="display: flex;">
            <v-text-field density="compact" clearable variant="outlined" v-model="name" label="Student Name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="3" style="display: flex;">
            <v-text-field density="compact" clearable variant="outlined" v-model="cnic_no" label="CNIC" required></v-text-field>
        </v-col>
        <v-btn class="search-button" prepend-icon="mdi-text-search-variant" variant="outlined" elevation="10" size="small" rounded="lg">Search</v-btn>

    </v-row>
    <v-sheet class="table-sheet">
        <v-data-table :headers="headers" :items="desserts" item-key="name" class="data-table" density="compact" items-per-page="10" height="300px" fixed-header>
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Add Student</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ props }">
                            <v-btn  prepend-icon="mdi-plus-circle" id="btn-add-student" density="compact" variant="outlined" v-bind="props">Add</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container >
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.fullname" label="Full Name" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.fathername" label="Father Name" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.cnic" label="CNIC #" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.phone" label="Phone #" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.rentstatus" label="Rent Status" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" id="btn-cancelClass" variant="outlined" density="compact" @click="close">
                                    Cancel
                                </v-btn>
                                <v-btn color="blue-darken-1" id="btn-saveClass" variant="outlined" density="compact" @click="save">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn  id="btn-cancelClass" variant="outlined" density="compact" @click="closeDelete">Cancel</v-btn>
                                <v-btn  id="btn-saveClass" variant="outlined" density="compact" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="me-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" @click="deleteItem(item)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">
                    Reset
                </v-btn>
            </template>
        </v-data-table>
    </v-sheet>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            name: '',
            cnic_no: '',
            desserts: [],
            editedIndex: -1,
            editedItem: {
                fullname: '',
                fathername: '',
                cnic: '',
                phone: '',
                rentstatus: '',
            },
            defaultItem: {
                fullname: '',
                fathername: '',
                cnic: '',
                phone: '',
                rentstatus: '',
            },
            headers: [{
                    title: 'S.No',
                    key: 's_no',
                },
                {
                    title: ' Full Name',
                    key: 'fullname',
                },
                {
                    title: 'Father Name',
                    key: 'fathername'
                },
                {
                    title: 'CNIC #',
                    key: 'cnic'
                },
                {
                    title: 'Phone #',
                    key: 'phone'
                },
                {
                    title: 'Rent Status',
                    key: 'rentstatus'
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    sortable: false
                },
            ],
        }
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Add Student' : 'Add Student'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    created() {
        this.initialize()
    },
    methods: {
        initialize() {
            this.desserts = [{
                    s_no: "01",
                    fullname: 'Faisal Riaz',
                    fathername: 'Riaz ur rehman',
                    cnic: '14113-1234255-4',
                    phone: '+92324 4225226',
                    rentstatus: 'Paid',
                },
                {
                    s_no: "02",
                    fullname: 'Ali Khan',
                    fathername: 'Shafiq ur rehman',
                    cnic: '1423-1256256-5',
                    phone: '+92324 4984229',
                    rentstatus: 'UnPaid',
                },
                {
                    s_no: "03",
                    fullname: 'Shaheen Shah',
                    fathername: 'Muhammad Shah',
                    cnic: '1423-1234255-4',
                    phone: '+92324 4222875',
                    rentstatus: 'Paid',
                },
                {
                    s_no: "04",
                    fullname: 'Abdul Raziq',
                    fathername: 'Raziq ur rehman',
                    cnic: '14203-12342357-4',
                    phone: '+923124 4225295',
                    rentstatus: 'Paid',
                },
                {
                    s_no: "05",
                    fullname: 'Ali haider',
                    fathername: 'Haider ur rehman',
                    cnic: '14223-1234222-4',
                    phone: '+92324 42252982',
                    rentstatus: 'Paid',
                },
                {
                    s_no: "06",
                    fullname: 'Luqman Khan',
                    fathername: 'saif ur rehman',
                    cnic: '14213-1234762-4',
                    phone: '+92324 4225451',
                    rentstatus: 'UnPaid',
                },
                {
                    s_no: "07",
                    fullname: 'Faheem Ullah',
                    fathername: 'Wali ur rehman',
                    cnic: '14253-1234974-4',
                    phone: '+92134 4225984',
                    rentstatus: 'Paid',
                },
                {
                    s_no: "08",
                    fullname: 'Sabour Khan',
                    fathername: 'Kashif ur rehman',
                    cnic: '14253-5234125-4',
                    phone: '+92234 4225432',
                    rentstatus: 'Paid',
                },
                {
                    s_no: "09",
                    fullname: 'Imran Khan',
                    fathername: 'Imran Ateeq',
                    cnic: '14423-5634983-4',
                    phone: '+92324 8725982',
                    rentstatus: 'UnPaid',
                },
                {
                    s_no: "10",
                    fullname: 'Kara Ali',
                    fathername: 'Faiz ur rehman',
                    cnic: '14213-12342342-4',
                    phone: '+92324 4225961',
                    rentstatus: 'Paid',
                },
                {
                    s_no: "11",
                    fullname: 'Mehboob Alam',
                    fathername: 'Alam Noor',
                    cnic: '14293-9234763-5',
                    phone: '+92324 8225123',
                    rentstatus: 'Paid',
                },
                {
                    s_no: "12",
                    fullname: 'Farooq Khattak',
                    fathername: 'Shohab Ali',
                    cnic_no: '14253-12342234-0',
                    phone_no: '+92324 42259873',
                    rentstatus: 'UnPaid',
                },
                {
                    s_no: "13",
                    fullname: 'Danish Riaz',
                    fathername: 'Riaz Khan',
                    cnic: '1533-4534296-4',
                    phone: '+92324 2259782',
                    rentstatus: 'Paid',
                },
                // Add more items if needed
            ]
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>

<style scoped>
#btn-saveClass{
    background-color: #04724dff;
    border: none;
    color: rgba(5, 20, 40, 0.404);
}
#btn-saveClass:hover{
    background-color: rgb(4, 13, 119);
    position: relative;
}
#btn-saveClass::v-deep(.v-btn__overlay){
    background-color: #022250ff;
    position: relative;
}
#btn-saveClass::v-deep(.v-btn__content){
    color: whitesmoke;
}
#btn-cancelClass{
    background-color: #022250ff;
    border: none;
    color: rgba(5, 20, 40, 0.404);
}
#btn-cancelClass:hover{
    background-color:  rgb(4, 13, 119);
    position: relative;
}
#btn-cancelClass::v-deep(.v-btn__overlay){
    background-color: #022250ff;
    position: relative;
}
#btn-cancelClass::v-deep(.v-btn__content){
    color: whitesmoke;
}
#btn-add-student {
    background-color: #04724dff;
    border: none;
    color:  rgba(5, 20, 40, 0.404);
}

#btn-add-student:hover {
    background-color: rgb(4, 13, 119);
}

#btn-add-student::v-deep(.v-btn__overlay) {
    background-color: #022250ff;
    position: relative;
}

#btn-add-student::v-deep(.v-btn__content) {
    color: whitesmoke;
    position: relative;
}

#btn-add-student::v-deep(.v-btn__prepend) {
    color: whitesmoke;
    position: relative;
}

.room-container {
    margin-top: 10px;
}

.search-button {
    top: 18px;
    left: 15px;
    background-color: #083049ff;
    color: rgba(5, 20, 40, 0.404);
}

.search-button:hover {
    background-color:  rgb(4, 13, 119);
}

.search-button::v-deep(.v-btn__content) {
    color: whitesmoke;
    position: relative;

}

.search-button::v-deep(.v-btn__prepend) {
    color: whitesmoke;
    position: relative;

}

.search-button::v-deep(.v-btn__overlay) {
    background-color: #022250ff;
    position: relative;
}

.data-table {
    outline: 1px;
    /* margin-left: 5px;
    margin-right: 10px; */
    font-size: small;
}

.data-table.v-table--fixed-header::v-deep(.v-data-table__th) {
    background-color: #e3dfffff;
    color: #01070b;
}

.table-sheet {
    padding: 5px;
}
</style>
