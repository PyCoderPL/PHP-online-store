const navLoginBtn = document.querySelector('.nav-login');
const loginCartCenter = document.querySelector('.login-cart-center')
const cartOverlay = document.querySelector('.cart-overlay');
class Login {
    LoginCart() {
        // show login cart modal
        navLoginBtn.addEventListener('click', () => {
            if (!loginCartCenter.dataset.logged) {
                this.displayLoginCart();
            } else {
                location.href = 'http://localhost/myweb/CutAndStitch/pages/account.php';
            }
        })
    }
    displayLoginCart() {
        cartOverlay.classList.add('transparentBcg');
        loginCartCenter.classList.add('show');
    }    
    closeLoginCart() {
        // close Login modal after click 'x'
        const loginClose = document.querySelector('.login-close');
        loginClose.addEventListener('click', () => {
            cartOverlay.classList.remove('transparentBcg');
            loginCartCenter.classList.remove('show');
        });
        // close Login modal after click anywhere
        cartOverlay.addEventListener('click', (event) => {
            if (event.target.classList.contains('cart-overlay')) {
                cartOverlay.classList.remove('transparentBcg');
                loginCartCenter.classList.remove('show');
            }
        });        
    }
}

export default Login;