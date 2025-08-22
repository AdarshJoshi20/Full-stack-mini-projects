console.log('JS finally connected')

let count = 0;
const countSpace = document.getElementById('Countspace');

countSpace.innerText = 0;
const incrementButton = document.getElementById('Increment');
const decrementButton = document.getElementById('Decrement');
const resetButton = document.getElementById('Reset');

incrementButton.addEventListener("click", function()
{
    count++;
    countSpace.innerText = count;
});

decrementButton.addEventListener("click", function()
{
    if(count != 0)
    {
        count--;
    }
    
    countSpace.innerText = count;
});

resetButton.addEventListener("click", function()
{
    count = 0;
    countSpace.innerText = count;
});