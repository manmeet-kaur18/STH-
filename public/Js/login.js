const button = document.getElementById('login');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
    let userDetail = {
        userName: document.getElementById('userName').value,
        userEmail: document.getElementById('userEmail').value,
        userPassword: document.getElementById('userPassword').value,
        userType: document.getElementById('userType').value
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
        url: "/login",
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
