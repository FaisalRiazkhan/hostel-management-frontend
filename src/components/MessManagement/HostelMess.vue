<template>
<v-container class="room-container">
    <v-row>
        <v-col cols="12" md="3" style="display: flex">
            <v-text-field density="compact" clearable variant="outlined" v-model="day" label="Day" required></v-text-field>
        </v-col>
        <!-- <v-col cols="12" md="3" style="display: flex;">
            <v-text-field density="compact" clearable variant="outlined" v-model="cnic_no" label="" required></v-text-field>
        </v-col> -->
        <v-btn class="search-button" prepend-icon="mdi-text-search-variant" variant="outlined" elevation="10" size="small" rounded="lg">Search</v-btn>
    </v-row>
    <v-sheet class="table-sheet">
        <v-data-table id="menu-table" :headers="headers" :items="desserts" item-key="Day" class="data-table" items-per-page="7" height="400px" fixed-header>
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Add Item</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="800px">
                        <template v-slot:activator="{ props }">
                            <v-btn v-if="hasPermission('user_create_menu')" prepend-icon="mdi-plus-circle" variant="outlined" density="compact" id="btn-additem" v-bind="props">
                                Add
                            </v-btn>
                            <v-btn @click="generatePDF" prepend-icon="mdi-file-pdf-box" variant="outlined" density="compact" id="btn-generatePdf">
                                pdf
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="12" md="12">
                                            <!-- <v-select v-model="selectedDay" :items="daysOfWeek" label="Day" outlined dense clearable @change="handleDayChange"></v-select> -->
                                            <v-text-field v-model="editedItem.day" label="Day" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="editedItem.breakfastitem" label="Breakfast Item" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="editedItem.breakfasttiming" label="Breakfat Time" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="editedItem.lunchfooditem" label="Lunch Item" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="editedItem.lunchtiming" label="Lunch Time" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="editedItem.dinnerfooditem" label="Dinner Item" variant="outlined" density="compact" clearable></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="editedItem.dinnertiming" label="Dinner Time" variant="outlined" density="compact" clearable></v-text-field>
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
                                <v-btn id="btn-cancelClass" variant="outlined" density="compact" @click="closeDelete">Cancel</v-btn>
                                <v-btn id="btn-saveClass" variant="outlined" density="compact" @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon  size="small" class="me-2" @click="editItem(item)"  v-if="hasPermission('user_update_menu')"> mdi-pencil </v-icon>
                <v-icon size="small" @click="deleteItem(item)" v-if="hasPermission('user_delete_menu')"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
    </v-sheet>
</v-container>
</template>

