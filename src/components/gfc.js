Vue.component('gfc', {
    template: `
        <div class="sarcasm center">
            <h2 class="text" v-html="random"></h2>
            
            <h1 class="bold italic">Good fucking call, bro...</h1>
            
            <div class="refresh center small">
                <a href="#" @click.prevent="getRandom()">another?</a>
            </div>
        </div>
    `,
    
    props: ['random'],
    
    methods: {
        getRandom() {
            this.$emit('refresh');
        }
    }
});
