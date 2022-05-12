import './App.css';
import './components/Player'
import Player from './components/Player';

function App() {
  const playlist = [
    "https://stat3.deti-online.com/a/ugVnAIt_atpSMhr46eDcfw/1654808400/files/audioskazki/sarra-anson-01-luntik-lunnyy-gost.mp3",
    "https://frigato.ru/uploads/files/2019-07/1562689731_pesenka-pro-otvagu.mp3"
  ]
  return (
    <div className='conteiner'>
      <Player playlist={playlist}/>
    </div>
  );
}

export default App;
