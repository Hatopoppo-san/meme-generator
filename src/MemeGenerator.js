import React, { useState, useEffect } from "react";

const MemeGenerator = () => {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [randomImg, setRandomImg] = useState("http://i.imgflip.com/1bij.jpg");
  const [allMemeImg, setAllMemeImg] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        setAllMemeImg(memes);
      });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomNum = Math.floor(Math.random() * allMemeImg.length);
    const randoMemeImg = allMemeImg[randomNum].url;
    setRandomImg(randoMemeImg);
  };

  return (
    <div>
      <form className='meme-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='topText'
          value={topText}
          placeholder='Top Text'
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type='text'
          name='bottomText'
          value={bottomText}
          placeholder='Bottom Text'
          onChange={(e) => setBottomText(e.target.value)}
        />
        <button>Gen</button>
      </form>

      <div className='meme'>
        <img src={randomImg} />
        <h2 className='top'>{topText}</h2>
        <h2 className='bottom'>{bottomText}</h2>
      </div>
    </div>
  );
};

export default MemeGenerator;
