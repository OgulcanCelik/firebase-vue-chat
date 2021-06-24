<template>
    <div
        class="is-flex is-flex-direction-row control"
        v-if="isLoggedIn"
        v-on:keyup.enter="sendMessage()"
    >
        <input
            class="input is-primary"
            v-model="message"
            placeholder="Type your chat message..."
            required
        />
        <button class="button is-primary" @click="sendMessage()">
            <span class="icon">
                <i class="fab fa-twitter"></i>
            </span>
            <span>Send</span>
        </button>
    </div>

    <div v-else>
        <button class="button is-dark" @click="signIn()">Log-in</button>
    </div>
</template>

<script>
import { provider, auth, firestore, serverTimestamp } from '@/firebase';

export default {
    name: 'Auth',

    data() {
        return {
            message: '',
        };
    },
    computed: {
        isLoggedIn() {
            return this.$store.state.user !== null;
        },
    },
    methods: {
        sendMessage() {
            const vm = this;
            const messagesCollection = firestore.collection('messages');

            messagesCollection
                .add({
                    userName: this.$store.state.user.name,
                    userId: this.$store.state.user.uid,
                    userPhotoURL: this.$store.state.user.photoURL,
                    text: this.message,
                    createdAt: serverTimestamp(),
                })
                .then(() => {
                    vm.message = '';
                });
        },
        signIn() {
            const vm = this;
            auth.signInWithPopup(provider)
                .then((result) => {
                    /** @type {firebase.auth.OAuthCredential} */
                    // const { credential } = result;

                    // This gives you a Google Access Token. You can use it to access the Google API.
                    // const token = credential.accessToken;
                    // The signed-in user info.
                    const { user } = result;
                    vm.$store.dispatch('setUser', {
                        name: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        photoURL: user.photoURL,
                    });
                    // console.log(user);
                    // ...
                })
                .catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                    // The email of the user's account used.
                    // const { email } = error;
                    // The firebase.auth.AuthCredential type that was used.
                    // const { credential } = error;
                    // ...
                });
        },
    },
};
</script>

<style></style>
