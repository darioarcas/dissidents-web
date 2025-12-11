// src/components/LoadingPayPage.js
import mercadopagoLogo from './img/mercadopago.png';

const LoadingPayPage = () => {
    return (
        <html>
            <head>
                <title>Preparando tu pago...</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <style>{`
                    body {
                        background-color: #f5f5f5;
                        font-family: Arial, sans-serif;
                        text-align: center;
                        padding: 20vh 5vw;
                        color: #333;
                        margin: 0;
                    }

                    .fade-in {
                        opacity: 0;
                        animation: fadeIn 2s forwards;
                    }

                    @keyframes fadeIn {
                        to { opacity: 1; }
                    }

                    .logo {
                        width: 150px;
                        max-width: 35vw;
                        margin-bottom: 30px;
                        animation: fadeIn 2s forwards;
                    }

                    h2 {
                        font-size: 1.5rem;
                        margin-bottom: 20px;
                    }

                    .spinner {
                        margin: 30px auto;
                        border: 6px solid #f3f3f3;
                        border-top: 6px solid #009ee3;
                        border-radius: 50%;
                        width: 40px;
                        height: 40px;
                        animation: spin 1s linear infinite;
                        display: inline-block;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }

                    .seguro {
                        margin-top: 40px;
                        font-size: 0.9em;
                        color: #666;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;
                        flex-wrap: wrap;
                        animation: fadeIn 3s forwards;
                    }

                    .lock {
                        width: 20px;
                        height: 20px;
                    }

                    .extra-info {
                        margin-top: 10px;
                        font-size: 0.8em;
                        color: #999;
                    }

                    .countdown {
                        margin-top: 5px;
                        font-size: 0.85em;
                        font-weight: bold;
                        color: #444;
                    }

                    @media (max-width: 600px) {
                        .logo {
                            width: 400px;
                        }

                        h2 {
                            font-size: 1.5rem;
                        }

                        .spinner {
                            width: 30px;
                            height: 30px;
                        }

                        .seguro {
                            font-size: 0.8em;
                        }

                        .extra-info {
                            font-size: 0.75em;
                        }

                        .countdown {
                            font-size: 0.8em;
                        }
                    }
                `}</style>
            </head>
            <body>
                <img className="logo fade-in" src={mercadopagoLogo} alt="Mercado Pago Logo" />
                <h2 className="fade-in">Estamos preparando tu pago...</h2>
                <div className="spinner"></div>
                <div className="seguro">
                    <img className="lock" src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="Lock Icon" />
                    Tu pago es 100% seguro
                </div>
                <div className="extra-info fade-in">
                    Este proceso puede demorar un poco.
                    <div className="countdown" id="countdown">01:00</div>
                </div>

                <script dangerouslySetInnerHTML={{ __html: `
                    (function() {
                        var countdownEl = document.getElementById('countdown');
                        var time = 60;
                        var timer = setInterval(function() {
                            time--;
                            var minutes = Math.floor(time / 60);
                            var seconds = time % 60;
                            countdownEl.textContent = 
                                (minutes < 10 ? '0' + minutes : minutes) + ':' + 
                                (seconds < 10 ? '0' + seconds : seconds);
                            if (time <= 0) clearInterval(timer);
                        }, 1000);
                    })();
                ` }} />
            </body>
        </html>
    );
};

export default LoadingPayPage;

