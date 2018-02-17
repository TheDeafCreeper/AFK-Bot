const db = require('./index.js')

for (var i = 0; i < 10000; i++) {
    db.updateValue('test', 1).then(i => {
        console.log(i)
    })
}
