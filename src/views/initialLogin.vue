<template>
    <v-container>
        <v-layout align-center justify-center>
            <v-flex xs6>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                            v-model="email"
                            label="email"
                            required
                    ></v-text-field>
                    <v-text-field
                            v-model="password"
                            label="password"
                            required
                    ></v-text-field>
                    <v-layout align-center justify-center>
                    <v-flex sm12 style="text-align: center">
                    <v-btn
                            :disabled="!valid"
                            @click="submit"
                            color="info"
                    >
                        Sign in
                    </v-btn>
                    </v-flex>
                    </v-layout>
                </v-form>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import axios from 'axios'

    export default {
        data: () => ({
            valid: true,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters'
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            select: null,
            items: [
                'Item 1',
                'Item 2',
                'Item 3',
                'Item 4'
            ],
            checkbox: false
        }),
        methods: {
            submit() {
                if (this.$refs.form.validate()) {
                    // Native form submission is not yet supported
                    axios.post('/api/submit', {
                        name: this.name,
                        email: this.email,
                        select: this.select,
                        checkbox: this.checkbox
                    })
                }
            },
            clear() {
                this.$refs.form.reset()
            }
        }
    }
</script>