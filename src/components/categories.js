Vue.component('categories', {
    template: `
        <div class="categories center small">
            <span class="cat-link" v-for="cat in list" v-if="categories.length">
                [<a :href="cat.link" v-text="cat.text" @click="go($event, cat)" v-if="!cat.selected"></a><span v-else class="bold" v-text="cat.text"></span>]
            </span>
        </div>
    `,
    
    props: ['categories', 'category', 'transform', 'set'],
    
    computed: {
        list() {
            return this.categories.map(cat => {
                return {
                    id: cat,
                    link: `/${cat === 'default'? '' : cat}`,
                    text: this.transform(cat),
                    selected: cat === this.category
                };
            });
        }
    },
    
    methods: {
        hasHistoryAPI() {
            return !!(window.history && history.pushState);
        },
        
        go(e, cat) {
            if(e) e.preventDefault();
            if(!this.hasHistoryAPI()) {
                window.location = cat.link;
                return true;
            }
            
            window.history.pushState(null, null, cat.id === 'default'? '/' : cat.id);
            this.set(cat.id);
        }
    }
});
