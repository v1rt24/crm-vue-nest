import {computed, watch, getCurrentInstance} from 'vue';
import {useStore} from 'vuex';

export const useMessage = () => {
    const store = useStore();
    const instance = getCurrentInstance()?.appContext.config.globalProperties!;

    const message = computed(() => {
        return store.getters['message/getMessage'];
    });

    watch(message, value => {
            if (value) {
                if (value?.type === 'error') {
                    return instance.$errorMessage(value.message);
                }

                instance.$successMessage(value.message);
            }
        },
    );
};