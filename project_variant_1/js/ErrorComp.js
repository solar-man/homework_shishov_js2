Vue.component('error', {
    props: ['text', 'isVisible'],
    template: `
    <div class="error-block" v-if="isVisible"> 
        <p class="error-msg">
            {{ text }}
        </p>
    </div>
 `
});