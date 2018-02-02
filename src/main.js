window.GFC = window.GFC || new Vue({
    el: '#app',
    data: {
        categories: [],
        category: null,
        random: {},
        
        loading: true
    },
    
    methods: {
        getCategories() {
            pegasus('/.netlify/functions/categories').then(cats => {
                this.categories = cats;
            }, e => {
                this.categories = [];
                console.error(e);
            });
        },
        
        getRandom() {
            this.random = {};
            this.loading = true;
            
            let url = '/.netlify/functions/wtf';
            url += '?category=' + this.category;
            
            pegasus(url).then(fun => {
                this.random = fun;
                this.loading = false;
            }, e => {
                console.error(e);
                this.random = { error: 'This site is broken :skull:' };
                this.loading = false;
            });
        },
        
        transformCategory(name) {
            if(!name) return name;
            return name.replace(/-/g, ' ');
        },
        
        setCategory(category) {
            this.category = category || 'random';
            document.title = 
                this.category !== 'random'?
                    `${this.transformCategory(this.category)}, Good Fucking Call Bro...` :
                    'Good Fucking Call';
            
            this.getRandom();
        }
    },
    
    created() {
        this.setCategory(window.location.pathname.replace(/^\//, '') || 'random');
        this.getCategories();
    }
});
