import axios from "axios"

export default {
    state: {
        notes: [],
        serverError: ''
    },
    getters: {
        getNotes(state) {
            return state.notes
        }
    },
    actions: {
        getNotes(context) {
            axios.get("api/notes").then((response) => {
                context.commit("setNotes", response.data.notes)
            }).catch(() => {

            })
        },
        addNote(context, params) {
            context.commit("setError", '');
            return new Promise((resolve, reject) => {
                let formData = new FormData();
                for (let field in params) {
                    formData.append(field, params[field])
                }
                axios.post("api/notes", formData).then((response) => {
                    if (!response.data.success && response.data.message) {
                        context.commit("setError", response.data.message);
                    }
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
        },
        setError(state, data) {
            return state.serverError = data
        }
    }
}
