const runCount = 5

function task(...fns) {
  const results = []
  let curAction = 0
  let curIndex = 0

  function runTask(index, complete) {
    if (fns.length === 0 && curAction === 0) complete(results)
    if (fns.length > 0 && curAction < runCount) {
      const action = fns.shift()
      curAction++
      action().then((res) => {
        results[index] = res
        curAction--
        runTask(curIndex++, complete)
      })
    }
  }

  return new Promise((resolve, reject) => {
    for (let i = 0; i < runCount; i++) {
      runTask(curIndex++, resolve)
    }
  }) 
}

function delay(time) {
  return () => {
    return new Promise(r => {
      setTimeout(() => {
        console.log(`delay ${time}`)
        r(`delay ${time}`)
      }, time)
    })
  }
}

task(
  delay(5000),
  delay(1000),
  delay(1300),
  delay(1600),
  delay(2000),
  delay(2100),
  delay(7110),
  delay(2110),
).then(data => {
  console.log('total', data)
})
