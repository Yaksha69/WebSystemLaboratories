document.addEventListener('DOMContentLoaded', function(){
    const title = document.getElementById('validationDefault01');
const artist = document.getElementById('validationDefault02');
const save = document.getElementById('save');
const ul = document.getElementById('ul-list');
const searchBar = document.querySelector('#search input');
const btns = document.querySelectorAll('#ul-list');

searchBar.addEventListener('keyup', function (e) {
    const term = e.target.value.toLowerCase(); 
    const songs = ul.getElementsByTagName('li'); 
    Array.from(songs).forEach(function (song) {
        const title = song.querySelector('h6').textContent.toLowerCase(); 
        const artist = song.querySelector('p').textContent.toLowerCase(); 


        if (title.indexOf(term) !== -1 || artist.indexOf(term) !== -1) { 
            song.style.display = 'block';
        } else {
            song.style.display = 'none';
        }
    });
});


function addDeleteFunctionality(button) {
    button.addEventListener('click', function(e) {
        const li = e.target.closest('li');
        li.remove();
    });
}
const existingButtons = ul.querySelectorAll('.btn-danger');
existingButtons.forEach(addDeleteFunctionality);

save.addEventListener('click', () => {
    const newTitle = title.value;
    const newArtist = artist.value;

    const button = document.createElement('button');
    const div0 = document.createElement('div');
    const h6 = document.createElement('h6');
    const p = document.createElement('p');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const div4 = document.createElement('div');
    const li = document.createElement('li');

    button.classList.add('btn', 'btn-danger');
    div0.classList.add('col-4', 'mt-3', 'justify-content-end');
    div.classList.add('col-4', 'text-start');
    div2.classList.add('row', 'justify-content-between');
    div3.classList.add('row');
    div4.classList.add('container', 'text-center');
    li.classList.add('list-group-item');

    h6.innerHTML = newTitle;
    p.innerHTML = newArtist;
    button.innerHTML = "Delete";


 
    div.append(h6);
    div.append(p);
    div2.append(div);
    div0.append(button);
    div2.append(div0);
    div3.append(div2);
    div4.append(div3);
    li.append(div4);

    ul.append(li);

    console.log(button);
    addDeleteFunctionality(button);
});

})