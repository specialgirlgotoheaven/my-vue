function Watcher(vm,node,name,type){
    Dep.target = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.type = type;
    this.update();
    Dep.target = null;
}
Watcher.prototype = {
    update:function (){
        this.get();
        this.node[this.type] = this.value;//订阅者执行相应操作
    },
    get: function(){
        // !!!核心
        // this.value 设置成员属性 helloworld 取出来，通知observer ->dep
        // this.vm => 实例 get ->text ->dep ->add
        this.value = this.vm[this.name];//触发相应属性的get
    }
}