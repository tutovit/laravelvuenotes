import axios from "axios"

export default {
    state: {
        notes: []
    },
    getters: {
        getNotes(state) {
            return state.notes
        }
    },
    actions: {
        getNotes(context) {
            axios.get("api/notes").then((response) => {
                console.log(response.data.notes)
                context.commit("setNotes", response.data.notes)
            }).catch(() => {

            })
        },
        addNote(context, params) {
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                for (let field in params) {
                    formData.append(field, params[field])
                }
                axios.post("api/notes", formData).then((response) => {
                    resolve();
                }).catch((e) => {
                    reject(e);
                })
            })
        }
    },
    mutations: {
        setNotes(state, data) {
            return state.notes = data
        }
    }
}
