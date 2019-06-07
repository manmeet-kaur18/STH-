const button = document.getElementById('register');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
    let userDetail = {
        userName: document.getElementById('username').value,
        userEmail: document.getElementById('useremail').value,
        userPassword: document.getElementById('userpassword').value
    };
    if (checkEmptyString(userDetail.userName))
    {
        alert('User name is required');
        return;
    }
    if (checkEmptyString(userDetail.userEmail))
    {
        alert('User Email is required');
        return;
    }
    if (checkEmptyString(userDetail.userPassword))
    {
        alert('User Password is required');
        return;
    }

    $.ajax({
        type: "POST",
        url: "/register",
        dataType: "json",
        success: function (msg) {
            if (msg.length > 0) {
                location.href='/member';
            } else {
                alert("Invalid User !");
            }
        },
        data: userDetail
    });
});

function checkEmptyString(val)
{
    return (val == undefined || val == null || val.trim().length == 0);
}
