<template>
    <div
        class="m-2 is-flex"
        :class="isSelf ? 'is-justify-content-flex-end' : ''"
    >
        <div class="is-flex is-flex-direction-column">
            <div class="is-flex">
                <img class="avatar mt-2" :src="photoUrl" />
                <div
                    class="p-3 ml-1 is-flex"
                    :class="
                        isSelf ? ' msg-self is-justify-content-flex-end' : 'msg'
                    "
                >
                    {{ text }}
                </div>
            </div>
            <span v-if="!isSelf" class="has-text-white is-flex is-size-7"
                >{{ name }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Message',
    props: {
        name: { type: String, default: '' },
        photoUrl: { type: String, default: '' },
        isSelf: { type: Boolean, default: false },
        text: { type: String, default: '' },
    },
};
</script>

<style>
.msg-box {
    /* width: ; */
}
.msg {
    background: #374151;
    color: white;
    border-radius: 2rem;
    width: 250px;
    /* width: 35%; */
}
.msg-self {
    background: #065f46;
    color: white;
    border-radius: 2rem;
    width: 250px;
    /* width: 35%; */
    /* align-items: flex-start; */
}
.avatar {
    height: 2rem;
    width: 2rem;
    border-radius: 9999px;
}
</style>
