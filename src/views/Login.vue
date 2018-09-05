<template>
    <v-container>
        <v-snackbar
                v-model="snackBar"
                :timeout="4000"
                multi-line
                top
                vertical
        >
            {{ text }}
            <v-btn
                    color="pink"
                    flat
                    @click="snackBar = false"
            >
                Close
            </v-btn>
        </v-snackbar>
        <v-layout align-center justify-center>
            <v-flex xs7>
                <v-card class="pl-4 pr-4 pt-5 pb-5">
                    <v-tabs
                            v-model="active"
                            color="rgba(0, 0, 0, 0)"
                            light
                            grow
                            slider-color="yellow"
                            centered
                    >
                        <v-tab
                                v-for="i in tabs"
                                :key="i.key"
                                ripple
                                class="black--text">
                            {{i.name}}
                        </v-tab>
                        <v-tab-item
                                v-for="i in tabs"
                                class="mt-3"
                                :key="i.key"
                                ripple>
                            <v-form ref="form" v-model="valid" v-if="i.key === 'signin'">
                                <v-text-field
                                        v-model="email"
                                        label="Email"
                                        :rules="emailRules"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        class="mt-2"
                                        v-model="password"
                                        :rules="passwordRules"
                                        :append-icon="show1 ? 'visibility_off' : 'visibility'"
                                        :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1"
                                        label="Password"
                                        required
                                ></v-text-field>
                                <v-layout align-center justify-center class="mt-2">
                                    <v-flex sm12 style="text-align: center">
                                        <v-btn
                                                :disabled="!valid"
                                                @click.prevent="signInWithCredential"
                                                color="info"
                                                block
                                                large
                                        >
                                            Sign In
                                        </v-btn>
                                    </v-flex>


                                </v-layout>
                                <v-layout align-center justify-center row wrap>
                                    <v-flex sm12 class="text-xs-center mt-3">
                                        <span class="subheading font-weight-bold">OR</span>
                                    </v-flex>
                                    <v-flex sm12 class="text-xs-center">
                                        <v-btn color="info" @click="signInWithFacebook">
                                            <v-icon class="mr-3">fab fa-facebook-square</v-icon>
                                            Facebook
                                        </v-btn>
                                        <v-btn color="red" class="white--text" @click="signInWithGoogle">
                                            <v-icon class="mr-3">fab fa-google</v-icon>
                                            Google
                                        </v-btn>
                                    </v-flex>
                                </v-layout>
                            </v-form>

                            <v-form ref="form" v-model="registerValid" v-if="i.key === 'register'">
                                <v-text-field
                                        v-model="registerEmail"
                                        label="Email"
                                        :rules="emailRules"
                                        required
                                ></v-text-field>
                                <v-text-field
                                        v-model="registerPassword"
                                        label="Password"
                                        :append-icon="show2 ? 'visibility_off' : 'visibility'"
                                        :type="show2 ? 'text' : 'password'"
                                        :rules="passwordRules"
                                        @click:append="show2 = !show2"
                                        required
                                ></v-text-field>
                                <v-layout align-center justify-center>
                                    <v-flex sm12 style="text-align: center">
                                        <v-btn
                                                :disabled="!registerValid"
                                                @click.prevent="registerWithCredential"
                                                color="info"
                                                block
                                        >
                                            Register
                                        </v-btn>

                                    </v-flex>
                                </v-layout>
                            </v-form>
                        </v-tab-item>
                    </v-tabs>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    import axios from 'axios'
    import db from '@/services/firebaseServices'
    import Firebase from 'firebase'
    import Store from 'store'
    import VTabs from "vuetify/src/components/VTabs/VTabs";
    import VTab from "vuetify/src/components/VTabs/VTab";
    import VTabItem from "vuetify/src/components/VTabs/VTabItem";

    export default {
        components: {VTabItem, VTab, VTabs},
        data: () => ({
            active: 0,
            snackBar: false,
            text: '',
            show1: false,
            show2: false,
            tabs: [
                {
                    key: 'signin',
                    name: 'Sign In'
                },
                {
                    key: 'register',
                    name: 'Register'
                }
            ],
            password: "",
            registerEmail: '',
            registerPassword: '',
            valid: true,
            registerValid: true,
            name: '',
            passwordRules: [
                v => !!v || 'Password is required'
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
            signInWithGoogle () {
                let provider = new Firebase.auth.GoogleAuthProvider();
                Firebase.auth().signInWithPopup(provider).then((res) => {
                    this.$store.dispatch('setUser', res.user);
                    this.$router.push({name: 'Home'})
                }).catch((error) => {
                    this.text = error.message;
                    this.snackBar = true;
                });
            },
            signInWithFacebook () {
                let provider = new Firebase.auth.FacebookAuthProvider();
                Firebase.auth().signInWithPopup(provider).then((res) => {
                    this.$store.dispatch('setUser', res.user);
                    this.$router.push({name: 'Home'})
                }).catch((error) => {
                    this.text = error.message;
                    this.snackBar = true;
                });
            },
            registerWithCredential() {
                Firebase.auth().createUserWithEmailAndPassword(this.registerEmail, this.registerPassword).then((res) => {
                    this.active = 0
                    this.snackBar = true;
                    this.text = "You have successfully created the account! Please Log In";
                    console.log(res)
                }).catch((error) => {
                    this.text = error.message;
                    this.snackBar = true;
                });
            },
            signInWithCredential() {
                console.log(this.active)
                Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then((res) => {
                    this.$store.dispatch('setUser', res.user);
                    this.$router.push({name: 'Home'})
                }).catch((error) => {
                    this.text = error.message;
                    this.snackBar = true;
                });
            },
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