const findAverage=(arr)=>{
   let result = arr.map((num, index)=>{
        let sum = num;
        let count = 1;
        if(index > 0){
            sum += arr[index -1];
            count++
        }
        if(index< arr.length-1){
            sum += arr[index+1]
            count++
        }

        return sum/count
    })
     return result
}

console.log(findAverage([1, 2, 3, 4, 5, 6]))
/* --- */
const windowAverage=(arr, size)=>{
    let windowSum = 0
    let result=[]
    for(let i=0;i<arr.length;i++){
        windowSum += arr[i]

        if(i>=size){
            windowSum -= arr[i-size]
        }
        if(i< size-1){
            result.push(null)
        }else{
            result.push(windowSum/arr[i])
        }
    }
    return result
}
console.log(windowAverage([1,2,3,4,5,6,7,8,9,10],3))

/* --- */

const isStringRotated=(str1,str2)=>{
    return (str1+str1).includes(str2)
}
console.log(isStringRotated('TEA','TAE'))

/* --- */

const twoSum=(arr, target)=>{
    let map = new Map()
    for(let i=0;i<arr.length;i++){
        let diff = target - arr[i];
        if(map.has(diff)){
            return [diff, arr[i]]
        }else{
            map.set(arr[i],i)
        }
    }
}

console.log(twoSum([1,2,3,4,5],9))

/* --- */

const findNonRepeatingChars=(str)=>{
    let map = new Map()
    for(let i=0;i<str.length;i++){
        map.set(str[i],map.get(str[i])+1 || 1)
    }
    for (const [key, value] of map.entries()) {
        if(value === 1){
            return key
        }
    }
}
console.log(findNonRepeatingChars('aabbbccdee'))

/* --- */

const groupAnagrams=(strs)=>{
    const map = new Map()
    for(const s of strs){
        const key = s.split('').sort().join('')
        if(!map.has(key)) map.set(key, [])
        map.get(key).push(s)
    }
    return [...map.values()]
}

console.log(groupAnagrams(['eat','tea','tan','ate','nat','bat']))

/* --- */

const moveZeros=(arr)=>{
    let insertPos = 0
    for(let i=0;i<arr.length;i++){
        if(arr[i] !== 0){
            [arr[insertPos], arr[i]] = [arr[i], arr[insertPos]]
            insertPos++
        }
    }
    return arr
}

console.log(moveZeros([0,1,0,3,12]))

/* --- */

const mergeSorted=(a, b)=>{
    const result = []
    let i = 0, j = 0
    while(i < a.length && j < b.length){
        if(a[i] <= b[j]){
            result.push(a[i++])
        }else{
            result.push(b[j++])
        }
    }
    while(i < a.length) result.push(a[i++])
    while(j < b.length) result.push(b[j++])
    return result
}

console.log(mergeSorted([1,3,5,7],[2,4,6,8,10]))

/* --- */

const mergeIntervals=(intervals)=>{
    if(!intervals.length) return []
    const sorted = [...intervals].sort((a, b)=> a[0] - b[0])
    const result = [sorted[0]]
    for(let i=1;i<sorted.length;i++){
        const last = result[result.length - 1]
        if(sorted[i][0] <= last[1]){
            last[1] = Math.max(last[1], sorted[i][1])
        }else{
            result.push(sorted[i])
        }
    }
    return result
}

console.log(mergeIntervals([[1,3],[8,10],[2,6],[15,18]]))

/* --- */

const maxSubArray=(nums)=>{
    let current = nums[0]
    let best = nums[0]
    for(let i=1;i<nums.length;i++){
        current = Math.max(nums[i], current + nums[i])
        best = Math.max(best, current)
    }
    return best
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))

/* --- */

const lengthOfLongestSubstring=(s)=>{
    const lastSeen = new Map()
    let left = 0
    let best = 0
    for(let right=0;right<s.length;right++){
        const ch = s[right]
        if(lastSeen.has(ch) && lastSeen.get(ch) >= left){
            left = lastSeen.get(ch) + 1
        }
        lastSeen.set(ch, right)
        best = Math.max(best, right - left + 1)
    }
    return best
}

console.log(lengthOfLongestSubstring('abcabcbb'))

/* --- */

const binarySearch=(arr, target)=>{
    let low = 0
    let high = arr.length - 1
    while(low <= high){
        const mid = Math.floor((low + high) / 2)
        if(arr[mid] === target) return mid
        if(arr[mid] < target){
            low = mid + 1
        }else{
            high = mid - 1
        }
    }
    return -1
}

console.log(binarySearch([1,3,5,7,9,11],7))

/* --- */

const searchRotated=(nums, target)=>{
    let low = 0
    let high = nums.length - 1
    while(low <= high){
        const mid = Math.floor((low + high) / 2)
        if(nums[mid] === target) return mid

        if(nums[low] <= nums[mid]){
            // left half is sorted
            if(target >= nums[low] && target < nums[mid]){
                high = mid - 1
            }else{
                low = mid + 1
            }
        }else{
            // right half is sorted
            if(target > nums[mid] && target <= nums[high]){
                low = mid + 1
            }else{
                high = mid - 1
            }
        }
    }
    return -1
}

console.log(searchRotated([4,5,6,7,0,1,2],0))

/* --- */

const isValid=(s)=>{
    const pairs = { ')': '(', ']': '[', '}': '{' }
    const stack = []
    for(const ch of s){
        if(pairs[ch]){
            if(stack.pop() !== pairs[ch]) return false
        }else{
            stack.push(ch)
        }
    }
    return stack.length === 0
}

console.log(isValid('{[()]}'))
console.log(isValid('{[(])}'))

/* --- */

