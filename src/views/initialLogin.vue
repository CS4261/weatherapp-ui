<template>
    <v-container>
        <v-tabs
                b-model="active"
                color="info"
                slider-color="yellow">
            <v-tab
                    v-for="i in tabs"
                    :key="i"
                    ripple
            class="white--text">
                {{i}}
            </v-tab>
            <v-tab-item
                    v-for="i in tabs"
                    :key="i"
                    ripple>
                <v-layout align-center justify-center v-if="i === 'signin'">
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
                                        Google Sign in
                                    </v-btn>

                                    <v-btn
                                            :disabled="!valid"
                                            @click="submit"
                                            color="info"
                                    >
                                        Facebook sign in
                                    </v-btn>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-flex>
                </v-layout>

                <v-layout align-center justify-center v-if="i === 'register'">
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
                                        Register
                                    </v-btn>

                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-tab-item>
        </v-tabs>
    </v-container>

</template>

<script>
    import axios from 'axios'
    import VTabs from "vuetify/src/components/VTabs/VTabs";
    import VTab from "vuetify/src/components/VTabs/VTab";
    import VTabItem from "vuetify/src/components/VTabs/VTabItem";

    export default {
        components: {VTabItem, VTab, VTabs},
        data: () => ({
            active: 0,
            tabs: ["signin", "register"],
            password: "",
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