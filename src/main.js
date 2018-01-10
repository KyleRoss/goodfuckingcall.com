window.GFC = window.GFC || new Vue({
    el: '#app',
    data: {
        sarcasms: [],
        categories: [],
        category: null,
        random: '',
        
        loading: true
    },
    
    methods: {
        getCategories() {
            pegasus('/categories.json').then(cats => {
                this.categories = cats;
            }, e => {
                this.categories = [];
                console.error(e);
            });
        },
        
        getSarcasms() {
            this.loading = true;
            let file = `/categories/${this.category}.json`;
            
            pegasus(file).then(fun => {
                this.setSarcasms(fun.length? fun : ['Category is empty']);
            }, e => {
                console.error(e);
                this.setSarcasms(['This site is broken']);
            });
        },
        
        setSarcasms(sarcasms) {
            this.sarcasms = sarcasms;
            this.getRandom();
            this.loading = false;
        },
        
        getRandom() {
            let funs = this.sarcasms,
                rand = funs[Math.floor(Math.random()*funs.length)];
                
            this.random = rand;
        },
        
        transformCategory(name) {
            if(!name) return name;
            return name.replace(/-/g, ' ');
        },
        
        setCategory(category) {
            this.category = category || 'default';
            document.title = 
                this.category !== 'default'?
                    `Good Fucking ${this.transformCategory(this.category)} Call, Bro...` :
                    'Good Fucking Call';
            
            this.getSarcasms();
        }
    },
    
    created() {
        this.setCategory(window.location.pathname.replace(/^\//, '') || 'default');
        this.getCategories();
    }
});
