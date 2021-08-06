const toggleButton = document.getElementsByClassName('toggle-button')[0]

const theLinks = document.getElementsByClassName('thelinks')[0]

toggleButton.addEventListener('click', () => 
{
  theLinks.classList.toggle('active')
})

