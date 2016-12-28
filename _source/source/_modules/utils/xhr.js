export default class Xhr {
  constructor() {
    this.name = 'Xhr';
    console.log('Xhr module');

    this._response = {
      data: null,
      error: null,
      msg: null,
      status: null
    };


    this.StateHandler = function (parent) {

      parent._response.status = this.status;

      switch(this.status) {
        case 200:
          console.log('cadastro feito com sucesso!');
          var msg = JSON.parse(this.responseText);

          parent._response.data = this.responseText;
          parent._response.error =  null;
          parent._response.msg = "Cadastro feito com sucesso!";

          break;

        case 400:
          console.log('Há um erro com um dos dados que deve ser exibido para o usuário.');

          var msg = JSON.parse(this.responseText);

          parent._response.data = null;
          parent._response.error =  this.responseText;
          parent._response.msg = msg.message;

          break;

        case 409:
          console.log('O email informado já existe.');

          parent._response.data = null;
          parent._response.error =  this.responseText;
          parent._response.msg = "O email informado já existe.";

          break;

        default:
          console.log('Qualquer código 5xx ou erro de timeout!');

          parent._response.data = null;
          parent._response.error =  this.responseText;
          parent._response.msg = "Tempo limite da request exedido.";
      }
    };

  };

  set response (response) {
    this._response = response;
  };

  get response () {
    return this._response;
  };

  Post (args, callback) {
    let that = this; // sorry, this is ugly, i know, but for this time.

    let url = args.url || 'http://www.improving.com.br/api/test/users';
    let data = args.data || {};

    let xmlhttp = new XMLHttpRequest();

    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(data);
    xmlhttp.onreadystatechange = function () {

      if (xmlhttp.readyState != 4) return;

      that.StateHandler.call(this, that);

      try {
        return callback(that._response);
      } catch (e) {
        console.log(e);
      }

    };
  };
};

