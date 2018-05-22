// export function clear() {
//   console.log('\x1Bc');
// }
//
// export function log() {
//   console.log(arguments)
// }

module.exports = {
  clear: () => {
    console.log('\x1Bc');
  },
  log: console.log
};
