const timer = [1000, 5000, 2000, 1000, 3000, 7000]
let i = 0

function fetchAdd(a, b) {
  return new Promise(r => {
    const curIndex = i % 6
    i++
    setTimeout(() => {
      console.log(`first add time: ${timer[curIndex]}`)
      r(a + b)
    }, timer[curIndex])
  })
}

function memoFn(fn) {
  return fn
}

const memoFetchAdd = memoFn(fetchAdd)

function add(...args) {
  return new Promise(resolve => {
    const waitAdds = args
    let curPending = 0

    function run() {
      if (waitAdds.length === 1 && curPending === 0) {
        resolve(waitAdds[0])
        return
      }

      if (waitAdds.length < 2) {
        return
      }

      curPending++
      memoFetchAdd(waitAdds.shift(), waitAdds.shift()).then(data => {
        waitAdds.push(data)
        curPending--
        run()
      })
      run()
    }

    run()
  })
}

console.time('a')
add(1,2,3,4,5,6).then(data => {
  console.timeEnd('a')
  console.log(`result: ${data}`)
})
