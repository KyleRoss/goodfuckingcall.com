/*global pegasus, Vue */
(function(window) {
    window.GFC = window.CFC || new Vue({
        el: '#app',
        data: {
            sarcasms: [],
            categories: [],
            category: null,
            random: ''
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
                let file = `/categories/${this.category}.json`;
                
                pegasus(file).then(fun => {
                    this.sarcasms = fun.length? fun : ['Category is empty'];
                    this.getRandom();
                }, e => {
                    this.sarcasms = ['This site is broken'];
                    console.error(e);
                    this.getRandom();
                });
            },
            
            getRandom() {
                let funs = this.sarcasms,
                    rand = funs[Math.floor(Math.random()*funs.length)];
                    
                this.random = rand;
            }
        },
        
        created() {
            this.category = window.location.pathname.replace(/^\//, '') || 'default';
            
            if(this.category !== 'default') {
                document.title = `Good Fucking ${this.category} Call, Bro...`;
            }
            
            this.getCategories();
            this.getSarcasms();
        }
    });
}(window));
