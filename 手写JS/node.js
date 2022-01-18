function BAS() {
    this.root = null;
  }
  
  BAS.prototype.insert = function insert(data) {
    // 数据以 Node 对象的形式插入
    const n = new Node(data, null, null);
    
    // 如果根节点为 null，那么这是一颗新树
    if (this.root === null) {
      this.root = n;
    } else {
      // 声明当前节点，并保存父节点
      let parent = (current = this.root);
      
      // 开始遍历，不断更新当期节点和父节点
      while (true) {
        parent = current;
  
        if (data < current.data) {
          current = current.left;
          // 如果节点为 null，说明可以插入数据了，否则需要继续向下遍历
          if (current === null) {
            parent.left = n;
            break;
          }
        } else {
          current = current.right;
          if (current === null) {
            parent.right = n;
            break;
          }
        }
      }
    }
  };
  