// adding data to user-information-table
const submit_data = document.getElementById('submit-data');
submit_data.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('submit-data clicked');
    // make elements
    const username = document.getElementById('input-username');
    const email = document.getElementById('input-email');
    const admin = document.getElementById('input-admin');
    const user_table = document.getElementById('user-information-table');
    const files = document.getElementById('input-image');
    const img = document.createElement('img');

    // read image
    reader = new FileReader();
    reader.onload = function(e) {
        img.src = URL.createObjectURL(files.files[0]);
        img.width = 64;
        img.height = 64;
    }



    // check if username already exists
    for (let i = 0; i < user_table.rows.length; i++) {
        if (user_table.rows[i].cells[0].innerText === username.value) {
            console.log('Username already exists');
            user_table.rows[i].cells[1].innerText = email.value;
            user_table.rows[i].cells[2].innerText = admin.checked ? 'X' : '-';
            if (files.files.length > 0) {
                reader.readAsDataURL(files.files[0]);
                user_table.rows[i].cells[3].appendChild(img);
            }
            return;
        }
    }

    // upload image


    // create new row
    let tr_new = document.createElement('tr');
    let td_username = document.createElement('td');
    let td_email = document.createElement('td');
    let td_admin = document.createElement('td');

    // set values
    td_username.innerText = username.value;
    td_email.innerText = email.value;
    td_admin.innerText = admin.checked ? 'X' : '-';

    // append to table
    tr_new.appendChild(td_username);
    tr_new.appendChild(td_email);
    tr_new.appendChild(td_admin);
    user_table.appendChild(tr_new);

    console.log('Add data: ' + username.value + ', ' + email.value + ', ' + admin.checked);
    // done

});

// clear user-information-table
const clear_data = document.getElementById('empty-table');
clear_data.addEventListener('click', (event) => {
    event.preventDefault();
    console.log('empty-table clicked');
    const user_table = document.getElementById('user-information-table');
    user_table.innerHTML = '<tr><th>Username</th><th>Email</th><th>Admin</th></tr>';
});