<script>
import {
    jsPDF
} from "jspdf";
import autoTable from 'jspdf-autotable'
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            dialog: false,
            dialogDelete: false,
            day: '',
            headers: [{
                    title: 'S.No',
                    key: 's_no'
                },
                {
                    title: 'Day',
                    key: 'day'
                },
                {
                    title: 'BreakFast',
                    key: 'breakfast',
                    align: 'center',
                    children: [{
                            title: 'Food Item',
                            key: 'breakfastitem'
                        },
                        {
                            title: 'Timing',
                            key: 'breakfasttiming'
                        }
                    ]
                },
                {
                    title: 'Lunch',
                    key: 'lunch',
                    align: 'center',
                    children: [{
                            title: 'Food Item',
                            key: 'lunchfooditem'
                        },
                        {
                            title: 'Timing',
                            key: 'lunchtiming'
                        }
                    ]
                },
                {
                    title: 'Dinner',
                    key: 'dinner',
                    align: 'center',
                    children: [{
                            title: 'Food Item',
                            key: 'dinnerfooditem'
                        },
                        {
                            title: 'Timing',
                            key: 'dinnertiming'
                        }
                    ]
                },
                {
                    title: 'Actions',
                    key: 'actions',
                    sortable: false
                }
            ],
            desserts: [],
            pdfDoc: null,
            editedIndex: -1,
            editedItem: {
                day: '',
                breakfastitem: '',
                breakfasttiming: '',
                lunchfooditem: '',
                lunchtiming: '',
                dinnerfooditem: '',
                dinnertiming: ''
            },
            defaultItem: {
                day: '',
                breakfastitem: '',
                breakfasttiming: '',
                lunchfooditem: '',
                lunchtiming: '',
                dinnerfooditem: '',
                dinnertiming: ''
            }
        }
    },
    computed: {
        ...mapGetters('auth', ['hasPermission']),
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        }
    },

    created() {
        this.initialize()
        if (this.$store.getters['auth/isAuthenticated']) {
         this.$store.dispatch('auth/fetchUser');
    }
    },

    methods: {
        initialize() {
            this.desserts = [{
                    s_no: '1',
                    day: 'Monday',
                    breakfastitem: 'Chaye +  Parata',
                    breakfasttiming: '07.00 AM to 08:00 AM ',
                    lunchfooditem: 'Mash Dhal',
                    lunchtiming: '01:00 PM to 02:30 PM',
                    dinnerfooditem: 'Chiken Kharaie',
                    dinnertiming: '08:00 PM to 10:00 PM'
                },
                {
                    s_no: '2',
                    day: 'Tuesday',
                    breakfastitem: 'Chaye +  Parata + Egg fried',
                    breakfasttiming: '07.00 AM to 08:00 AM ',
                    lunchfooditem: 'Mix Sabzi',
                    lunchtiming: '01:00 PM to 02:30 PM',
                    dinnerfooditem: 'Chicken Khorma',
                    dinnertiming: '08:00 PM to 10:00 PM'
                },
                {
                    s_no: '3',
                    day: 'Wednesday',
                    breakfastitem: 'Chaye +  Halwa pori',
                    breakfasttiming: '07.00 AM to 08:00 AM ',
                    lunchfooditem: 'Dhaal Chawal',
                    lunchtiming: '01:00 PM to 02:30 PM',
                    dinnerfooditem: 'Beef Qeema',
                    dinnertiming: '08:00 PM to 10:00 PM'
                },
                {
                    s_no: '4',
                    day: 'Thursday',
                    breakfastitem: 'Chaye +  Parata',
                    breakfasttiming: '07.00 AM to 08:00 AM ',
                    lunchfooditem: 'Lobia',
                    lunchtiming: '01:00 PM to 02:30 PM',
                    dinnerfooditem: 'Mix Sabzi',
                    dinnertiming: '08:00 PM to 10:00 PM'
                },
                {
                    s_no: '5',
                    day: 'Friday',
                    breakfastitem: 'Chaye +  Parata + Cholay',
                    breakfasttiming: '07.00 AM to 08:00 AM ',
                    lunchfooditem: 'Chines Rice',
                    lunchtiming: '01:00 PM to 02:30 PM',
                    dinnerfooditem: 'Chicken Haleem',
                    dinnertiming: '08:00 PM to 10:00 PM'
                },
                {
                    s_no: '6',
                    day: 'Saturday',
                    breakfastitem: 'Chaye +  Parata',
                    breakfasttiming: '07.00 AM to 08:00 AM ',
                    lunchfooditem: 'Channa Dhal',
                    lunchtiming: '01:00 PM to 02:30 PM',
                    dinnerfooditem: 'Chicken Kharaie',
                    dinnertiming: '08:00 PM to 10:00 PM'
                },
                {
                    s_no: '7',
                    day: 'Sunday',
                    breakfastitem: 'Chaye +  Parata + Salan Special',
                    breakfasttiming: '11.00 AM to 01:00 PM ',
                    lunchfooditem: 'Chicken Haleem',
                    lunchtiming: '01:00 PM to 02:30 PM',
                    dinnerfooditem: 'Chicken Qeema',
                    dinnertiming: '08:00 PM to 10:00 PM'
                }
            ]
        },
        // generatePDF() {
        //     console.log('Generating PDF...');
        //     const doc = new jsPDF();
        //     doc.autoTable({
        //         html: 'menu-table'
        //     }); // Assuming your table has id="menu-table"
        //     // doc.save('menu.pdf');
        //     doc.output('dataurlnewwindow')
        //     console.log('Generating PDF...complete');
        // },
        generatePDF() {
            // Default export is a4 paper, portrait, using millimeters for units
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "in",
            });
            doc.setFontSize(16);
            doc.text("Hostel Mess Menu", 4, 0.4);
            // Define table headers and data
            const headers = ['S.No', 'Day', 'Breakfast', 'Timing', 'Lunch', 'Timing', 'Dinner', 'Timing'];
            const rows = this.desserts.map(dessert => {
                return [
                    dessert.s_no,
                    dessert.day,
                    dessert.breakfastitem, // Breakfast food item
                    dessert.breakfasttiming, // Breakfast timing
                    dessert.lunchfooditem, // Lunch food item
                    dessert.lunchtiming, // Lunch timing
                    dessert.dinnerfooditem, // Dinner food item
                    dessert.dinnertiming // Dinner timing
                ];
            });

            // Add headers to PDF
            doc.autoTable({
                head: [headers],
                body: rows,
                styles: {
                    cellPadding: 0.1,
                    fontSize: 10,
                    valign: 'middle',
                    halign: 'center'
                },
                columnStyles: {
                    0: {
                        halign: 'center'
                    }, // Align S.No column to center
                    1: {
                        halign: 'center'
                    }, // Align Day column to center
                    2: {
                        fontStyle: 'bold'
                    }, // Bold font for Breakfast header
                    4: {
                        fontStyle: 'bold'
                    }, // Bold font for Lunch header
                    6: {
                        fontStyle: 'bold'
                    }, // Bold font for Dinner header
                }
            });
            // Convert the PDF to a Blob
            const pdfBlob = doc.output('blob');

            // Create a URL for the PDF content
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Open the PDF in a new window
            const newWindow = window.open(pdfUrl, '_blank');

            // Ensure the URL is revoked when the window is closed
            newWindow.addEventListener('beforeunload', () => {
                URL.revokeObjectURL(pdfUrl);
            });
            // doc.save("mess_menu.pdf");
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
        }
    }
}
</script>

