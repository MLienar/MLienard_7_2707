function longestPrefix(string) {
    let table = new Array(string.length);
    let maxPrefix = 0;
    table[0] = 0;
    for (let i = 1; i < string.length; i++) {
      while (maxPrefix > 0 && string.charAt(i) !== string.charAt(maxPrefix)) {
        maxPrefix = table[maxPrefix - 1];
      }
       if (string.charAt(maxPrefix) === string.charAt(i)) {
        maxPrefix++;
      }
      table[i] = maxPrefix;
    }
    return table;
  }
  
  function kmpMatching(string, pattern) {

    const prefixes = longestPrefix(pattern);
    let matches = [];
    
    let j = 0;
    let i = 0;

    while (i < string.length) {
      if (string.charAt(i) === pattern.charAt(j)) {
        i++;
        j++;
      }

      if (j === pattern.length) {
        matches.push(i-j);
        j = prefixes[j-1];
      }
      else if (string.charAt(i) !== pattern.charAt(j)) {
          if (j !== 0) {
              j = prefixes[j-1];
          } else {
              i++;
          }
      }
    }
    return matches;
  }

  export { kmpMatching as kmpSearch }