const nextGreater=(arr)=>{
    const result = new Array(arr.length).fill(-1)
    const stack = []
    for(let i=0;i<arr.length;i++){
        while(stack.length && arr[i] > arr[stack[stack.length - 1]]){
            result[stack.pop()] = arr[i]
        }
        stack.push(i)
    }
    return result
}

console.log(nextGreater([4,5,2,25,7,8]))

/* --- */

class ListNode{
    constructor(val, next = null){
        this.val = val
        this.next = next
    }
}

const fromArray=(arr)=>{
    let head = null
    for(let i=arr.length-1;i>=0;i--) head = new ListNode(arr[i], head)
    return head
}
const toArray=(head)=>{
    const out = []
    while(head){ out.push(head.val); head = head.next }
    return out
}

const reverseList=(head)=>{
    let prev = null
    let current = head
    while(current){
        const next = current.next
        current.next = prev
        prev = current
        current = next
    }
    return prev
}

console.log(toArray(reverseList(fromArray([1,2,3,4,5]))))

/* --- */

class ListNode{
    constructor(val, next = null){
        this.val = val
        this.next = next
    }
}

const hasCycle=(head)=>{
    let slow = head
    let fast = head
    while(fast && fast.next){
        slow = slow.next
        fast = fast.next.next
        if(slow === fast) return true
    }
    return false
}

const a = new ListNode(1)
const b = new ListNode(2)
const c = new ListNode(3)
const d = new ListNode(4)
a.next = b; b.next = c; c.next = d
console.log(hasCycle(a))

d.next = b // creates a cycle
console.log(hasCycle(a))

/* --- */

class TreeNode{
    constructor(val, left = null, right = null){
        this.val = val
        this.left = left
        this.right = right
    }
}

const levelOrder=(root)=>{
    if(!root) return []
    const result = []
    const queue = [root]
    while(queue.length){
        const levelSize = queue.length
        const level = []
        for(let i=0;i<levelSize;i++){
            const node = queue.shift()
            level.push(node.val)
            if(node.left) queue.push(node.left)
            if(node.right) queue.push(node.right)
        }
        result.push(level)
    }
    return result
}

const root1 = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(6))
)
console.log(levelOrder(root1))

/* --- */

class TreeNode{
    constructor(val, left = null, right = null){
        this.val = val
        this.left = left
        this.right = right
    }
}

const preorder=(node, out = [])=>{
    if(!node) return out
    out.push(node.val)
    preorder(node.left, out)
    preorder(node.right, out)
    return out
}
const inorder=(node, out = [])=>{
    if(!node) return out
    inorder(node.left, out)
    out.push(node.val)
    inorder(node.right, out)
    return out
}
const postorder=(node, out = [])=>{
    if(!node) return out
    postorder(node.left, out)
    postorder(node.right, out)
    out.push(node.val)
    return out
}

const root = new TreeNode(1,
    new TreeNode(2, new TreeNode(4), new TreeNode(5)),
    new TreeNode(3, null, new TreeNode(6))
)
console.log(preorder(root))
console.log(inorder(root))
console.log(postorder(root))

/* --- */

const flatten=(arr)=>{
    const result = []
    for(const item of arr){
        if(Array.isArray(item)){
            result.push(...flatten(item))
        }else{
            result.push(item)
        }
    }
    return result
}

console.log(flatten([1,[2,[3,[4,5]],6],[7]]))
console.log([1,[2,[3,[4,5]],6],[7]].flat(Infinity))

/* --- */

class LRUCache{
    constructor(capacity){
        this.capacity = capacity
        this.cache = new Map()
    }

    get(key){
        if(!this.cache.has(key)) return -1
        const value = this.cache.get(key)
        this.cache.delete(key)
        this.cache.set(key, value)
        return value
    }

    put(key, value){
        if(this.cache.has(key)){
            this.cache.delete(key)
        }else if(this.cache.size >= this.capacity){
            const oldest = this.cache.keys().next().value
            this.cache.delete(oldest)
        }
        this.cache.set(key, value)
    }
}

const lru = new LRUCache(2)
lru.put(1, 'one')
lru.put(2, 'two')
console.log(lru.get(1))
lru.put(3, 'three')
console.log(lru.get(2))
console.log(lru.get(3))

/* --- */

let apiCount = 0

const fetchApi=()=>{
    return new Promise((resolve, reject)=>{
    let apiRes = {
        name:'Praveenraj',
        email:'praveen@gmail.com'
    }
    apiCount++
    let statusCode = 300;
    if( apiCount === 3) statusCode = 200

    if(statusCode === 200){
        resolve(apiRes)
    }else{
        reject('Something went wrong')
    }
    })
   
}




const retry = (fn, retries, delay)=>{
    return new Promise((resolve, reject)=>{
        fn()
        .then(res=> resolve(res))
        .catch(err=> {
            if (retries === 0) {
                reject(err);
                return;
            }
            console.log(`Retries remaining: ${retries}`);
            setTimeout(()=>{
                retry(fn, retries-1, delay)
                .then(resolve)
                .catch(reject);
            }, delay)
            
        })
    })
}

retry(fetchApi, 3, 2000)
    .then((res)=> console.log(res))
    .catch((err)=> console.log(err))



/* --- */

class Stack{
    constructor(){
        this.data=[],
        this.top = -1
    }

    push(value){
        this.top++;
        this.data[this.top] = value
    }
    pop(){
        let removed = this.data[this.top]
        this.data.length = this.top;
        this.top--;
        return removed

    }
    display(){
        return this.data
    }
    
}


let stack = new Stack()
stack.push(1)
stack.push(2)
stack.pop()
stack.push(3)
console.log(stack.data)

/* --- */