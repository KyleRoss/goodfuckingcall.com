Vue.component('gfc', {
    template: `
        <div class="sarcasm center">
            <h2 class="text" v-html="format(random)"></h2>
            
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
        },
        
        format(text) {
            text = text.replace(/:(.*?):/g, function(match) {
                return '<i class="em-svg em-'+ (match.replace(/:/g, '')) + '"></i>';
            });
            
            return text;
        }
    }
});
