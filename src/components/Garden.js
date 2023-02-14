import ThePainting from '../img/garden.jpg';

import '../styles/garden.scss';

function Garden() {

    // the click grid will contain 5000 squares (50 squares in the y direction, 100 in the x)
    let gridSquares = [];
    for (let i = 0; i < 5000; i++) {
        gridSquares.push(
            <div 
                className={`grid-square`}
                data-id={i} 
                key={i}>    
            </div>
        );
    }

    return (
        <div className="garden">
            <div className='grid'>
                {gridSquares}
            </div>
            <div className='painting-container'>
                <img 
                    alt='The Garden of Earthly Delights by Hieronymus Bosch'
                    className='painting-itself'
                    src={ThePainting} 
                />
            </div>
        </div>
    );
}

export default Garden;