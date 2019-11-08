export default class Manager {
    constructor () {
        this.refs = {}
    }
    add(ref){
        if(!this.refs['node']){
            this.refs['node'] = []
        }
        this.refs['node'].push(ref)
    }
}