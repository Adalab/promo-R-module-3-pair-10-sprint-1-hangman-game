import { useState, useEffect } from 'react';

import fetchWord from '../services/api';
import '../styles/App.scss';

function App() {
  //PENDIENTE: cartel, has ganado, y que no puedas continuar jugando, y botton reset para volver a jugar

  //----------Estados----------------

  /*  const [numberOfErrors, setNumberOfErrors] = useState(0); */
  const [lastLetter, setLastLetter] = useState(''); //Para controlar el input
  const [word, setWord] = useState(''); //palabra a adivimar
  const [userLetters, setUserLetters] = useState([]);

  let numberErrors = 0;
  let deadText = 'hide';

  /* ----------------------------------------------
          NOTA EXPRESIONES REGULARES

          para aceptar todo el alfabeto Español con sus carácteres especiales, se especifican todos los caracteres

          poodemos usar la negación de los numeros:
          /^[0-9]+$/
          !re.test(event.target.value)

          Por otra parte para que acepte "borrar la casilla" hay que incluir antes del $ un *
          *$ en lugar de +$

          función "test" es propia de JS para verificar una expresión regular.

          NOTA: VERIFICAR SI ESTA EXPRESIÓN ES LA ADECUADA, FUNCIONAR FUNCIONA
  -------------------------------------------------*/

  //----------USEEFECT--------------

  useEffect(() => {
    //cogemos la palabra de la Api
    fetchWord().then((data) => {
      const word = data.word;
      setWord(word);
    });
  }, []);

  //----------funciones Handle--------------

  //---HANDLE: BOTON NUMBER ERRORS
  /* const handleClickBtn = () => {
    setNumberOfErrors(numberOfErrors + 1);
  }; */

  //---HANDLE: Letra de la usuaria
  const handleLastLetter = (event) => {
    const re = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]*$/;
    if (re.test(event.target.value)) {
      setLastLetter(event.target.value);
      if (!userLetters.includes(event.target.value)) {
        setUserLetters([...userLetters, event.target.value]);
      }
    }
    setLastLetter(''); //para que la usuaria no tenga que borrar el campo cada vez que escribe
  };

  //-----------funciones-----------------
  //---fc: Solución
  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((letter, index) => {
      //aprovechamos el map para hacer un filter dentro
      const drawletter = userLetters.filter((userL) =>
        userL.includes(letter) ? userL : ''
      );
      return (
        <li key={index} className="letter">
          {drawletter}
        </li>
      );
    });
  };

  //---fc: fallos

  const renderErrorLetters = () => {
    const errors = userLetters.filter((userL) => !word.includes(userL));

    return errors.map((error, index) => {
      numberErrors++;

      if (numberErrors < 13) {
        return (
          <li key={index} className="letter">
            {' '}
            {error}{' '}
          </li>
        );
      } else {
        deadText = '';
      }
    });
  };

  //-----------HTML------------------
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
              {renderErrorLetters()}
              {/*      <li className="letter">f</li>
        <li className="letter">q</li>
        <li className="letter">h</li>
        <li className="letter">p</li>
        <li className="letter">x</li> */}
            </ul>
            <p className={`title_dead ${deadText}`}> FIN ! Has muerto!</p>
          </div>
          <form className="form">
            <label className="title" htmlFor="last-letter">
              Escribe una letra:
            </label>
            <input
              autoComplete="off"
              className="form__input"
              maxLength="1"
              type="text"
              name="last-letter"
              id="last-letter"
              value={lastLetter}
              onChange={handleLastLetter}
              pattern={'^[a-zA-Z]+$'}
            />
          </form>
        </section>
        {/*    <button className="btn" onClick={handleClickBtn}>
          Incrementar
        </button> */}
        <section className={`dummy error-${numberErrors}`}>
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
