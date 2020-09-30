Vue.component('errorfield', {
    props: ['errors'],
    template: `
    <div class="error-block">
    {{errors}}
</div>
 `
})