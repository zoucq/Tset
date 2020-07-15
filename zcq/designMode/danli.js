class Storage {

    static getInstance(){
        if(!this.instance){
            this.instance = new Storage()
        }
        return this.instance
    }

    setItem(key, value){
        return localStorage.setItem(key,value)
    }

    getItem(key){
        return localStorage.getItem(key)
    }

}


let a1 = Storage.getInstance() 
let a2 = Storage.getInstance()

console.log(a1 === a2)

a1.setItem('a',1)
console.log(a1.getItem('a'))
console.log(a2.getItem('a'))
