    <?php
        session_start(); 
    ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Fontawesome CDN Link -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- CSS link -->
    <link rel="stylesheet" href="./style.css">
    <!-- Logo link -->
    <link rel="icon" type="image/x-icon" href="./images/logo.svg">
    <!-- JS script link -->
    <script src="./main.js" type="module" defer></script>
    <!-- Contentful JS script -->
    <script src="https://cdn.jsdelivr.net/npm/contentful@latest/dist/contentful.browser.min.js"></script>
    <title>Handmade Leather Goods</title>
</head>
<body>
    <!-- navbar -->
    <nav class="nav-bar">
        <div class="nav-bar-head-center">
            <!-- search-bar input -->
            <div class="nav-search-bar">
                <!-- <input class="search-bar-input" type="text" placeholder="Search..." autocomplete="off"> -->
            </div>            
            <!-- brand name & logo -->
            <div class="nav-brand-logo">
                <img src="images/logo.svg" alt="logo origami bird" />
                <h1>
                    <span>CUT & STITCH</span>
                    <span>by hand</span>
                </h1>                
            </div>
            <div class="nav-social-login-cart">
                <!-- social media links -->
                <div class="nav-social">
                    <a href=""><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://www.instagram.com/martin.leathercraft/"><i class="fa-brands fa-instagram"></i></a>
                    <a href=""><i class="fa-brands fa-twitter"></i></a>
                </div>
                <!-- login link -->
                <div class="nav-login">
                    <i class="fa-solid fa-user"></i>
                    Log In
                </div>
                <!-- shopping cart -->
                <div class="nav-cart-btn">
                    <span class="cart-icon">
                        <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                    <div class="cart-items">0</div>
                </div>
            </div>
        </div>
        <!-- main menu categories -->
        <div class="nav-bar-menu-center">
            <ul class="nav-menu">
                <li class="active"><a href="./index.php">Home</a></li>
                <li><a href="./pages/shopall.php">Shop all</a></li>
                <li><a href="./pages/ourstory.php">Our Story</a></li>
                <!-- <li><a href="">Our Craft</a></li> -->
                <li><a href="./pages/contact.php">Contact</a></li>
            </ul>
        </div>
    </nav>
    <!-- end of navbar -->
    <!-- hero -->
    <header class="hero">
        <div class="banner">
            <h1 class="banner-title">handcraft leather goods</h1>
            <a href="./pages/shopall.php">
                <button class="banner-btn">
                    shop the collection
                </button>
            </a>
        </div>
    </header>
    <!-- end of hero -->
    <!-- featured products -->
    <section class="featured-products">  
        <div class="section-title">
            <h2>featured products</h2>
        </div>
        <div class="featured-products-center" data-slides>
            <!-- single product -->
            <!-- <article class="product best-seller" data-active>
                <div class="img-container">
                    <img class="product-img front" src="./images/product-1.jpeg" alt="product">
                    <button class="cart-btn">
                        <i class="fas fa-shopping-cart"></i>
                        add to cart
                    </button>
                    <button class="quick-view-btn">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        quick view
                    </button>
                </div>
                <h3 class="">brown & whisky wallet</h3>
                <h4 class="">450 zł</h4>
                <p class="best-seller-info">Best Seller</p>
            </article>   -->
            <!-- end of single product -->
            <button class="carousel-button prev" data-carousel-button="prev">
                <i class="fa-sharp fa-solid fa-chevron-left"></i>
            </button>
            <button class="carousel-button next" data-carousel-button="next">
                <i class="fa-sharp fa-solid fa-chevron-right" ></i>
            </button>
        </div>
        <div class="banner">
            <button class="banner-btn">
                <a href="./pages/shopall.php">
                    shop best seller
                </a>
            </button>
        </div>
        <!-- quick view modal -->
        <div class="quick-view-center"></div>
        <!-- end of quick view modal -->
    </section>
    <!-- end of featured products -->
    <!-- log in cart -->
    <div class="login-cart-center <?php if (isset($_SESSION['error'])) echo $_SESSION['show']?>" <?php if (isset($_SESSION['logged'])) echo 'data-logged="true"'?>>
        <span class="login-close">
            <i class="fas fa-window-close"></i>
        </span>
        <div class="login">
            <form action="./sources/php/login.php" method="POST" class="login-form">
                <label for="login">Login</label>
                <input type="text" name="login" placeholder="type your login">
                <label for="pass">Password</label>
                <input type="password" name="pass" placeholder="type your password">
                <input type="submit" value="Log in">
                <?php if (isset($_SESSION['error'])) echo $_SESSION['error']?>
            </form>
        </div>
        <div class="register">
            <form action="" class="register-form">
                <label for="name">Login</label>
                <input type="text" name="login" placeholder="type your login">
                <label for="email">E-mail</label>
                <input type="text" name="email" placeholder="type your email">
                <label for="pass1">Password</label>
                <input type="password" name="pass1" placeholder="type your password">
                <label for="pass2">Password again</label>
                <input type="password" name="pass2" placeholder="type your password again">
                <input type="submit" value="Create new account">
            </form>
        </div>
    </div>
    <!-- end of log in cart -->
    <!-- shopping cart -->
    <div class="cart-overlay <?php if (isset($_SESSION['error'])) echo $_SESSION['transparentBcg']?>">
        <div class="cart">
            <span class="close-cart">
                <i class="fas fa-window-close"></i>
            </span>
            <h2>your shopping cart</h2>
            <div class="cart-content">
                <!-- single cart item -->
                <!-- <div class="cart-item">
                    <img src="./images/product-1.jpeg" alt="product">
                    <div>
                        <h4>queen bed</h4>
                        <h5>$9.00</h5>
                        <span class="remove-item">remove</span>
                    </div>
                    <div>
                        <i class="fas fa-chevron-up"></i>
                        <p class="item-amount">1</p>
                        <i class="fas fa-chevron-down"></i>
                    </div>
                </div> -->
                <!-- end of single cart item -->
            </div>
            <div class="cart-footer">
                <h3>
                    your total: $ 
                    <span class="cart-total">0</span>
                </h3>
                <button class="clear-cart banner-btn">clear cart</button>
            </div>
        </div>
        <div class="overlay-click-close">

        </div>
    </div>
    <!-- end of shopping cart -->

   
    <section class="leather-cases-container">
    </section>
    <section class="watch-straps-container">LEATHER BELTS</section>
    <section class="story-leather-process">
        <div class="story">Read our story</div>
        <div class="leather">About our leather</div>
        <div class="process">Learn our process</div>
    </section>
    <section class="instagram">
        <div class="">
            <p>FOLLOW CUT & STITCH by hand ON INSTAGRAM</p>
            <a href="" class="instagram-link">@cutandstichshop</a>
        </div>
    </section>
    <section class="shipping-warranty"></section>
</body>
</html>