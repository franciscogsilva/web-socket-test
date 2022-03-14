const client = io();

const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnEnviar = document.querySelector('#btnEnviar');

client.on('connect', () => {
    lblOnline.style.display = '';
    lblOffline.style.display = 'none';
});

client.on('disconnect', () => {
    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

client.on( 'send-message', ( payload ) => {
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {
    const message = txtMessage.value;
    const payload = {
        id: this.getId(10),
        message,
        date: new Date().getTime()
    };

    if (message != '') {
        client.emit('send-message', payload, ( id ) => {
            console.log( 'From server => ', id );
        });
    }

    txtMessage.value = '';
});

function getId( length ) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
   }
   return result;
}