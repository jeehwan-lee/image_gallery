import { read } from 'fs';
import React, { useRef, useState } from 'react';
import './App.css';
import ImageBox from './components/imageBox';

function App() {

  const inpRef = useRef<HTMLInputElement>(null);

  const [imageList, setImageList] = useState<string[]>([])
  console.log(imageList);

  return (
    <div className='container'>
      <div className={'initial-box '+ (imageList.length > 0 && 'row')}>
        {
          imageList.length === 0 && 
          (
            <div className='text-center'>
              이미지가 없습니다. <br/>
              이미지를 추가해주세요.
            </div>
          )

        }

        {
          imageList.map((element, index) => (
            <ImageBox key={index} src={element}/>
          ))
        }
        <input type="file" ref={inpRef} 
        onChange={(event)=>{ 
          if(event.currentTarget.files?.[0]) {

            const file = event.currentTarget.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (event) => {
              setImageList(prev => [...prev, event.target?.result as string]);
            }
            
            }
          }
        }/>
        <div className='plus-box' onClick={()=> {
          inpRef.current?.click()
        }}>
          +
        </div>
      </div>
    </div>
  );
}

export default App;
