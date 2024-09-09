if (document.readyState !== 'loading') {
    console.log('Document ready');
    initialize();
} else {
    document.addEventListener('DOMContentLoaded', function() {
    initialize();
})};

function initialize() {
    console.log('initialize');

    // functionality fir "my-button"
    const btn_helloWorld = document.getElementById('my-button');
    btn_helloWorld.addEventListener('click', function() {
        const txt_helloWorld = document.getElementById('hello-world');
        txt_helloWorld.innerText = 'Moi maailma';
        console.log('Hello World!');
    });

    const btn_add_data = document.getElementById('add-data');
    btn_add_data.addEventListener('click', function() {
        
    });

    };

