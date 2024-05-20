<template>
<v-data-table class="data-table" :headers="headers" :items="desserts" fixed-header items-per-page="10" density="compact" height="300px">
    <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>Add New Room</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ props }">
                    <v-btn v-if="hasPermission('user_create_rooms')"  prepend-icon="mdi-plus-circle" variant="outlined" density="compact" id="btn-addRoom" v-bind="props">
                        Add Room
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedItem.Room_No" label="Room No" variant="outlined" density="compact" clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedItem.Seat_Reserved" label="Seat Reserved" variant="outlined" density="compact" clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedItem.Seat_available" label="Seat Available" variant="outlined" density="compact" clearable></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field v-model="editedItem.Total_Seats" label="Total Seats" variant="outlined" density="compact" clearable></v-text-field>
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
                        <v-btn color="blue-darken-1" id="btn-cancelClass" variant="outlined" density="compact" @click="closeDelete">Cancel</v-btn>
                        <v-btn color="blue-darken-1" id="btn-saveClass" variant="outlined" density="compact" @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
        <v-icon v-if="hasPermission('user_update_rooms')" size="small" class="me-2" @click="editItem(item)">
            mdi-pencil
        </v-icon>
        <v-icon v-if="hasPermission('user_delete_rooms')" size="small" @click="deleteItem(item)">
            mdi-delete
        </v-icon>
    </template>
    <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">
            Reset
        </v-btn>
    </template>
</v-data-table>
</template>

  
<script>
import { mapGetters } from 'vuex';
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [{
                title: 'Room #',
                align: 'start',
                // sortable: false,
                key: 'Room_No',
            },
            {
                title: 'Seat Reserved',
                key: 'Seat_Reserved',
                align: 'center'
            },
            {
                title: 'Seat Available',
                key: 'Seat_available',
                align: 'center'
            },
            {
                title: 'Total Seats',
                key: 'Total_Seats',
                align: 'center'
            },
            {
                title: 'Actions',
                key: 'actions',
                sortable: false,
                align: 'center'
            },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            Room_No: '',
            Seat_Reserved: '',
            Seat_available: '',
            Total_Seats: '',
        },
        defaultItem: {
            Room_No: '',
            Seat_Reserved: '',
            Seat_available: '',
            Total_Seats: '',
        },
    }),

    computed: {
        ...mapGetters('auth', ['hasPermission']),
        formTitle() {
            return this.editedIndex === -1 ? 'Add Room' : 'Edit Room Information'
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
                    Room_No: '01',
                    Seat_Reserved: 159,
                    Seat_available: 6.0,
                    Total_Seats: 24,
    
                },
                {
                    Room_No: '02',
                    Seat_Reserved: 237,
                    Seat_available: 9.0,
                    Total_Seats: 37,
    
                },
                {
                    Room_No: '03',
                    Seat_Reserved: 262,
                    Seat_available: 16.0,
                    Total_Seats: 23,
    
                },
                {
                    Room_No: '04',
                    Seat_Reserved: 305,
                    Seat_available: 3.7,
                    Total_Seats: 67,
    
                },
                {
                    Room_No: '05',
                    Seat_Reserved: 356,
                    Seat_available: 16.0,
                    Total_Seats: 49,
    
                },
                {
                    Room_No: '06',
                    Seat_Reserved: 375,
                    Seat_available: 0.0,
                    Total_Seats: 94,
    
                },
                {
                    Room_No: '07',
                    Seat_Reserved: 392,
                    Seat_available: 0.2,
                    Total_Seats: 98,
                },
                {
                    Room_No: '08',
                    Seat_Reserved: 408,
                    Seat_available: 3.2,
                    Total_Seats: 87,
    
                },
                {
                    Room_No: '09',
                    Seat_Reserved: 452,
                    Seat_available: 25.0,
                    Total_Seats: 51,
    
                },
                {
                    Room_No: '10',
                    Seat_Reserved: 518,
                    Seat_available: 26.0,
                    Total_Seats: 65,
                },
                {
                    Room_No: '11',
                    Seat_Reserved: 452,
                    Seat_available: 25.0,
                    Total_Seats: 51,
    
                },
                {
                    Room_No: '12',
                    Seat_Reserved: 518,
                    Seat_available: 26.0,
                    Total_Seats: 65,
                },
                {
                    Room_No: '13',
                    Seat_Reserved: 452,
                    Seat_available: 25.0,
                    Total_Seats: 51,
    
                },
                {
                    Room_No: '14',
                    Seat_Reserved: 518,
                    Seat_available: 26.0,
                    Total_Seats: 65,
                },
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
    background-color: rgb(4, 13, 119);
    position: relative;
}
#btn-cancelClass::v-deep(.v-btn__overlay){
    background-color: #022250ff;
    position: relative;
}
#btn-cancelClass::v-deep(.v-btn__content){
    color: whitesmoke;
}

#btn-addRoom{
    background-color: #04724dff;
    border: none;
    color: rgba(5, 20, 40, 0.404);
}
#btn-addRoom:hover{
    background-color: rgb(4, 13, 119);
    position: relative;
}
#btn-addRoom::v-deep(.v-btn__overlay){
    background-color: #022250ff;
    position: relative;
}
#btn-addRoom::v-deep(.v-btn__content){
    color: whitesmoke;
}
#btn-addRoom::v-deep(.v-btn__prepend){
    color: whitesmoke;
}
.data-table {
    /* outline: 1px; */
    /* margin-left: 5px;
    margin-right: 10px; */
    /* font-size: small; */
}

.data-table.v-table--fixed-header::v-deep(.v-data-table__th) {
    background-color: #e3dfffff;
    color: #01070b;
}
</style>
