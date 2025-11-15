let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('.body');
let listProducHTML = document.querySelector('.listProduct');

<link rel="stylesheet" href="sets.csv"></link>

let product = [
    {
        id: 1,
        name: "Mandalorian Fang Fighter VS Tie Interceptor",
        image: '75348(2).png',
        price: 100
    },

    {
        id: 2,
        name: "Tie Bomber",
        image: '75347(2).png',
        price: 65
    },

    {
        id: 3,
        name: "Ahsoka Tano's T-6 Jedi Shuttle",
        image: '75362(2).png',
        price: 100
    },

    {
        id: 4,
        name: "Corusant Guard Gunship",
        price: 150,
        image: "75354(2).png"
    },
];
fetch('https://rebrickable.com/sets/star-wars/')
fetch('sets.csv');


let listProduct = [];

initApp();

const set_num = document.getElementById("set_num").value;
const name = document.getElementById("name").value;
const year = document.getElementById("year").value;
const theme_id = document.getElementById("theme_id").value;
const num_parts = document.getElementById("num_parts").value;
const img_url = document.getElementById("img_url").value;

let productL = [];

async function initApp(){
    $(document).ready(function(){
        $.$.ajax({
            type: "method",
            url: "sets.csv",
            data: "data",
            success: function (response) {
                
            }
        });
    });
}