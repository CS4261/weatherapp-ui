import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import {
    Vuetify,
    VApp,
    VAutocomplete,
    VSubheader,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VSnackbar,
    VToolbar,
    transitions,
    VDivider,
    VForm,
    VCheckbox,
    VTextField,
    VSelect,
    VMenu,
    VCard,
    VAvatar
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'


Vue.use(Vuetify, {
    iconfont: 'fa',
    components: {
        VApp,
        VNavigationDrawer,
        VFooter,
        VAutocomplete,
        VSubheader,
        VList,
        VBtn,
        VIcon,
        VDivider,
        VGrid,
        VSnackbar,
        VMenu,
        VCard,
        VAvatar,
        VToolbar,
        transitions,
        VForm,
        VCheckbox,
        VTextField,
        VSelect,
    },
    theme: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
})
