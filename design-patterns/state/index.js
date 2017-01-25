class Trafic {
  constructor() {
    this.current = new RedLight()
  }

  start() {
    setInterval(this.tickTock.bind(this), 1000)
  }

  tickTock() {
    console.info(`Time Left: ${this.current.timeLeft}`)
    this.current.tickTock(this)
  }

  setCurrentLight(light) {
    this.current = light
  }
}

class Light {
  constructor() {
    this.initTimeLeft()
    console.log(`Current is ${this.name()} light.`)
  }

  name() {
    throw new Error('Need to implement "name" method.')
  }

  tickTock() {
    throw new Error('Need to implement "tickTock" method.')
  }
}

class GreenLight extends Light {
  initTimeLeft() {
    this.timeLeft = 3
  }

  name() {
    return 'Green'
  }

  tickTock(traffic) {
    this.timeLeft -= 1

    if (this.timeLeft === 0) {
      traffic.setCurrentLight(new YellowLight())
    }
  }
}

class YellowLight extends Light {
  initTimeLeft() {
    this.timeLeft = 1
  }

  name() {
    return 'Yellow'
  }

  tickTock(traffic) {
    this.timeLeft -= 1

    if (this.timeLeft === 0) {
      traffic.setCurrentLight(new RedLight())
    }
  }
}

class RedLight extends Light {
  initTimeLeft() {
    this.timeLeft = 2
  }

  name() {
    return 'Red'
  }

  tickTock(traffic) {
    this.timeLeft -= 1

    if (this.timeLeft === 0) {
      traffic.setCurrentLight(new GreenLight())
    }
  }
}

const traffic = new Trafic()
traffic.start()
