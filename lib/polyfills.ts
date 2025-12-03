// Polyfills for older browsers that don't support ES2023 features

// Polyfill for Array.prototype.toSorted()
if (!Array.prototype.toSorted) {
  Array.prototype.toSorted = function (compareFn) {
    return [...this].sort(compareFn)
  }
}

// Polyfill for Array.prototype.toReversed()
if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function () {
    return [...this].reverse()
  }
}

// Polyfill for Array.prototype.toSpliced()
if (!Array.prototype.toSpliced) {
  Array.prototype.toSpliced = function (start, deleteCount, ...items) {
    const copy = [...this]
    copy.splice(start, deleteCount, ...items)
    return copy
  }
}

// Polyfill for Array.prototype.with()
if (!Array.prototype.with) {
  Array.prototype.with = function (index, value) {
    const copy = [...this]
    const actualIndex = index >= 0 ? index : this.length + index
    if (actualIndex >= this.length || actualIndex < 0) {
      throw new RangeError('Invalid index')
    }
    copy[actualIndex] = value
    return copy
  }
}

export {}
