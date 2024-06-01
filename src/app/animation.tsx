'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Animation() {
    const [imageSrc, setImageSrc] = useState('/char/start.png');
    const [marginLeft, setMarginLeft] = useState(200);
    const [marginTop, setMarginTop] = useState(400);
    const [windowWidth, setWindowWidth] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [Up, setUp] = useState(false);
    const [counter, setCounter] = useState(0);

    async function sendNumbers() {
        let counter = 1;
    
        function sendNextNumber() {
            setTimeout(() => {
                counter = (counter + 1) % 10;
                setCounter(counter); // Incrémenter le compteur et le ramener à 1 une fois qu'il atteint 5
                sendNextNumber(); // Appel récursif pour exécuter la fonction en arrière-plan
            }, 100); // Envoie un chiffre toutes les 10 centièmes de seconde
        }
    
        sendNextNumber(); // Démarrer l'exécution de la fonction
    }
    sendNumbers();
   
    useEffect(() => {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      };

      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
        const runL = ['/char/run/rl1.png','/char/run/rl2.png','/char/run/rl3.png', '/char/run/rl4.png'];
        const runR = ['/char/run/rr1.png','/char/run/rr2.png','/char/run/rr3.png', '/char/run/rr4.png'];
        const handleKeyDown = (event:any) => {
            if (event.key === 'ArrowRight') {
                setImageSrc(runR[counter%4]);
                setMarginLeft((prevMarginLeft) => {
                    return prevMarginLeft < windowWidth - 200 ? prevMarginLeft + 10 : prevMarginLeft;
                });
            }
            if (event.key === 'ArrowLeft') {
                setImageSrc(runL[counter%4]);
                setMarginLeft((prevMarginLeft) => {
                    return prevMarginLeft > -100 ? prevMarginLeft - 10 : prevMarginLeft;
                });
            }
            if (event.key === 'ArrowUp') {
                setUp(true);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [windowWidth, counter, marginLeft]);

    return (
        <>
            <Image
                style={{ 
                    marginLeft: `${marginLeft}px`, 
                    marginTop: `${marginTop}px`,
                }}
                src={imageSrc}
                alt="perso"
                width={100}
                height={100}
                priority
            />
        </>
    );
}

// let initialPosition = 340;
// let targetPosition = 250;
// let currentPosition = initialPosition;
// let ascendVelocity = 10;
// let descendVelocity = 1;

// function ascentLoop() {
//     if (currentPosition > targetPosition) {
//         setTimeout(() => {
//             console.log("current dans monté", currentPosition);
//             setMarginTop(currentPosition);
//             currentPosition -= ascendVelocity;
//             if(ascendVelocity > 2)
//                 ascendVelocity--;
//             ascentLoop();
//         }, 30);
//     }
//     else
//         descentLoop();
// }

// function descentLoop(){
//     if(currentPosition < 340){
//         console.log("current dans descente", currentPosition);
//         setTimeout(() => {
//             setMarginTop(currentPosition);
//             currentPosition += descendVelocity;
//             descendVelocity++;
//             descentLoop();
//         }, 30);
//     }
// }