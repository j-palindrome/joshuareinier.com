function setup() {
  const canvas = createCanvas(windowWidth, windowHeight)
  canvas.style('position', 'fixed')
  canvas.style('z-index', '-1')
  frameRate(10)
  console.log(probabilityEQ(50, 5, 10))
}

function draw() {
  stroke('white')
  background('black')
  for (let i = 0; i < 100; i++) {
    strokeWeight(random(2, 5))
    stroke(random(192))
    const bins = probabilityEQ((mouseY / height) * 100, 0, 40, 1.4)
    const y = randomFourier(bins) * height
    const x = random(width)
    line(x, y, x + 3, y)
  }
}

const probabilityEQ = (point, reduction, spread, exponent = 1) => {
  // reduction: percent DIVISION by this much
  // point is percentage
  const bins = []
  for (let i = 0; i < 100; i++) {
    bins.push(1)
  }
  const center = floor(point)
  bins[center] = reduction
  for (let i = 1; i < spread; i++) {
    // each time, reduce it by (reduction / spread)
    const intermediate = reduction + ((1 - reduction) / spread) ** exponent * i
    if (bins[center + i] !== undefined) bins[center + i] = intermediate
    if (bins[center - i] !== undefined) bins[center - i] = intermediate
  }
  return bins
}

const randomFourier = bins => {
  // this is a Fourier normalization based on an array of numbers, which is the chance of returning something in that range
  const total = bins.reduce((total, next) => total + next)
  bins = bins.map(x => x / total) // normalize
  const random = Math.random()
  let sum = 0
  for (let i = 0; i < bins.length; i++) {
    sum += bins[i]
    if (random < sum) {
      // it worked, generate another random between this and the next bin
      const thisBin = i / bins.length
      const nextBin = (i + 1) / bins.length
      return Math.random() * (nextBin - thisBin) + thisBin
    }
  }
}
