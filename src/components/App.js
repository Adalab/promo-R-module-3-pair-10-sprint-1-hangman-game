import { useState } from 'react';
import '../styles/App.scss';

function App() {

//Estados
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState(''); //Para controlar el input
  const [word, setWord] = useState('katakroker');
  const [userLetters, setUserLetters] = useState([]);

//funciones Handle
const handleClickBtn = () => {
  setNumberOfErrors(numberOfErrors+1);
}

/* 
NOTA EXPRESIONES REGULARES

para aceptar todo el alfabeto Español con sus carácteres especiales, se especifican todos los caracteres

poodemos usar la negación de los numeros:
/^[0-9]+$/
!re.test(event.target.value)

Por otra parte para que acepte "borrar la casilla" hay que incluir antes del $ un *
*$ en lugar de +$

función "test" es propia de JS para verificar una expresión regular.

NOTA: VERIFICAR SI ESTA EXPRESIÓN ES LA ADECUADA, FUNCIONAR FUNCIONA

*/

const handleLastLetter = (event) =>{
   const re = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]*$/; 
   if (re.test(event.target.value) ){
    setLastLetter(event.target.value); 
    setUserLetters(...event.target.value) //Mirar cómo resolverlo!
   }
  }

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map ((letter, index) => {
      return <li key={index}  className="letter"></li>
  })
  }



  return (
  <div className="page">
<header>
  <h1 className="header__title">Juego del ahorcado</h1>
</header>
<main className="main">
  <section>
    <div className="solution">
      <h2 className="title">Solución:</h2>
    
      <ul className="letters">
      {renderSolutionLetters()}
        {/* <li className="letter">k</li>
        <li className="letter">a</li>
        <li className="letter"></li>
        <li className="letter">a</li>
        <li className="letter">k</li>
        <li className="letter">r</li>
        <li className="letter"></li>
        <li className="letter">k</li>
        <li className="letter">e</li>
        <li className="letter">r</li> */}
      </ul>
    </div>
    <div className="error">
      <h2 className="title">Letras falladas:</h2>
      <ul className="letters">
        <li className="letter">f</li>
        <li className="letter">q</li>
        <li className="letter">h</li>
        <li className="letter">p</li>
        <li className="letter">x</li>
      </ul>
    </div>
    <form className="form">
      <label className="title" htmlFor="last-letter">Escribe una letra:</label>
      <input
        autoComplete="off"
        className="form__input"
        maxLength="1"
        type="text"
        name="last-letter"
        id="last-letter"
        value={lastLetter}
        onChange={handleLastLetter}
        pattern = {"^[a-zA-Z]+$"}

      />
    </form>
  </section>
  <button className="btn" onClick={handleClickBtn}>Incrementar</button>
  <section className={`dummy error-${numberOfErrors}`}>
    <span className="error-13 eye"></span>
    <span className="error-12 eye"></span>
    <span className="error-11 line"></span>
    <span className="error-10 line"></span>
    <span className="error-9 line"></span>
    <span className="error-8 line"></span>
    <span className="error-7 line"></span>
    <span className="error-6 head"></span>
    <span className="error-5 line"></span>
    <span className="error-4 line"></span>
    <span className="error-3 line"></span>
    <span className="error-2 line"></span>
    <span className="error-1 line"></span>
  </section>
</main>
</div>



  );
}

export default App;
