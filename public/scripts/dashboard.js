var nome = sessionStorage.NOME_USUARIO;
var email = sessionStorage.EMAIL_USUARIO;

function open_menu(){
    menu.style.display = "block";
    menu.style.display = "flex";
    set_image.innerHTML = `<img src="images/set_up.png" onclick="hidden_menu()">`;
};

function hidden_menu(){
    menu.style.display = "none";
    set_image.innerHTML = `<img src="images/set_down.png" onclick="open_menu()">`;
};

/*const ctx = document.getElementsByClassName('line-chart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["04:30", "05:30", "06:30", "07:30", "08:30", "09:30", "10:30", "11:30", "12:30", "13:30", "14:30", "15:30", "16:30", "17:30", "18:30", "19:30", "20:30", "21:30", "22:30", "23:30"],
        datasets: [{
            label: 'Passageiros',
            data: [3000, 7000, 18000, 18600, 10000, 14000, 9900, 9000, 2000, 5000, 5502, 5800, 10000, 15200, 18400, 12700, 6840, 3418, 738, 620],
            borderWidth: 4,
            borderColor: '#43cea2',
            backgroundColor: 'transparent',
            tension: 0.5,
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Controle de Fluxo de Passagens',
                font: {
                    size: 15
                }
            }
        },
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
*/