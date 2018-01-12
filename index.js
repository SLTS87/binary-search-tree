function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;
}

function BinarySearchTree() {
    this._root = null;
}

BinarySearchTree.prototype.root = function(){
    if(!this._root){
        return undefined;
    }
    return this._root.value;
}

BinarySearchTree.prototype.insert = function(key, value){
    let node = new Node(key, value);
    
    if(!this._root){
        this._root = node;
    }
    else{
        let current = this._root;

        while(current){
            if(node.key < current.key){
                if(!current.left){
                    current.left = node;
                    break;
                }
                current = current.left;
            }
            else if(node.key > current.key){
                if(!current.right){
                    current.right = node;
                    break;
                }
                current = current.right;
            }
            else{
                break;
            }
        }
    }
    return this;
}

BinarySearchTree.prototype.getMin = function(node){
    if(!node){
        node = this._root;
    }
    while(node.left){
        node = node.left;
    }
    return node;
}

BinarySearchTree.prototype.delete = function(key){

    let removeNode = function(node, key){
        if(!node){
            return null;
        }
        if(key === node.key){
            if(!node.left && !node.right){
                return null;
            }
            if(!node.left){
                return node.right;
            }
            if(!node.right){
                return node.left;
            }

            node.key = this.getMin(node.right).key;
            node.value = this.getMin(node.right).value;
            node.right = removeNode(node.right, node.key);
            return node;
        }
        else if(key < node.key){
            node.left = removeNode(node.left, key);
            return node;
        }
        else{
            node.right = removeNode(node.right, key);
            return node;
        }
    };

    this._root = removeNode.call(this, this._root, key);
    return this;
}

BinarySearchTree.prototype.search = function(key){
    let current = this._root;
    while(current){
        if(key === current.key){
            return current.value;
        }
        if(key < current.key){
            current = current.left;
        }
        else{
            current = current.right;
        }
    }
    return undefined;
}

BinarySearchTree.prototype.contains = function(value){
    if(!this._root){
        return false;
    }
    let flag = false;

    function inOrder (node, val){
        if (node == undefined){
            return;
        }
        inOrder(node.left, val);
        if(node.value == val){
          flag = true;
          return;
        }
        inOrder(node.right, val);
    }
    inOrder(this._root, value);
    
    return flag;
}

BinarySearchTree.prototype.traverse = function(order){
    let arr = [];
    function inOrder (node){
        if (node == undefined){
            return;
        }
        inOrder(node.left);
        arr.push(node.value);
        inOrder(node.right);
    }
    function postOrder (node){
        if (node == undefined){
            return;
        }
        postOrder(node.right);
        arr.push(node.value);
        postOrder(node.left);
          
    }
    if(order){
        inOrder(this._root);
    }
    else{
        postOrder(this._root);
    }
    return arr;
}
    
BinarySearchTree.prototype.verify = function(){ 
    let current = this._root; 
    function isValid(node, min, max){ 
        if(node === null){ 
            return true; 
        } 
        if(node.key > min && node.key < max && isValid(node.left, min, node.key) && isValid(node.right, node.key, max) ){ 
            return true; 
        } 
        else{ 
            return false; 
        }    
    } 
    return isValid(current, -Infinity, Infinity); 
}

module.exports = {
  BinarySearchTree,
  root: '_root',
  left: 'left',
  right: 'right',
  student: 'MAXIM ZHDANOVICH'
};
