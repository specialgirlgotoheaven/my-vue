function Compile(node,vm){//id节点，this对象
    
    if(node){
        this.$frag = this.nodeToFragment(node,vm);
        return this.$frag
    }
}
Compile.prototype ={
    nodeToFragment:function (node,vm){
        var self = this;
        var frag = document.createDocumentFragment();
        var child;
        
        while(child = node.firstChild){
            //当前元素的子节点 this
            self.compileElement(child,vm);
            frag.append(child);//将所有子节点添加到fragment中
        }
        return frag;
    },
    compileElement:function(node,vm){
        var reg = /\{\{(.*)\}\}/;
        if(node.nodeType === 1){ //节点类型为元素
            var attr = node.attributes;
            //解析属性
            for(var i=0;i<attr.length;i++){
                if(attr[i].nodeName == 'v-model'){
                    var name = attr[i].nodeValue;
                    node.addEventListener('input',function(e){
                        vm[name] = e.target.value;
                    })
                    new Watcher(vm,node,name,'value')
                }
            }
        }
        if(node.nodeType === 3){ //节点类型为text(文本)
            if(reg.test(node.nodeValue)){
                var name = RegExp.$1;
                name = name.trim();
                new Watcher(vm,node,name,'nodeValue');
            }
        }
    }
}