<style scoped>
#btn-generatePdf {
    background-color: #083049ff;
    border: none;
    color: rgba(5, 20, 40, 0.404);
    margin-left: 5px;
}

#btn-generatePdf:hover {
    background-color: rgb(4, 13, 119);
    position: relative;
}

#btn-generatePdf::v-deep(.v-btn__overlay) {
    background-color: rgb(4, 13, 119);
    position: relative;
}

#btn-generatePdf::v-deep(.v-btn__content) {
    color: whitesmoke;
    position: relative;
}

#btn-generatePdf::v-deep(.v-btn__prepend) {
    color: whitesmoke;
    position: relative;
}
#btn-saveClass {
    background-color: #04724dff;
    border: none;
    color: rgba(5, 20, 40, 0.404);
}

#btn-saveClass:hover {
    background-color: rgb(4, 13, 119);
    position: relative;
}

#btn-saveClass::v-deep(.v-btn__overlay) {
    background-color: #083049ff;
    position: relative;
}

#btn-saveClass::v-deep(.v-btn__content) {
    color: whitesmoke;
}

#btn-cancelClass {
    background-color: #022250ff;
    border: none;
    color: rgba(5, 20, 40, 0.404);
}

#btn-cancelClass:hover {
    background-color: rgb(4, 13, 119);
    position: relative;
}

#btn-cancelClass::v-deep(.v-btn__overlay) {
    background-color: #022250ff;
    position: relative;
}

#btn-cancelClass::v-deep(.v-btn__content) {
    color: whitesmoke;
}

#btn-additem {
    background-color: #04724dff;
    border: none;
    color: rgba(40, 24, 5, 0.404);
}

#btn-additem:hover {
    background-color: rgb(4, 13, 119);
    position: relative;
}

#btn-additem::v-deep(.v-btn__overlay) {
    background-color: #022250ff;
    position: relative;
}

#btn-additem::v-deep(.v-btn__content) {
    color: whitesmoke;
    position: relative;
}

#btn-additem::v-deep(.v-btn__prepend) {
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
    background-color: rgb(4, 13, 119);
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
