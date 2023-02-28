const cardNameInput = document.querySelector('#cardNameInput')
const cardNumInput = document.querySelector('#cardNumInput')
const cardMonthInput = document.querySelector('#cardMonthInput')
const cardYearInput = document.querySelector('#cardYearInput')
const cardCVCInput = document.querySelector('#cardCVCInput')
const inputs = [cardNameInput,cardNumInput,cardMonthInput,cardYearInput,cardCVCInput]
//stuff on physical card:
const cardName = document.querySelector('#cardName')
const cardNumber = document.querySelector('#cardNumber')
const cardMonth = document.querySelector('#cardMonth')
const cardYear = document.querySelector('#cardYear')
const cardCVC = document.querySelector('#cardCVC')
cardNumInput.value=''
let cardNumLen
const form = document.querySelector('.form')
const cButton = document.querySelector('#confirmBtn')
const main = document.getElementsByTagName('main')

const confirmBtn = ()=>{
    clearInterval(inputHandler)
    form.remove()
    const newLogo = document.createElement('img')
    const newArea = document.createElement('div')
    const newButton = document.createElement('div')
    const newHead = document.createElement('h1')
    const newPhrase = document.createElement('p')
    main[0].appendChild(newArea)
    newArea.setAttribute('class', 'form')
    newArea.classList.add('newArea')
    newArea.style.display = 'flex'
    newArea.style.flexDirection = 'column'
    newArea.style.justifyContent = 'space-between'
    newArea.style.alignItems = 'center'
    newArea.appendChild(newLogo)
    newLogo.setAttribute('class', 'newLogo')
    newLogo.setAttribute('src', 'images/icon-complete.svg')
    newLogo.setAttribute('alt', 'icon-complete')

    newArea.appendChild(newHead)
    newHead.setAttribute('class', 'newHead')
    newHead.innerHTML = 'THANK YOU!'

    newArea.appendChild(newPhrase)
    newPhrase.setAttribute('class', 'newPhrase')
    newPhrase.innerHTML = "We've added your card details"

    newArea.appendChild(newButton)
    newButton.setAttribute('id', 'confirmBtn')
    newButton.setAttribute('class', 'newButton')
    newButton.innerHTML = 'Continue'

}

const correctChar = (cardString)=>{
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '', ' ']
    let num
    for (let i = 0; i<cardString.length;i++){
        num=0
       for (let j=0; j<chars.length;j++){
            if (cardString[i]!=chars[j]) num++
            else if (cardString[i]==chars[j]) break
       }
       if (num == chars.length) return false
    }
    return true
}

const noSpaces = ()=>{
    //to check for autofill
    for(let i = 0; i<cardNumLen;i++){
        if (cardNumInput.value[i] == ' ') return false
        else return true
    }
    if (cardNumLen == 0) return false
}

const autofilled = ()=>{
    if (noSpaces()){
        let numArray = cardNumInput.value.split('')
        let newCardNum
        numArray.splice(0, 0, ' ')
        numArray.splice(5, 0, ' ')
        numArray.splice(10, 0, ' ')
        numArray.splice(15, 0, ' ')
        numArray.splice(20, 0, ' ')
        newCardNum = numArray.join('')
        cardNumInput.value = newCardNum
    }
}

const defaultBorderColor = 'hsl(249, 99%, 64%)'
const cardNumHandler = ()=>{
    let firstChar
    //let newCardNum = ' '
    if (cardNumLen==1){
        firstChar = cardNumInput.value
        cardNumInput.value=' '+firstChar
    }
    else if (cardNumLen%5==0&&cardNumLen>1) {
        cardNumInput.value+=" "
    }
}

const errorHandler = ()=>{
    if (!correctChar(cardNumInput.value)){
        cardNumInput.classList.add('wrongInput')
        document.querySelector('.cardNumError').classList.remove('invisible')
    }
    else if (correctChar(cardNumInput.value) || cardNumLen == 1){
        cardNumInput.classList.remove('wrongInput')
        document.querySelector('.cardNumError').classList.add('invisible')
    }

    if (cardMonthInput.matches(':active') || cardYearInput.matches(':active')){
        if (cardMonthInput.value.length == 0 || cardYearInput.value.length == 0 ){
            document.querySelector('.exDateError').classList.remove('invisible')
        }
        if (cardMonthInput.matches(':active')){
            cardMonthInput.classList.add('wrongInput')
        }
        if (cardYearInput.matches(':active')){
            cardYearInput.classList.add('wrongInput')
        }
    }
    
    if (cardMonthInput.value.length>0 || cardYearInput.value.length>0){
        document.querySelector('.exDateError').classList.add('invisible')
        if (cardMonthInput.value.length>0){
            cardMonthInput.classList.remove('wrongInput')
        }
        if (cardYearInput.value.length>0){
            cardYearInput.classList.remove('wrongInput')
        }
    }

    if (cardCVCInput.matches(':active') && cardCVCInput.value.length == 0){
        cardCVCInput.classList.add('wrongInput')
        document.querySelector('.CVCDateError').classList.remove('invisible')
    }
    else if (cardCVCInput.value.length != 0){
        cardCVCInput.classList.remove('wrongInput')
        document.querySelector('.CVCDateError').classList.add('invisible')
    }
}
const emptyForm = ()=>{
    
    if (cardNameInput.value == '') cardName.innerHTML = 'Jane Appleseed'
    if (cardNumInput.value == '') cardNumber.innerHTML = '0000 0000 0000 0000'
    if (cardMonthInput.value == '') cardMonth.innerHTML = '00'
    if (cardYearInput.value == '') cardYear.innerHTML = '00'
    if (cardCVCInput.value == '') cardCVC.innerHTML = '000'
}

const inputHandler = setInterval(() => {
    cardNumLen = cardNumInput.value.length
    cardName.innerHTML = cardNameInput.value
    cardNumber.innerHTML = cardNumInput.value
    cardMonth.innerHTML = cardMonthInput.value
    cardYear.innerHTML = cardYearInput.value
    cardCVC.innerHTML = cardCVCInput.value
    cardNumHandler()
    errorHandler()
    emptyForm()
    noSpaces()
    autofilled()
}, 10);

