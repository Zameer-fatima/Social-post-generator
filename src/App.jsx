import { useEffect, useRef, useState } from 'react';
import './App.css';
import MainComponent from './components/MainComponent';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import html2canvas from 'html2canvas';

function App() {

  const initialInputs = () => {
    const data = localStorage.getItem('userInput')
    return data ? JSON.parse(data) : {
      name: 'Zameer',
      userName: 'Zameerfatima',
      profilePic: 'https://i.pinimg.com/originals/05/d1/94/05d1948a0b051439f26a835c33b79823.jpg',
      socialPlatform: 1,
      content: `Best advice I gave myself is just be cool on everything 😎`,
      selectBg: 1,
      rounded: 10
    }
  }
  const [userDetails, setUserDetails] = useState(initialInputs())
  useEffect(() => {
    localStorage.setItem('userInput', JSON.stringify(userDetails))
  }, [userDetails])

  const divRef = useRef(null);

  const downloadImage = () => {
    if (divRef.current) {
      html2canvas(divRef.current)
        .then((canvas) => {
          const dataURL = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.download = '@zam.png';
          link.href = dataURL;
          link.click();
        })
        .catch((error) => {
          console.error('Error converting div to image:', error);
        });
    }
  };

  return (
    <div className="App">
      <TopNav downloadImage={downloadImage} />
      <SideNav setUserDetails={setUserDetails} userDetails={userDetails} />
      <MainComponent userDetails={userDetails} divRef={divRef} />
    </div>
  );
}

export default App;
