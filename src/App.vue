<template>
    <v-app>
        <v-toolbar
                app
                color="info"
                :clipped-left="clipped">
            <v-toolbar-title v-text="title" class="white--text"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu bottom left v-if="isAuthenticated">
                <v-avatar slot="activator" class="mr-4">
                    <img :src="getUserPicture" >
                </v-avatar>
                <v-card>
                    <v-list class="mb-0 pb-0">
                        <v-list-tile avatar>
                            <v-list-tile-avatar>
                                <img :src="getUserPicture">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                                <v-list-tile-title v-if="getUserName">{{getUserName}}</v-list-tile-title>
                                <v-list-tile-sub-title>{{getUserEmail || 'NO EMAIL AVAILABLE'}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-spacer></v-spacer>
                            <v-list-tile-action>
                            </v-list-tile-action>
                        </v-list-tile>
                        <v-divider></v-divider>
                        <v-list-tile @click="signOut">
                            <v-list-tile-action>
                                <v-icon>power_settings_new</v-icon>
                            </v-list-tile-action>
                            <v-list-tile-content>
                                <v-list-tile-title> Sign out</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </v-menu>
        </v-toolbar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>

<script>
    import HelloWorld from './components/HelloWorld'
    import store from 'store'

    export default {
        name: 'App',
        components: {
            HelloWorld
        },
        data() {
            return {
                clipped: false,
                drawer: true,
                fixed: false,
                items: [{
                    icon: 'bubble_chart',
                    title: 'Inspire'
                }],
                miniVariant: false,
                right: true,
                rightDrawer: false,
                title: 'Weather App'
            }
        },
        methods: {
            signOut () {
                store.remove('user')
                this.$store.dispatch('clearUser')
                this.$router.push({name: 'login'})
            }
        },
        computed:  {
            getUserPicture () {
                return this.$store.getters.getUser.photoURL
            },
            getUserName() {
                return this.$store.getters.getUser.displayName
            },
            isAuthenticated () {
                return this.$store.getters.isAuthenticated
            },
            getUserEmail () {
                return this.$store.getters.getUser.email
            }
        }
    }
</script>
