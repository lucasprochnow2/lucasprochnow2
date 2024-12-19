class Tracker {
  servers

  constructor() {
    this.servers = {}
  }

  next_server_number(servers = []) {
    if (!servers.length) return 1

    const sortedServers = servers.sort((a, b) => a - b)

    let result = 1

    for (let i = 0; i <= sortedServers.length; i++) {
      if (i + 1 === sortedServers[i])
        result += 1
    }

    return result
  }

  allocate(serverName) {
    if (!this.servers[serverName])
      this.servers[serverName] = []

    const nextServerNumber = this.next_server_number(this.servers[serverName])

    this.servers[serverName] = [ ...this.servers[serverName], nextServerNumber ]

    const res = `${serverName}${nextServerNumber}`

    return res
  }

  dealocate(server) {
    let serverName = ''
    let serverNum = ''
    const nums = '0123456789'.split('')

    server.split('').forEach((name) => {
      if (nums.includes(name)) {
        serverNum += name
      }else {
        serverName += name
      }
    })

    if (!this.servers[serverName]) {
      console.log(`Server "${server}" not found while dealocating`)
      return;
    }

    const index = this.servers[serverName].indexOf(parseInt(serverNum))
    if (index > -1) {
      this.servers[serverName].splice(index, 1);
    }
  }
}

const tracker = new Tracker()
tracker.allocate('apiBox')
tracker.allocate('serverBox')
tracker.allocate('apiBox')
tracker.allocate('apiBox')
tracker.allocate('serverBox')

tracker.dealocate('apiBox2')
tracker.dealocate('foo1')

tracker.allocate('apiBox')
tracker.allocate('serverBox')

console.log(tracker.servers)
