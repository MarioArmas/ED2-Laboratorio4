class Tree {
  constructor() {
    this.mainRoot = null
    this.sortedByName = true
  }
  
  compareByName = (person1, bool, person2) => {
    if (bool === '==') {
      return person1.name == person2.name
    }
  
    if (bool === '>') {
      return person1.name > person2.name
    }
  
    if (bool === '<') {
      return person1.name < person2.name
    }
  }
  
  compareByDPI = (person1, bool, person2) => {
    if (bool === '==') {
      return person1.dpi == person2.dpi
    }
  
    if (bool === '>') {
      return person1.dpi > person2.dpi
    }
  
    if (bool === '<') {
      return person1.dpi < person2.dpi
    }
  }
  
  insert = (key) => {
    const func = this.sortedByName ? this.compareByName : this.compareByDPI
    this.mainRoot = this.insertNode(this.mainRoot, key, func)
  }
  
  remove = (key) => {
    const func = this.sortedByName ? this.compareByName : this.compareByDPI
    this.mainRoot = this.removeNode(this.mainRoot, key, func)
  }
  
  update = (key) => {
    this.updateNode(this.mainRoot, key)
  }
  
  search = (key) => {
    const func = this.sortedByName ? this.compareByName : this.compareByDPI
    const items = this.searchNode(this.mainRoot, key, [], func)
    
    return items
  }
  
  insertNode = (root, key, compare) => {
    if (root == null) {
      return Node = {
        "person": key,
        "left": null,
        "right": null,
        "height": 1
      }
    }
    if (compare(key, '<', root.person)) {
      root.left = this.insertNode(root.left, key, compare)
    }
    else {
      root.right = this.insertNode(root.right, key, compare)
    }
  
    // Balance
    root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right))
    const balanceFactor = this.getBalance(root)
  
    if (balanceFactor > 1) {
      if (compare(key, '<', root.left.person)) {
        return this.rightRotation(root)
      }
      else {
        root.left = this.leftRotation(root.left)
        return this.rightRotation(root)
      }
    }
  
    if (balanceFactor < -1) {
      if (compare(key, '>', root.right.person)) {
        return this.leftRotation(root)
      }
      else {
        root.right = this.rightRotation(root.right)
        return this.leftRotation(root)
      }
    }
  
    return root
  }
  
  removeNode = (root, key, compare) => {
    if (root == null) {
      return root
    }
  
    if (compare(key, '<', root.person)) {
      root.left = this.removeNode(root.left, key, compare)
    }
    else if (compare(key, '>', root.person)) {
      root.right = this.removeNode(root.right, key, compare)
    }
    else {
      if (root.left == null) {
        const temp = root.right
        root = null
        return temp
      }
      else if (root.right == null) {
        const temp = root.left
        root = null
        return temp
      }
  
      const temp = this.getMinValueNode(root.right)
      root.person = temp.person
      root.right = this.removeNode(root.right, temp.person, compare)
    }
  
   if (root == null) return root
  
    // Balance
    root.height = 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right))  
    const balanceFactor = this.getBalance(root)
  
    if (balanceFactor > 1) {
      if (this.getBalance(root.left) >= 0) {
        return this.rightRotation(root)
      }
      else {
        root.left = this.leftRotation(root.left)
        return this.rightRotation(root)
      }
    }
    if (balanceFactor < -1) {
      if (this.getBalance(root.right) <= 0) {
        return this.leftRotation(root)
      }
      else {
        root.right = this.rightRotation(root.right)
        return this.leftRotation(root)
      }
    }
    return root
  }
  
  updateNode = (root, key) => {
    if (root == null) return
  
    this.updateNode(root.left, key)
    if (root.person.name == key.name & root.person.dpi == key.dpi) {
      if (key.hasOwnProperty('address')) root.person.address = key.address
      if (key.hasOwnProperty('datebirth')) root.person.datebirth = key.datebirth
      return
    }
    this.updateNode(root.right, key)
  }
  
  searchNode = (root, key, items = [], compare) => {
    if (root == null) return
    
    if (!compare(key, '>', root.person)) this.searchNode(root.left, key, items, compare)
    if (compare(root.person, '==', key)) items.push(root.person)
    if (!compare(key, '<', root.person)) this.searchNode(root.right, key, items, compare)
  
    return items
  }
  
  getHeight = (root) => {
    if (root == null) return 0
    
    return this.getMinValueNode(root.left)
  }
  
  getBalance = (root) => {
    if (root == null) return 0
    return this.getHeight(root.left) - this.getHeight(root.right)
  }
  
  leftRotation = (z) => {
    y = z.right
    T2 = y.left
    y.left = z
    z.right = T2
    z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right))
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right))
    return y
  }
  
  rightRotation = (z) => {
    y = z.left
    T3 = y.right
    y.right = z
    z.left = T3
    z.height = 1 + Math.max(this.getHeight(z.left), this.getHeight(z.right))
    y.height = 1 + Math.max(this.getHeight(y.left), this.getHeight(y.right))
    return y
  }
  
  getMinValueNode = (root) => {
    if (root == null || root.left == null) return root
    return this.getMinValueNode(root.left)
  }
  
  sortByName = () => {
    const items = this.inOrder(this.mainRoot)
    this.mainRoot = null
    this.sortedByName = true
    
    items?.forEach(x => {
      this.insert(x)
    })
  }
  
  sortByDPI = () => {
    const items = this.inOrder(this.mainRoot)
    this.mainRoot = null
    this.sortedByName = false
    
    items?.forEach(x => {
      this.insert(x)
    })
  }
  
  inOrder = (root, items = []) => {
    if (root == null) return
  
    this.inOrder(root.left, items)
    items.push(root.person)
    this.inOrder(root.right, items)
  
    return items
  }
  
  showInOrder = (root) => {
    if (root != null) {
      showthis.InOrder(root.left)
      console.log(root.person)
      showthis.InOrder(root.right)
    }
  }
};

export default Tree