const buttonsArea = document.getElementById('buttonsArea');
const history = document.getElementById('history');
const clearDigit = document.getElementById('clearDigit');
const inputArea = document.getElementById('inputArea');

buttonsArea.addEventListener('click', () =>{
    event.target.tagName ==='BUTTON'
    {
        // console.log(`You clicked on: ${event.target.textContent}`);   
        inputArea.value = `${event.target.textContent}`;
    }
})