const spawn = require('child_process').spawn
const numCPUs = require('os').cpus().length
const Promise = require('bluebird')
const glob = Promise.promisify(require("glob"))

function loadProcess(filename) {
  return new Promise(function(resolve, reject) {
    const process = spawn('node', [filename])
    const data = []
    process.stdout.on('data', function(d) {
      data.push(d)
    })

    process.stderr.on('data', function(err) {
      reject(err.toString())
    })

    process.on('exit', function() {
      console.log(data.join(''))
      resolve()
    })
  })
}

return glob(`${__dirname}/**/*.spec.js`)
  .map((f) => loadProcess(f), {
      concurrency: numCPUs
  })