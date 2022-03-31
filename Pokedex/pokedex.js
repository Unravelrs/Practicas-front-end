const pokeStats = document.querySelector('[data-poke-stats]');
const pokeID = document.querySelector('[data-poke-id]');
const pokeTypes = document.getElementById('pokeTypes');
const pokeMoves = document.getElementById("moveslis");




function fetchPokemon() {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;

    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif");
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);
            pokeID.textContent = `Nº ${data.id} ${data.name}`;
            const {stats, moves, types} = data;
            renderPokemonStats (stats);
            renderPokemonMoves (data);
            renderPokemonTypes (data);


        }





    });

}


function pokeImage(url) {
    const pokePhoto = document.getElementById("pokeImg");
    pokePhoto.src = url;

}

const renderPokemonStats = stats => {
    
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderPokemonMoves = data => {
           
    let moves = data.moves;
    pokeMoves.innerHTML = "movimientos";
        
     for (let i = 0; i < moves.length; i++) {
                const move = document.createElement("div");
                pokeMoves.appendChild(move);
        
                move.innerText = moves[i].move.name;
            }
        }


        const renderPokemonTypes = (data) => {

        let types = data.types;
        pokeTypes.innerHTML = "Tipo (s)";
        
        for(let i = 0; i < data.types.length; i ++) {
            const type = document.createElement("div");
            pokeTypes.appendChild(type);
    
            type.innerText = data.types[i].type.name;
        }
        }


