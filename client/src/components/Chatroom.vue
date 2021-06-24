<template>
    <div class="stack-div is-flex is-flex-direction-column">
        <div class="chatroom">
            <span
                v-for="{ id, text, userName, isSelf, photoURL } in messages"
                :key="id"
                ><Message
                    :text="text"
                    :name="userName"
                    :photo-url="photoURL"
                    :isSelf="isSelf"
                />
            </span>
            <div class="scrollRef" ref="scrollRef"></div>
        </div>
        <div><Auth /></div>
    </div>
</template>

<script>
import Message from '@/components/Message.vue';
import Auth from '@/components/Auth.vue';
import { firestore } from '@/firebase';

export default {
    name: 'Chatroom',
    components: { Message, Auth },
    mounted() {
        const vm = this;

        const messagesCollection = firestore.collection('messages');
        const messagesQuery = messagesCollection
            .orderBy('createdAt', 'desc')
            .limit(100);
        this.unsubscribe = messagesQuery.onSnapshot((snapshot) => {
            this.messages = snapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    text: doc.data().text,
                    photoURL: doc.data().userPhotoURL,
                    userName: doc.data().userName,
                    isSelf:
                        vm.$store.state.user === null
                            ? false
                            : vm.$store.state.user.uid === doc.data().userId,
                }))
                .reverse();
        });
    },
    unmounted() {
        this.unsubscribe();
    },
    data() {
        return {
            messages: [],
            unsubscribe: null,
        };
    },
    watch: {
        messages: {
            handler() {
                const el = this.$refs.scrollRef;
                if (el) {
                    this.$nextTick(() => {
                        el.scrollIntoView({ behavior: 'smooth' });
                    });
                }
            },
            deep: true,
        },
    },
};
</script>

<style>
::-webkit-scrollbar {
    width: 5px;
    border-radius: 10px;
}
::-webkit-scrollbar-track {
    margin-top: 20px;
    margin-bottom: 20px;
}
/* Handle */
::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
}
.stack-div {
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 30%;
    right: 30%;
}
.chatroom {
    background: #1f2937;
    border-radius: 25px;
    overflow-y: scroll;
    /* margin-top: -50px;
    margin-left: -50px; */
    /* width: 75vh; */
    height: 75vh;
}
</style>
