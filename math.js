function gcd(a, b) {
  if(a == b) {
    return a;
  }
  else {
    return gcd(Math.max(a, b) - Math.min(a, b), Math.min(a, b));
  }
}
console.log(gcd(11, 11));