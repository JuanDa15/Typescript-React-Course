'use client';
import { useState } from 'react';
import { LazyImage } from './components/LazyImage';
import type { MouseEventHandler } from 'react';
// Generate a random funciton between 1 an 123
const getRandomNumber = (): number => Math.floor(Math.random() * 123) + 1;

interface Image {
  id: string;
  url: string;
}

export default function Home() {
  const [images, setImages] = useState<Image[]>([]);

  const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    const newImage: Image = {
      id: crypto.randomUUID(),
      url: `https://randomfox.ca/images/${getRandomNumber()}.jpg`,
    };

    const setImagesCopy = [...images, newImage];
    setImages(setImagesCopy);
  };

  return (
    <div className='min-w-screen min-h-screen text-center'>
      <div className='max-w-[80ch] mx-auto pt-3'>
        <h4 className='text-xl text-fuchsia-700'>
          Curso de react con TypeScript
        </h4>
        <h1 className='font-bold text-4xl'>Componente Lazy Image</h1>
        <p className='mt-6'>
          Un componente generico para cargar imagenes de forma lazy.
        </p>
        <div className='text-center my-4'>
          <button
            className='px-4 py-1 bg-fuchsia-800 rounded-sm transition-colors hover:bg-fuchsia-600'
            onClick={addNewFox}
          >
            Agregar imagen
          </button>
        </div>
        <div className='grid place-items-center mt-7 gap-4'>
          {images.map((image) => (
            <LazyImage
              src={image.url}
              key={image.id}
              width={320}
              height='auto'
              alt='Random Fox'
              className='rounded-lg shadow-lg shadow-slate-800 object-contain bg-gray-700'
              onLazyLoad={ (event) => console.log(event)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
