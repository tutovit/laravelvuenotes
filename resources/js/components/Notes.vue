<template>
    <div class="row justify-content-center mt-5">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">My Notes</div>
                <div class="card-body">
                    <form @submit.prevent="addNote">
                        <div class="form-group">
                            <label for="InputName">Name:</label>
                            <input type="text" v-model="noteName" class="form-control" id="InputName"
                                   placeholder="Enter name for your note">
                        </div>
                        <div class="form-group">
                            <label for="InputText">Text:</label>
                            <input type="text" v-model="noteText" class="form-control" id="InputText" aria-describedby="nameHelp"
                                   placeholder="Enter text for your note">
                        </div>
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
            noteName: '',
            noteText: ''
        }
    },
    mounted() {
        this.getNotes();
    },
    computed: {
        ...mapState({
            notes: state => state.notes,
        })
    },
    methods: {
        getNotes: function () {
            this.$store.dispatch('getNotes');
        },
        addNote: function () {
            this.$store.dispatch('addNote', {
                'name': this.noteName,
                'text': this.noteText,
            }).then(() => {
                this.getNotes();
            })
        }
    }
}
</script>
