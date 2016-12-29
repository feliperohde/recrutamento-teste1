export default class Math {
  constructor() {
    this.name = 'Xhr';
    console.log('Xhr module');

    this._response = {
      data: null,
      error: null,
      msg: null,
      status: null
    };
  }

  Median (arr) {

  };

  Percent (val, total) {
    return (val / total * 100).toFixed(2);
  };

  Total (arr) {

    if(!arr) throw new Error('Math total needs an array parameter!');

    let value = 0;

    for (var i = arr.length - 1; i >= 0; i--) {
      value += arr[i][1];
    }

    return value;
  }
}