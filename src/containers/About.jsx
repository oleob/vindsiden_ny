import React from 'react';

const About = () => {
  return (
    <div className="container">
      <h1>Om oss</h1>
      <p>
        Denne siden benytter seg av API-et til{' '}
        <a href="http://vindsiden.no">vindsiden.no</a>.
      </p>
      <p>Trykk på stjernen på en stasjon for å legge den til som favoritt.</p>
      <br />
      <br />
      <p>
        Ved spørsmål eller forbedringsforslag send en mail til
        ole.barsch@gmail.com.
      </p>
      <p>
        Koden til nettsiden kan finnes{' '}
        <a href="https://github.com/oleob/vindsiden_ny">her</a>.
      </p>
    </div>
  );
};

export default About;
