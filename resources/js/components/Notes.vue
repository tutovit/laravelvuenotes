<template>
    <div class="row justify-content-center mt-5">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">My Notes</div>
                <div class="card-body">
                    <form @submit.prevent="addNote">
                        <div v-for="(field, key) in fields" class="form-group" :key="key">
                            <label :for="'Input' + key">{{ field.caption }}:<span v-if="field.required" class="text-danger">*</span></label>
                            <input type="text" ref="notesInputs" @focus="clearError(key)" v-model="computed[key]" class="form-control" :class="{'is-invalid': field.errorText.length}" :id="'Input' + key"
                                   :placeholder="field.placeholder">
                            <small :id="key + 'Help'" class="form-text text-danger" v-html="field.errorText"></small>
                        </div>
                        <div class="form-text text-danger" v-html="serverError"></div>
                        <button type="submit" class="btn btn-primary float-right">Add the new note</button>
                    </form>
                </div>
            </div>

            <table class="table" v-if="notes.length">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Text</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="row in notes" :key="row.id">
                    <th scope="row" v-html="row.name"></th>
                    <td v-html="row.text"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data: () => {
        return {
            fields: {
                noteName: {
                    caption: 'Name',
                    type: 'text',
                    placeholder: 'Enter name for your note',
                    required: true,
                    minLength: 2,
                    value: '',
                    errorText: ''
                },
                noteText: {
                    caption: 'Text',
                    type: 'text',
                    placeholder: 'Enter text for your note',
                    required: true,
                    minLength: 3,
                    value: '',
                    errorText: ''
                }
            }
        }
    },
    mounted() {
        this.$refs.notesInputs[0].focus();
        this.getNotes();
    },
    computed: {
        ...mapState({
            notes: state => state.notes,
            serverError: state => state.serverError,
        }),
        computed: function () {
            return this;
        },
        noteName: {
            get() {
                return this.fields.noteName.value
            },
            set(val) {
                this.fields.noteName.value = val;
            },
        },
        noteText: {
            get() {
                return this.fields.noteText.value
            },
            set(val) {
                this.fields.noteText.value = val;
            },
        }
    },
    methods: {
        clearError: function (key) {
            this.fields[key].errorText = '';
        },
        getNotes: function () {
            this.$store.dispatch('getNotes');
        },
        addNote: function () {
            if (true || this.validateForm()) {
                this.$store.dispatch('addNote', {
                    'name': this.noteName,
                    'text': this.noteText,
                }).then(() => {
                    this.getNotes();
                })
            }
        },
        validateForm: function () {
            let hasError = false;
            for (let i in this.fields) {
                if (this.fields[i].required) {

                    if (this.fields[i].minLength > 0 && this.fields[i].value.length < this.fields[i].minLength) {
                        this.fields[i].errorText = 'Minimum ' + this.fields[i].minLength + ' chars';
                        hasError = true;
                    }

                    if (this.fields[i].value.length === 0) {
                        this.fields[i].errorText = 'Field ' + this.fields[i].caption + ' is required';
                        hasError = true;
                    }
                }
            }

            return hasError;
        }
    }
}
</script>
